import {RenderContext} from "axii";
import {Button, Sonner} from "axii-ui";

const sonnerStack = Sonner.propTypes!.stack.defaultValue
let sonnerStackTimes = 1
const addSonner = () => {
    sonnerStack.unshift((sonnerStackTimes++).toString().repeat(10))
}

export function Demo({}, {createElement, createStateFromRef}: RenderContext) {
    return (
        <div>
            {/*<Button $root:onClick={() => toastStack.unshift((toastStackTimes++).toString().repeat(10))}>add toast</Button>*/}
            <Button $root:onClick={addSonner}>add sonner</Button>
            <Sonner stack={sonnerStack}/>
        </div>
    )
}