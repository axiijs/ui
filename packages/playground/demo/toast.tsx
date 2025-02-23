import {RenderContext} from "axii";
import {Button, Toast} from "axii-ui";
import {styleSystem} from "../styleSystem";

const toastStack = Toast.propTypes!.stack.defaultValue
let toastStackTimes = 1
const addToast = () => {
    toastStack.unshift((toastStackTimes++).toString().repeat(10))
}

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            <Button
                $root:style={styleSystem.textBox()}
                $root:onClick={addToast}
            >
                add toast
            </Button>
            <Toast $content:style={{padding:10}} stack={toastStack}/>
        </div>
    )
}