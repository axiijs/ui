import {atom, RenderContext} from "axii";
import {Checkbox} from "axii-ui";

export function Demo({}, {createElement}: RenderContext) {
    return <Checkbox value={atom(true)}/>
}