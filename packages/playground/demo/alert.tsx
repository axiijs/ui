import {RenderContext} from "axii";
import {common} from "../common.js";


export function Demo({}, {createElement}: RenderContext) {
    const containerStyle = {
        ...common.enclosedContainer,
        ...common.panelPaddingContainer,
    }
    return <div style={common.layout.column({gap: common.sizes.space.gap()})}>
        <div style={{...containerStyle, ...common.textBox({infoColor: common.colorScheme.error})}}>
            This is a error message
        </div>
        <div
            style={{...containerStyle, ...common.textBox({highlight: true, infoColor: common.colorScheme.error})}}>
            This is a error message
        </div>
        <div style={{...containerStyle, ...common.textBox({ infoColor: common.colorScheme.info})}}>
            This is a info message
        </div>
        <div style={{...containerStyle, ...common.textBox({highlight: true, infoColor: common.colorScheme.info})}}>
            This is a info message
        </div>
        <div style={{...containerStyle, ...common.textBox({infoColor: common.colorScheme.success})}}>
            This is a success message
        </div>
        <div style={{
            ...containerStyle, ...common.textBox({
                highlight: true,
                infoColor: common.colorScheme.success
            })
        }}>
            This is a success message
        </div>
        <div style={{...containerStyle, ...common.textBox({infoColor: common.colorScheme.warning})}}>
            This is a warning message
        </div>
        <div style={{
            ...containerStyle, ...common.textBox({
                highlight: true,
                infoColor: common.colorScheme.warning
            })
        }}>
            This is a warning message
        </div>
    </div>
}