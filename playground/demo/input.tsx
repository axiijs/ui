import {atom, RenderContext} from "axii";
import {Input} from "axii-ui";

export function Demo({}, {createElement}: RenderContext) {
    return (<div>
        <Input prefix="url" affix="unit" placeholder="placeholder" value={atom('')}/>
    </div>)
}