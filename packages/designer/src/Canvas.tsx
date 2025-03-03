import {atom, Atom, autorun, computed, DragPosition, JSXElement, RenderContext, RxDOMDragState} from "axii";
import {LayoutType, NodeType, PageNode, UnitType} from "../data/types";
import { RxCanvas, RxCollection, RxGroup, RxIconNode, RxNodeType, RxPage, RxTextNode } from "./RxPage";
import { throttleTimeout } from "./util";



function textAttributesToStyle(node: RxTextNode) {
    const boxStyle = () => toBoxStyle(node)

    const fontStyle = () => Object.fromEntries(Object.entries(node.font).map(([key, value]) => [key, value.value()]))

    const otherStyle = () => ({
        display: 'inline-block',
        ...Object.fromEntries(Object.entries(node.textLayout).map(([key, value]) => [key, value.value()])),
    })

    return [boxStyle, fontStyle, otherStyle]
}


function toLayoutStyle(node: RxGroup) {
    const layout = node.layout
    return {
        display: layout?.type?.value() === LayoutType.GRID ?  'grid' : (layout?.type?.value() === LayoutType.ROW||layout?.type?.value() === LayoutType.COLUMN) ? 'flex' : 'block',
        flexDirection: layout?.type?.value() === LayoutType.COLUMN ? 'column' : (layout?.type?.value() === LayoutType.ROW ? 'row' : undefined),
        ...Object.fromEntries(Object.entries(layout).map(([key, value]) => [key, value.value()])),
    }
}

function toBackgroundStyle(node: RxGroup) {
    // TODO 支持渐变/图片/纯色
    return ({background: node.fills?.map(fill => fill.value.value).toArray()})
}

function groupAttributesToStyle(node: RxGroup) {
    const boxStyle = () => toBoxStyle(node)
    const layoutStyle = () => toLayoutStyle(node)
    const backgroundStyle = () => toBackgroundStyle(node)

    const stroke = node.data.strokes?.[0]
    const otherStyle= {
        // ...Object.fromEntries(Object.entries(node.appearance||{}).map(([key, value]) => [key, value.value()])),
        borderWidth: stroke?.width,
        borderStyle: stroke?.style,
        borderColor: stroke?.color,
        boxShadow: node.data.effects?.filter(e => e.type.value === 'shadow').map((e) => {
            const { offsetX, offsetY, blur, spread, color } = e
            return `${offsetX!.value![0]}${offsetX!.value![1]} ${offsetY!.value![0]}${offsetY!.value![1]} ${blur!.value![0]}${blur!.value![1]} ${spread!.value![0]}${spread!.value![1]} ${color!.value}`
        }),
    }

    return [boxStyle, layoutStyle, backgroundStyle, otherStyle]
}

function pageAttributesToStyle(node: RxPage) {
    const boxStyle = () => toBoxStyle(node)

    return [
        boxStyle, 
        {
            boxSizing: 'border-box',
            fontFamily: node.data.font?.fontFamily?.value,
            fontSize: node.data.font?.fontSize?.value,
            color: node.data.font?.color?.value,
        }
    ]
}

function toBoxStyle(node: RxPage|RxGroup|RxTextNode|RxIconNode) {
    return {
        boxSizing: 'border-box',
        ...Object.fromEntries(Object.entries(node.box||{}).map(([key, value]) => {
            return [
                key, 
                value.variable() ? node.root!.rxVariable.get(value.variable()!)?.() : value.value()
            ]
        })),
    }
}

function renderNode(node: RxPage|RxGroup|RxTextNode|RxIconNode, selected: Atom<boolean>, createElement: RenderContext['createElement']) {
    let domNode:JSXElement|undefined
    if (node instanceof RxPage) {
        domNode= renderPageNode(node, selected, createElement)
    } else if (node instanceof RxGroup) {
        domNode= renderGroupNode(node, selected, createElement)
    } else if (node instanceof RxTextNode) {
        domNode= renderText(node, selected, createElement)
    }

    if (domNode) {
        node.root!.saveCanvasNode(domNode as HTMLElement, node)
    }
    return domNode
}


function renderText(node: RxTextNode, selected: Atom<boolean>, createElement: RenderContext['createElement']) {
    const data = node.data
    return <div data-name={data.name} style={textAttributesToStyle(node)}>{data.content.value}</div>
}


function renderGroupNode(node: RxGroup, selected: Atom<boolean>, createElement: RenderContext['createElement']) {
    const data = node.data
    return <div style={groupAttributesToStyle(node)} data-name={data.name}>
        {node.childrenWithSelection.map(([child, selected]) => renderNode(child, selected, createElement))
    }</div>
}


function renderPageNode(node: RxPage, selected: Atom<boolean>, createElement: RenderContext['createElement']) {
    const data = node.data
    return <div style={pageAttributesToStyle(node)} data-name={data.name}>
        {node.childrenWithSelection.map(([child, selected]) => renderNode(child, selected, createElement))}
    </div>
}

export function Canvas({data, rxCanvas, lastWheelEvent}: {data: PageNode[], rxCanvas: RxCanvas, lastWheelEvent: Atom<WheelEvent|null>}, {createElement, createRef, useLayoutEffect}: RenderContext)  {
    // TODO 显示的时候获取一次
    const containerRef = createRef()
    let lastContainerRect:any
    const containerRect = () => {
        return lastContainerRect || (lastContainerRect = containerRef.current!.getBoundingClientRect())
    }

    const scale = computed<number>(({lastValue}) => {
        const last = lastValue.raw||1

        if(lastWheelEvent()) {
            const zoomFactor = 0.05;
            const zoomDirection = lastWheelEvent()!.deltaY < 0 ? 1 : -1;
            return Math.min(Math.max(last + zoomDirection * zoomFactor, .2), 1)
            // return Math.max(last + zoomDirection * zoomFactor, 1)
        }
        return last
    })

    const resetCanvasStyle= {
        color: 'initial !important'
    }

    const canvasStyle= () => {

        const event = lastWheelEvent()!
        let transformOrigin:any
        if (event) {
            const rect = containerRect();
            const originalWidth = rect.width / scale.raw!;
            const originalHeight = rect.height / scale.raw;

            // 计算鼠标相对于原始元素尺寸的位置
            const x = (event.clientX - rect.left) / scale.raw;
            const y = (event.clientY - rect.top) / scale.raw;

            // 计算鼠标位置相对于原始元素尺寸的百分比
            const mouseXPercent = `${(x / originalWidth) * 100}%`;
            const mouseYPercent = `${(y / originalHeight) * 100}%`;
            transformOrigin = `${mouseXPercent} ${mouseYPercent}`
        }

        return {
            position:'relative',
            height: 2000,
            width:2000,
            willChange:'transform',
            transform:`scale(${scale()})`,
            transformOrigin,
            background: '#fff',
        }
    }

    const canvasRef = createRef()

    const onClickCanvas = (event: MouseEvent) => {
        const rxNodePath: (RxPage|RxGroup|RxTextNode|RxIconNode)[] = []
        let current = event.target
        while (current && current !== canvasRef.current) {
            const rxNode = rxCanvas.getRxNodeFromCanvasNode(current as HTMLElement)
            if (rxNode) {
                rxNodePath.push(rxNode)
            }
            current = (current as HTMLElement).parentElement
        }
        rxNodePath.reverse()

        const selectedNode = rxCanvas.selectFirstInPath(rxNodePath)

        rxCanvas.scrollIntoNavigatorView(selectedNode)
    }

    const leafSelectedNode = computed<RxNodeType|null>(({lastValue}) => {
        let current:any = rxCanvas
        // 遍历选中节点链，直到找到叶子节点
        while(current && current.selectedNode && current.selectedNode()) {
            current = current.selectedNode()
        }
        return current === rxCanvas ? null : current
    })

    const selectedRect = computed<DOMRect|null>(({lastValue}) => {
        const node = leafSelectedNode()
        if (!node) {
            return null
        } else {
            // 监听 box
            Object.values(node!.box).forEach((value) => value.value() && value.variable())
            // 监听 layout
            if(node instanceof RxCollection) {
                Object.values(node!.layout).forEach((value) => value.value() && value.variable())
            }
            // 监听 font
            if(node instanceof RxTextNode) {
                Object.values(node!.font).forEach((value) => value.value() && value.variable())
            }
        }


        const domNode = rxCanvas.getCanvasNodeFromRxNode(leafSelectedNode()!)

        return domNode?.getBoundingClientRect()
    }, undefined, throttleTimeout((recompute: () => void) => {
        recompute()
    }, 100))

    const selectedRectStyle = computed<any>(({}) => {
        const canvasCurrentRect = canvasRef.current?.getBoundingClientRect()
        if (!selectedRect() || !canvasCurrentRect) {
            return {
                display: 'none',
            }
        }

        return {
            position:'absolute',
            left: selectedRect()?.x! - canvasCurrentRect.left,
            top: selectedRect()?.y! - canvasCurrentRect.top,
            width: selectedRect()?.width,
            height: selectedRect()?.height,
            outline: '2px solid #9847ff',
            pointerEvents: 'none',
            // 斜线背景
            // background: 'linear-gradient(to bottom right, transparent 50%, #9847ff 50%, #9847ff 55%,transparent 55%)',
            // backgroundSize: '10px 10px',
            // backgroundPosition: '0 0, 5px 5px',
        }
    })

    

    const dragPosition = atom<DragPosition|null>(null)

    const onDragEnd = (lastDragPosition) => {
        const rxParentGroup = rxCanvas.getRxNodeFromCanvasNode(lastDragPosition.mouseDownEvent.target as HTMLElement) as RxGroup
        const rxGroup = new RxGroup({
            id: 'group',
            name: 'group',
            type: NodeType.GROUP,
            children: [],
            box: {
                width: {
                    value: [lastDragPosition.clientX - containerRect().left - lastDragPosition.startX, UnitType.PX]
                },
                height: {
                    value: [lastDragPosition.clientY - containerRect().top - lastDragPosition.startY, UnitType.PX]
                },
            },
            fills: [{
                type: {
                    value: 'color',
                },
                value: {
                    value: '#9847ff'
                }
            }]
        }, rxParentGroup, rxCanvas)
        rxParentGroup.children.push(rxGroup)
        rxGroup.select()
        rxCanvas.scrollIntoNavigatorView(rxGroup)
    }

    const rxDragPosition = new RxDOMDragState(dragPosition, {onDragEnd})

    const newGroupRectStyle = computed<any>(({lastValue}) => {
        if (!dragPosition()) {
            return {
                display: 'none',
            }
        }
        return {
            position: 'absolute',
            left: dragPosition()?.startX,
            top: dragPosition()?.startY,
            width: dragPosition()?.clientX! - containerRect().left - dragPosition()?.startX!,
            height: dragPosition()?.clientY! - containerRect().top - dragPosition()?.startY!,
            border: '1px solid #9847ff',
            background: 'rgba(85, 72, 206, 0.5)',
        }
    })


    
    return (
        <div id={'canvas'} ref={[canvasRef, containerRef, rxDragPosition.ref]} onclick={onClickCanvas} style={[canvasStyle, resetCanvasStyle]}>
            {rxCanvas.childrenWithSelection.map(([rxPage, selected]) => (
                <div style={{height:2000, width:1400}}>
                    {renderNode(rxPage, selected, createElement)}
                </div>
            ))}
            <div style={selectedRectStyle}></div>
            <div style={newGroupRectStyle}></div>
        </div>
    )
}
