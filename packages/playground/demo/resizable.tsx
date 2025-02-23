import {atom, autorun, DragPosition, RenderContext, RxDOMDragPosition} from "axii";
import {common} from "../common.js"

export function Demo({}, {createElement, createRef}: RenderContext) {

    const containerStyle = () => ({
        position:"relative",
        ...common.enclosedContainer,
        ...common.layout.column({gap:0}),
        height: '200px',
        userSelect:'none',
        cursor: rxDragPosition.value() ? 'ns-resize' : (rxVerticalDragPosition.value() ? 'ew-resize':'default')
    })

    const topHeight = atom(50)
    const topStyle = () => ({
        flexBasis: topHeight(),
        flexShrink: 0,
        height: topHeight(),
        overflow: 'hidden',
    })

    const bottomLeftWidth = atom(100)
    const bottomLeftStyle = () => ({
        width: bottomLeftWidth(),
        flexBasis: bottomLeftWidth(),
        flexShrink: 0,
        overflow: 'hidden',
    })

    const handleStyle = () => ({
        height: 10,
        cursor: 'ns-resize',
        position: 'absolute',
        top: topHeight()-5,
        left:0,
        right:0,
        ...common.layout.center(),
    })

    const verticalHandleStyle=() =>({
        width: 10,
        position: 'absolute',
        cursor: 'ew-resize',
        left: bottomLeftWidth()-5,
        top:0,
        bottom:0,
        ...common.layout.center(),
        '&>*': {
            flexShrink:0
        }
    })


    const containerRef = createRef()
    const rxDragPosition = new RxDOMDragPosition(atom<DragPosition>(null), containerRef)

    const verticalContainerRef = createRef()
    const rxVerticalDragPosition = new RxDOMDragPosition(atom<DragPosition>(null), verticalContainerRef)

    autorun(() => {
        const position = rxDragPosition.value()
        if (position) {
            topHeight(position.clientY-position.startY-position.containerRect!.top)
        }

        const verticalPosition = rxVerticalDragPosition.value()
        if (verticalPosition) {
            bottomLeftWidth(verticalPosition.clientX-verticalPosition.startX-verticalPosition.containerRect!.left)
        }
    })

    return (
        <div>
            <div ref={containerRef} style={containerStyle}>
                <div style={[topStyle, common.layout.center()]}>
                    top
                </div>
                <div ref={rxDragPosition.ref} style={handleStyle}>
                    <div style={common.separator()}></div>
                </div>
                <div style={{flexGrow: 1, position:'relative', ...common.layout.row({alignItems:'stretch'})}} ref={verticalContainerRef}>
                    <div style={[bottomLeftStyle, common.layout.center()]}>bottom left</div>
                    <div ref={rxVerticalDragPosition.ref} style={verticalHandleStyle}>
                        <div style={common.separator(true)}></div>
                    </div>
                    <div style={{flexGrow:1, ...common.layout.center(), overflow:'hidden'}}>bottom right</div>
                </div>
            </div>

        </div>
    )
}