import {RenderContext} from "axii";
import {subPanelStyle} from "./style";
import { LayersPanel } from "./LayersPanel";
import { RxCanvas } from "./RxPage";

export type LeftPanelProps = {
    canvas: RxCanvas
}

export function LeftPanel({canvas}: LeftPanelProps, {createElement}: RenderContext) {
    const containerStyle = {
        width: '240px',
        height: '100%',
        backgroundColor: '#2c2c2c',
        overflow: 'auto',
    }
    return (
        <div as={'root'} style={containerStyle}>
            <div style={subPanelStyle}>
                <div as='name'>Components</div>
            </div>
            <div style={subPanelStyle}>
                <div as='name'>Variables</div>
            </div>
            <LayersPanel canvas={canvas} $root:style={subPanelStyle}></LayersPanel>
        </div>
    )
}
