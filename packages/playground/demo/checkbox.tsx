import {atom, RenderContext} from "axii";
import {Checkbox} from "axii-ui";

export function Demo({}, {createElement}: RenderContext) {
    const value= atom(true)
    return <Checkbox value={value} $root:onClick={() => value(!value.raw)}/>
}