import {atom, RenderContext} from "axii";
import {Button, Dialog} from "axii-ui";
import {styleSystem} from "../styleSystem";
const showDialog = atom(false)

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            <Button
                $root:style={styleSystem.textBox()}
                $root:onClick={() => showDialog(true)}
            >
                Open Dialog
            </Button>
            <Dialog visible={showDialog}>
                <div>Dialog Content</div>
            </Dialog>
        </div>
    )

}