import {atom, RenderContext} from "axii";
import {Button, Drawer} from "axii-ui";
import { common } from "../common.js";

const showDrawer = atom(false)

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            <Button
                $root:style={common.textBox()}
                $root:onClick={() => showDrawer(true)}
            >
                Open Drawer
            </Button>
            <Drawer visible={showDrawer} $content:style={{minHeight: '30vh', padding:10}}>
                <div>Drawer Content</div>
                <div>
                    <Button
                        $root:style={common.textBox()}
                        $root:onClick={() => showDrawer(false)}
                    >
                        Close Drawer
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}