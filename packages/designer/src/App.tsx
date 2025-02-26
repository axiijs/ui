import {atom, computed, RenderContext, StyleSize} from "axii";
import {LeftPanel} from "./LeftPanel";
import {RightPanel} from "./RightPanel";
import {GroupNode, LayoutInfo, LayoutType, NodeType, StrokeInfo, TextNode} from "../data/types";
import canvasData from "../data/canvas-data";



// 在构造函数中初始化时先push一个状态
window.history.pushState(null, '', window.location.href);

// 监听 popstate 事件（后退按钮触发）
window.addEventListener('popstate', (event) => {
    // 阻止后退，重新push一个状态

    event.preventDefault()
    console.log('popstate')
    window.history.pushState(null, '', window.location.href);
});


function renderNode(data: any, createElement: RenderContext['createElement']) {
    if (data.type === NodeType.GROUP) {
        return renderGroupNode(data, createElement)
    } else if (data.type === NodeType.TEXT) {
        return renderText(data, createElement)
    }
}


function textAttributesToStyle(node: TextNode) {
    return {
        display: 'inline-block',
        ...node.box,
        ...node.font,
        ...node.textLayout,
    }
}


function renderText(data: TextNode, createElement: RenderContext['createElement']) {
    return <div data-name={data.name} style={() => textAttributesToStyle(data)}>{data.content}</div>
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

function renderGroupNode(data: GroupNode, createElement: RenderContext['createElement']) {
    return <div style={() => groupAttributesToStyle(data)} data-name={data.name}>
        {data.children.map(child => renderNode(child, createElement))
    }</div>
}

export function App({data}: {data:GroupNode}, {createElement, createRef}: RenderContext)  {
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

        console.log(333)
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
        console.log(22222)
        if (event.ctrlKey) {
            console.log(1111)
            event.stopPropagation()
            event.preventDefault()
            lastWheelEvent(event)
        }
    }


    console.log(data)
    return (
        <div style={containerStyle} onWheelCapture={onZoom}>
            <div id={'canvas'} class={'scope-independent'} style={[canvasStyle, resetCanvasStyle]} ref={[containerRef]}>
                <div style={{height:2000, width:1400}}>
                    {renderNode(data, createElement)}
                </div>
            </div>
            <LeftPanel $root:style={{position:'absolute', left:0, top:0}}/>
            <RightPanel $root:style={{position:'absolute', right:0, top:0}}/>
        </div>
    )
}
