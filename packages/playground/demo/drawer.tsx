import {atom, RenderContext} from "axii";
import {Button, Drawer} from "axii-ui";
import { styleSystem } from "../styleSystem";

const showDrawer = atom(false)

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            <Button
                $root:style={styleSystem.textBox()}
                $root:onClick={() => showDrawer(true)}
            >
                Open Drawer
            </Button>
            <Drawer visible={showDrawer} $content:style={{minHeight: '30vh', ...styleSystem.layout.center()}}>
                <div style={styleSystem.layout.column({gap:10})}>
                    <div>Drawer Content</div>
                    <Button
                        $root:style={styleSystem.textBox()}
                        $root:onClick={() => showDrawer(false)}
                    >
                        Close Drawer
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}