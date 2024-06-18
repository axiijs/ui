import {atom, RenderContext, withPreventDefault} from "axii";
import {Contextmenu} from "axii-ui";
import {common} from "../common.js";

const contextmenuPosition = atom<any>(null)

export function Demo({}, {createElement}: RenderContext) {
    return <div>
        <div
            oncontextmenu={withPreventDefault((e: MouseEvent) => contextmenuPosition({x: e.clientX, y: e.clientY}))}
            style={{height: 100, border: '1px dashed gray', ...common.layout.center()}}
        >right click on me
        </div>
        <Contextmenu position={contextmenuPosition}>
            <div style={common.listItems}>
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
            </div>
        </Contextmenu>
    </div>
}