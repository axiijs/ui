import {RenderContext} from "axii";
import {subPanelStyle} from "./style";

export function LeftPanel({}, {createElement}: RenderContext) {
    const containerStyle = {
        width: '240px',
        height: '100%',
        backgroundColor: '#2c2c2c',
        overflow: 'auto',
    }
    return (
        <div as={'root'} style={containerStyle}>
            <div style={subPanelStyle}>Components</div>
            <div style={subPanelStyle}>Variables</div>
            <div style={subPanelStyle}>Layers</div>
        </div>
    )
}
