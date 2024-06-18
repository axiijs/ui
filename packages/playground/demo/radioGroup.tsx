import {atom, RenderContext} from "axii";
import {RadioGroup} from "axii-ui";

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            <RadioGroup value={atom('a')} options={['a', 'b', 'c']}/>
        </div>
    )
}