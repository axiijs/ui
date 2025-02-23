import {atom, RenderContext} from "axii";
import {Input} from "axii-ui";
import {common} from "../common.js";

export function Demo({}, {createElement}: RenderContext) {
    return (<div style={common.layout.column({gap: common.sizes.space.gap()})}>
        <Input prefix="url" affix="unit" placeholder="placeholder" value={atom('')}/>
        <Input placeholder="placeholder" value={atom('')}/>
    </div>)
}