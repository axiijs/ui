import {atom, RectObject, RenderContext, RxDOMRect} from "axii";
import {Button, Dropdown} from 'axii-ui'
import {styleSystem} from "../styleSystem";

export function Demo({}, {createElement}: RenderContext) {
    const rxPosition = new RxDOMRect(atom<RectObject>(null), {type: 'interval', duration: 100})
    const dropdownVisible = atom(false)
    return <div>
        <Button
            $root:style={styleSystem.textBox()}
            $root:ref={rxPosition.ref}
            $root:onClick={() => dropdownVisible(true)}
        >
            show dropdown
        </Button>
        <Dropdown targetPosition={rxPosition.value} visible={dropdownVisible}>
            {() => (<div style={{padding:10}}>
                dropdown content
            </div>)}
        </Dropdown>
    </div>
}