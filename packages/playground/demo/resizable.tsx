import {
    atom,
    autorun,
    createReactiveDragPosition,
    createReactiveDragTarget, DragPosition,
    RenderContext,
    RxDOMDragPosition
} from "axii";
import {common} from "../common.js"

export function Demo({}, {createElement, createRef}: RenderContext) {

    const containerStyle = {
        ...common.enclosedContainer,
        ...common.layout.flexColumnStretched({gap:0}),
        height: '200px',
    }

    const topHeight = atom(50)
    const topStyle = () => ({
        height: topHeight(),
    })

    const handleStyle = () => ({
        cursor: 'row-resize',
    })


    const containerRef = createRef()

    const rxDragPosition = new RxDOMDragPosition(atom<DragPosition>(null), containerRef)

    autorun(() => {
        const position = rxDragPosition.value()
        if (position) {
            topHeight(position.clientY-position.startY-position.containerRect!.top)
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
                <div style={{flexGrow: 1, ...common.layout.center()}}>
                    down
                </div>
            </div>

        </div>
    )
}