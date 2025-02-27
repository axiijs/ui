import {Atom, atom, computed, JSXElement, RenderContext, RxList, StyleSize} from "axii";
import {LeftPanel} from "./LeftPanel";
import {RightPanel} from "./RightPanel";
import {GroupNode, LayoutInfo, LayoutType, NodeType, StrokeInfo, TextNode, PageNode} from "../data/types";
import canvasData from "../data/canvas-data";
import { RxCanvas, RxGroup, RxIconNode, RxPage, RxTextNode } from "./RxPage";

const domNodeMap = new WeakMap<HTMLElement, RxPage|RxGroup|RxTextNode|RxIconNode>()
const nodeDomMap = new WeakMap<RxPage|RxGroup|RxTextNode|RxIconNode, HTMLElement>()


// 在构造函数中初始化时先push一个状态
window.history.pushState(null, '', window.location.href);

// 监听 popstate 事件（后退按钮触发）
window.addEventListener('popstate', (event) => {
    // 阻止后退，重新push一个状态

    event.preventDefault()
    console.log('popstate')
    window.history.pushState(null, '', window.location.href);
});



function textAttributesToStyle(node: TextNode) {
    return {
        display: 'inline-block',
        ...node.box,
        ...node.font,
        ...node.textLayout,
    }
}


function layoutStyle(layout?: LayoutInfo) {
    return {
        display: layout?.type === LayoutType.GRID ?  'grid' : (layout?.type === LayoutType.ROW||layout?.type === LayoutType.COLUMN) ? 'flex' : 'block',
        flexDirection: layout?.type === LayoutType.COLUMN ? 'column' : (layout?.type === LayoutType.ROW ? 'row' : undefined),
        ...layout,
    }
}



function groupAttributesToStyle(node: GroupNode) {
    const stroke = node.strokes?.[0]

    const style= {
        boxSizing: 'border-box',
        ...node.box,
        ...layoutStyle(node.layout),
        ...node.appearance,
        background: node.fills?.map(fill => fill.value),
        borderWidth: stroke?.width,
        borderStyle: stroke?.style,
        borderColor: stroke?.color,
        boxShadow: node.effects?.filter(e => e.type === 'shadow').map((e) => {
            const { offsetX, offsetY, blur, spread, color } = e
            return `${offsetX![0]}${offsetX![1]} ${offsetY![0]}${offsetY![1]} ${blur![0]}${blur![1]} ${spread![0]}${spread![1]} ${color}`
        }),
    }

    return style
}

function pageAttributesToStyle(node: PageNode) {
    return {
        boxSizing: 'border-box',
        ...node.box,
        fontFamily: node.font?.fontFamily,
        fontSize: node.font?.fontSize,
        color: node.font?.color,
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
        domNodeMap.set(domNode as HTMLElement, node)
        nodeDomMap.set(node, domNode as HTMLElement)
    }
    return domNode
}


function renderText(node: RxTextNode, selected: Atom<boolean>, createElement: RenderContext['createElement']) {
    const data = node.data
    return <div data-name={data.name} style={() => textAttributesToStyle(data)}>{data.content}</div>
}


function renderGroupNode(node: RxGroup, selected: Atom<boolean>, createElement: RenderContext['createElement']) {
    const data = node.data
    return <div style={() => groupAttributesToStyle(data)} data-name={data.name}>
        {node.children.map(([child, selected]) => renderNode(child, selected, createElement))
    }</div>
}


function renderPageNode(node: RxPage, selected: Atom<boolean>, createElement: RenderContext['createElement']) {
    const data = node.data
    return <div style={() => pageAttributesToStyle(data)} data-name={data.name}>
        {node.children.map(([child, selected]) => renderNode(child, selected, createElement))}
    </div>
}

export function App({data}: {data: PageNode[]}, {createElement, createRef}: RenderContext)  {
    // TODO 显示的时候获取一次
    const containerRef = createRef()
    let lastContainerRect:any
    const containerRect = () => {
        return lastContainerRect || (lastContainerRect = containerRef.current!.getBoundingClientRect())
    }

    const containerStyle={
        height:'100%',
        width:'100%',
        // position:'relative',
        overflow:'scroll',
        background: '#f5f5f5',
        boxSizing:'border-box',
        padding: [0, 300]
    }

    const lastWheelEvent = atom<WheelEvent>(null)
    const scale = computed<number>(({lastValue}) => {
        const last = lastValue.raw||1
        console.log(555555)

        if(lastWheelEvent()) {
            const zoomFactor = 0.05;
            const zoomDirection = lastWheelEvent()!.deltaY < 0 ? 1 : -1;
            return Math.min(Math.max(last + zoomDirection * zoomFactor, .2), 1)
            // return Math.max(last + zoomDirection * zoomFactor, 1)
        }
        console.log(last, last)
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
        }
    }

    const onZoom = (event: WheelEvent) => {
        if (event.ctrlKey) {
            console.log(1111)
            event.stopPropagation()
            event.preventDefault()
            lastWheelEvent(event)
        }
    }

    const rxCanvas = new RxCanvas(data)
    const canvasRef = createRef()

    const onClickCanvas = (event: MouseEvent) => {
        const rxNodePath: (RxPage|RxGroup|RxTextNode|RxIconNode)[] = []
        let current = event.target
        while (current && current !== canvasRef.current) {
            const rxNode = domNodeMap.get(current as HTMLElement)
            if (rxNode) {
                rxNodePath.push(rxNode)
            }
            current = (current as HTMLElement).parentElement
        }
        rxNodePath.reverse()

        let parentRxNode: RxPage|RxGroup|RxTextNode|RxIconNode|RxCanvas|null = rxCanvas
        let originSelectedTop :any
        console.log(rxNodePath)

        for (const rxNode of rxNodePath) {
            if( (parentRxNode instanceof RxGroup||parentRxNode instanceof RxPage || parentRxNode instanceof RxCanvas) ) {
                if (parentRxNode!.selectedNode() === rxNode) {
                    parentRxNode = rxNode
                } else {
                    if (parentRxNode!.selectedNode()){
                        originSelectedTop = parentRxNode!.selectedNode()
                        parentRxNode!.selectedNode(rxNode)
                    } else {
                        parentRxNode!.selectedNode(rxNode)
                    }
                    break
                }
            }  else {
                break
            }
        }

        while(originSelectedTop?.selectedNode) {
            const next = originSelectedTop.selectedNode()
            originSelectedTop.selectedNode(null)
            originSelectedTop = next
        }
    }

    const leafSelectedNode = computed<RxPage|RxGroup|RxTextNode|RxIconNode|null>(({lastValue}) => {
        let current:any = rxCanvas
        while(current.selectedNode?.()) {
            current = current.selectedNode()
        }
        return current
    })

    const selectedRect = computed<DOMRect|null>(({lastValue}) => {
        const domNode = nodeDomMap.get(leafSelectedNode()!)
        return domNode?.getBoundingClientRect()
    })

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
            border: '2px solid #9847ff',
            pointerEvents: 'none',
            // 斜线背景
            // background: 'linear-gradient(to bottom right, transparent 50%, #9847ff 50%, #9847ff 55%,transparent 55%)',
            // backgroundSize: '10px 10px',
            // backgroundPosition: '0 0, 5px 5px',
        }
    })
    
    return (
        <div style={containerStyle} onWheelCapture={onZoom} >
            <div id={'canvas'} ref={[canvasRef, containerRef]} onclick={onClickCanvas} class={'scope-independent'} style={[canvasStyle, resetCanvasStyle]}>
                {rxCanvas.children.map(([rxPage, selected]) => (
                    <div style={{height:2000, width:1400}}>
                        {renderNode(rxPage, selected, createElement)}
                    </div>
                ))}
                <div style={selectedRectStyle}></div>
            </div>
            <LeftPanel canvas={rxCanvas} $root:style={{position:'absolute', left:0, top:0}}/>
            <RightPanel $root:style={{position:'absolute', right:0, top:0}}/>
        </div>
    )
}
