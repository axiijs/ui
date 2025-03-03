import {Atom, atom, autorun, computed, DragPosition, JSXElement, RenderContext, RxDOMDragPosition, RxList, StyleSize} from "axii";
import {LeftPanel} from "./LeftPanel";
import {RightPanel} from "./RightPanel";
import {GroupNode, LayoutInfo, LayoutType, NodeType, StrokeInfo, TextNode, PageNode} from "../data/types";
import { RxCanvas, RxCollection, RxGroup, RxIconNode, RxNode, RxNodeType, RxPage, RxTextNode } from "./RxPage";
import { throttleTimeout } from "./util";
import { Canvas } from "./Canvas";
import { RxVariable, VariableData } from "./RxVariable";



// 在构造函数中初始化时先push一个状态
window.history.pushState(null, '', window.location.href);

// 监听 popstate 事件（后退按钮触发）
window.addEventListener('popstate', (event) => {
    // 阻止后退，重新push一个状态

    event.preventDefault()
    console.log('popstate')
    window.history.pushState(null, '', window.location.href);
});



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
    console.log(node.fills?.map(fill => fill.value).toArray())
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
        ...Object.fromEntries(Object.entries(node.box||{}).map(([key, value]) => [key, value.value()])),
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

export function App({data, vars}: {data: PageNode[], vars: VariableData<any>[]}, {createElement, createRef, useLayoutEffect}: RenderContext)  {
    // TODO 显示的时候获取一次
   
    const containerStyle={
        height:'100%',
        width:'100%',
        // position:'relative',
        overflow:'scroll',
        background: '#252525',
        boxSizing:'border-box',
        padding: [0, 300],
        userSelect: 'none',
    }

    const lastWheelEvent = atom<WheelEvent>(null)
    
    const onZoom = (event: WheelEvent) => {
        if (event.ctrlKey) {
            event.stopPropagation()
            event.preventDefault()
            lastWheelEvent(event)
        }
    }


    const rxVariable = new RxVariable(vars)
    const rxCanvas = new RxCanvas(data, rxVariable)


    const leafSelectedNode = computed<RxNodeType|null>(({lastValue}) => {
        let current:any = rxCanvas
        // 遍历选中节点链，直到找到叶子节点
        while(current && current.selectedNode && current.selectedNode()) {
            current = current.selectedNode()
        }
        return current === rxCanvas ? null : current
    })

    

    useLayoutEffect(() => {
        const firstPage = rxCanvas.childrenWithSelection.raw[0][0]
        rxCanvas.selectedNode(firstPage);
        firstPage.selectedNode(firstPage.childrenWithSelection.raw[0][0])
    })
    
   
    
    return (
        <div style={containerStyle} onWheelCapture={onZoom} >
            <Canvas data={data} rxCanvas={rxCanvas} lastWheelEvent={lastWheelEvent}/>
            <LeftPanel canvas={rxCanvas} $root:style={{position:'absolute', left:0, top:0}}/>
            <RightPanel canvas={rxCanvas} selectedNode={leafSelectedNode} $root:style={{position:'absolute', right:0, top:0}}/>
        </div>
    )
}
