import {RenderContext} from "axii";
import {styleSystem} from "../styleSystem";


export function Demo({}, {createElement}: RenderContext) {
    const containerStyle = {
        ...styleSystem.enclosedContainer,
        ...styleSystem.panelPaddingContainer,
    }
    return <div style={styleSystem.layout.column({gap: styleSystem.sizes.space.gap()})}>
        <div style={{...containerStyle, ...styleSystem.textBox({infoColor: styleSystem.colorScheme.error})}}>
            This is a error message
        </div>
        <div
            style={{...containerStyle, ...styleSystem.textBox({highlight: true, infoColor: styleSystem.colorScheme.error})}}>
            This is a error message
        </div>
        <div style={{...containerStyle, ...styleSystem.textBox({ infoColor: styleSystem.colorScheme.info})}}>
            This is a info message
        </div>
        <div style={{...containerStyle, ...styleSystem.textBox({highlight: true, infoColor: styleSystem.colorScheme.info})}}>
            This is a info message
        </div>
        <div style={{...containerStyle, ...styleSystem.textBox({infoColor: styleSystem.colorScheme.success})}}>
            This is a success message
        </div>
        <div style={{
            ...containerStyle, ...styleSystem.textBox({
                highlight: true,
                infoColor: styleSystem.colorScheme.success
            })
        }}>
            This is a success message
        </div>
        <div style={{...containerStyle, ...styleSystem.textBox({infoColor: styleSystem.colorScheme.warning})}}>
            This is a warning message
        </div>
        <div style={{
            ...containerStyle, ...styleSystem.textBox({
                highlight: true,
                infoColor: styleSystem.colorScheme.warning
            })
        }}>
            This is a warning message
        </div>
    </div>
}