import {atom, RenderContext} from "axii";
import {Button, Drawer} from "axii-ui";
const showDrawer = atom(false)

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            <Button $root:onClick={() => showDrawer(true)}>Open Drawer</Button>
            <Drawer visible={showDrawer} $content:style={{minHeight: '30vh'}}>
                <div>Drawer Content</div>
                <div>
                    <Button $root:onClick={() => showDrawer(false)}>Close Drawer</Button>
                </div>
            </Drawer>
        </div>
    )
}