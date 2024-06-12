import {atom, createReactivePosition, RenderContext} from "axii";
import {Button, Dropdown} from 'axii-ui'
export function Demo({}, {createElement, createStateFromRef}: RenderContext) {
    const position = createStateFromRef(createReactivePosition({type: 'interval', duration: 100}))
    const dropdownVisible = atom(false)
    return <div>
        <Button $root:ref={position.ref} $root:onClick={() => dropdownVisible(true)}>show dropdown</Button>
        <Dropdown targetPosition={position} visible={dropdownVisible}>
            {() => (<div>
                dropdown content
            </div>)}
        </Dropdown>
    </div>
}