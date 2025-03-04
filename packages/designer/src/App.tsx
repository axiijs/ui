import {Atom, atom, autorun, computed, DragPosition, JSXElement, RenderContext, RxDOMDragPosition, RxList, StyleSize} from "axii";
import {LeftPanel} from "./LeftPanel";
import {RightPanel} from "./RightPanel";
import {GroupNode, LayoutInfo, LayoutType, NodeType, StrokeInfo, TextNode, PageNode} from "../data/types";
import { RxCanvas, RxCollection, RxGroup, RxIconNode, RxNode, RxNodeType, RxPage, RxTextNode } from "./RxPage";
import { throttleTimeout } from "./util";
import { Canvas } from "./Canvas";
import { RxVariable, VariableData } from "./RxVariable";
import { Machine } from "statemachine0";



// 在构造函数中初始化时先push一个状态
window.history.pushState(null, '', window.location.href);

// 监听 popstate 事件（后退按钮触发）
window.addEventListener('popstate', (event) => {
    // 阻止后退，重新push一个状态

    event.preventDefault()
    console.log('popstate')
    window.history.pushState(null, '', window.location.href);
});



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
