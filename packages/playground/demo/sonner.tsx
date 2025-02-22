import {RenderContext} from "axii";
import {Button, Sonner} from "axii-ui";
import {common} from "../common.js";

const sonnerStack = Sonner.propTypes!.stack.defaultValue
let sonnerStackTimes = 1
const addSonner = () => {
    sonnerStack.unshift((sonnerStackTimes++).toString().repeat(10))
}

export function Demo({}, {createElement}: RenderContext) {
    return (
        <div>
            {/*<Button $root:onClick={() => toastStack.unshift((toastStackTimes++).toString().repeat(10))}>add toast</Button>*/}
            <Button
                $root:style={common.textBox()}
                $root:onClick={addSonner}
            >
                add sonner
            </Button>
            <Sonner $content:style={{padding:10}} stack={sonnerStack}/>
        </div>
    )
}