import {atom, RenderContext} from "axii";
import {Tabs} from "axii-ui";

export function Demo({}, {createElement}: RenderContext) {
    return <Tabs options={["Tab One", "Tab Two", "Tab Three"]} current={atom('Tab One')}/>;
}