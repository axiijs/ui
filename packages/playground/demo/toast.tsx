import {RenderContext} from "axii";
import {Button, Toast} from "axii-ui";
import {common} from "../common.js";

const toastStack = Toast.propTypes!.stack.defaultValue
let toastStackTimes = 1
const addToast = () => {
    toastStack.unshift((toastStackTimes++).toString().repeat(10))
}

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            <Button
                $root:style={common.textBox()}
                $root:onClick={addToast}
            >
                add toast
            </Button>
            <Toast $content:style={{padding:10}} stack={toastStack}/>
        </div>
    )
}