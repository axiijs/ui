import {RenderContext} from "axii";
import {Button, Toast} from "axii-ui";

const toastStack = Toast.propTypes!.stack.defaultValue
let toastStackTimes = 1
const addToast = () => {
    toastStack.unshift((toastStackTimes++).toString().repeat(10))
}

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            {/*<Button $root:onClick={() => toastStack.unshift((toastStackTimes++).toString().repeat(10))}>add toast</Button>*/}
            <Button $root:onClick={addToast}>add toast</Button>
            <Toast stack={toastStack}/>
        </div>
    )
}