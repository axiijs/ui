import {atom, createReactivePosition, RenderContext} from "axii";
import {Button, Popover} from 'axii-ui'

export function Demo({}, {createElement, createStateFromRef}: RenderContext) {
    const position = createStateFromRef(createReactivePosition({type: 'interval', duration: 100}))
    const popoverVisible = atom(false)

    const align = atom({
        left: 'left',
        top: 'bottom',
    })

    const LLTB = () => {
        align({left: 'left', top: 'bottom'})
        popoverVisible(true)
    }
    const RRTB = () => {
        align({right: 'right', top: 'bottom'})
        popoverVisible(true)
    }
    const LLBT = () => {
        align({left: 'left', bottom: 'top'})
        popoverVisible(true)
    }
    const LRBT = () => {
        align({left: 'right', bottom: 'top'})
        popoverVisible(true)
    }
    const HMMTB = () => {
        align({horizontalMiddle: 'middle', top: 'bottom'})
        popoverVisible(true)
    }


    return <div>
        <div ref={position.ref} style={{width: 100, height: 100, border: '1px dashed #000'}}>target</div>
        <Button $root:onClick={LLTB}>LLTB</Button>
        <Button $root:onClick={RRTB}>RRTB</Button>
        <Button $root:onClick={LLBT}>LLBT</Button>
        <Button $root:onClick={LRBT}>LRBT</Button>
        <Button $root:onClick={HMMTB}>HMMTB</Button>
        <Popover targetPosition={position} visible={popoverVisible} align={align}>
            {() => (<div>
                popover content
            </div>)}
        </Popover>
    </div>
}