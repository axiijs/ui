import {atom, RenderContext} from "axii";
import {Switch} from "axii-ui";

export function Demo({}, {createElement}: RenderContext) {
    return <Switch value={atom(true)}/>;
}