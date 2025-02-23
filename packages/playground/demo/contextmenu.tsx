import {atom, RenderContext, withPreventDefault} from "axii";
import {Contextmenu} from "axii-ui";
import {styleSystem} from "../styleSystem";

const contextmenuPosition = atom<any>(null)

export function Demo({}, {createElement}: RenderContext) {
    return <div>
        <div
            oncontextmenu={withPreventDefault((e: MouseEvent) => contextmenuPosition({x: e.clientX, y: e.clientY}))}
            style={{height: 100, border: '1px dashed gray', ...styleSystem.layout.center()}}
        >Right click on me
        </div>
        <Contextmenu position={contextmenuPosition}>
            <div style={styleSystem.listItems}>
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
            </div>
        </Contextmenu>
    </div>
}