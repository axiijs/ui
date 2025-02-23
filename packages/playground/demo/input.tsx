import {atom, RenderContext} from "axii";
import {Input} from "axii-ui";
import {styleSystem} from "../styleSystem";

export function Demo({}, {createElement}: RenderContext) {
    return (<div style={styleSystem.layout.column({gap: styleSystem.sizes.space.gap()})}>
        <Input prefix="url" affix="unit" placeholder="placeholder" value={atom('')}/>
        <Input placeholder="placeholder" value={atom('')}/>
    </div>)
}