import {atom, autorun, createReactiveDragPosition, createReactiveDragTarget, RenderContext} from "axii";
import {common} from "../common.js"

export function Demo({}, {createElement, createStateFromRef}: RenderContext) {

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

    const dragTarget = createStateFromRef(createReactiveDragTarget(() => ({topHeight: topHeight()})))
    const dragPosition = createStateFromRef(createReactiveDragPosition(dragTarget))
    autorun(() => {
        if (dragTarget() && dragPosition()) {
            topHeight(dragTarget()?.topHeight + dragPosition()?.offsetY)
        }
    })

    return (
        <div>
            <div ref={dragPosition.ref} style={containerStyle}>
                <div style={[topStyle, common.layout.center()]}>
                    top
                </div>
                <div ref={dragTarget.ref} style={handleStyle}>
                    <div style={common.separator()}></div>
                </div>
                <div style={{flexGrow: 1, ...common.layout.center()}}>
                    down
                </div>
            </div>

        </div>
    )
}