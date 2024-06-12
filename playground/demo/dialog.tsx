import {atom, RenderContext} from "axii";
import {Button, Dialog} from "axii-ui";
const showDialog = atom(false)

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            <Button $root:onClick={() => showDialog(true)}>Open Dialog</Button>
            <Dialog visible={showDialog}>
                <div>Dialog Content</div>
            </Dialog>
        </div>
    )

}