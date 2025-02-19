import {atom, createReactivePosition, RectObject, RenderContext, RxDOMRect} from "axii";
import {Button, Popover} from 'axii-ui'

export function Demo({}, {createElement}: RenderContext) {
    const rxPosition = new RxDOMRect(atom<RectObject>(null),{type: 'interval', duration: 100})
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
    const RRBT = () => {
        align({right: 'right', bottom: 'top'})
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
    const LRTB = () => {
        align({left: 'right', top: 'bottom'})
        popoverVisible(true)
    }
    const HMMTB = () => {
        align({horizontalMiddle: 'middle', top: 'bottom'})
        popoverVisible(true)
    }
    const HMMBT = () => {
        align({horizontalMiddle: 'middle', bottom: 'top'})
        popoverVisible(true)
    }
    const HMLBT = () => {
        align({horizontalMiddle: 'left', bottom: 'top'})
        popoverVisible(true)
    }
    const HMLTB = () => {
        align({horizontalMiddle: 'left', top: 'bottom'})
        popoverVisible(true)
    }
    const HMRBT = () => {
        align({horizontalMiddle: 'right', bottom: 'top'})
        popoverVisible(true)
    }
    const HMRTB = () => {
        align({horizontalMiddle: 'right', top: 'bottom'})
        popoverVisible(true)
    }
    const VMMRL = () => {
        align({verticalMiddle: 'middle', right: 'left'})
        popoverVisible(true)
    }
    const VMMRR = () => {
        align({verticalMiddle: 'middle', right: 'right'})
        popoverVisible(true)
    }
    const VMMLL = () => {
        align({verticalMiddle: 'middle', left: 'left'})
        popoverVisible(true)
    }
    const VMMLR = () => {
        align({verticalMiddle: 'middle', left: 'right'})
        popoverVisible(true)
    }


    return <div>
        <div ref={rxPosition.ref} style={{marginLeft: 200, width: 100, height: 100, border: '1px dashed #000'}}>target</div>
        <Button $root:onClick={LLTB}>LLTB</Button>
        <Button $root:onClick={LLBT}>LLBT</Button>
        <Button $root:onClick={RRTB}>RRTB</Button>
        <Button $root:onClick={RRBT}>RRBT</Button>
        <Button $root:onClick={LRBT}>LRBT</Button>
        <Button $root:onClick={LRTB}>LRTB</Button>
        <Button $root:onClick={HMMTB}>HMMTB</Button>
        <Button $root:onClick={HMMBT}>HMMBT</Button>
        <Button $root:onClick={HMLBT}>HMLBT</Button>
        <Button $root:onClick={HMLTB}>HMLTB</Button>
        <Button $root:onClick={HMRBT}>HMRBT</Button>
        <Button $root:onClick={HMRTB}>HMRTB</Button>
        <Button $root:onClick={VMMRL}>VMMRL</Button>
        <Button $root:onClick={VMMRR}>VMMRR</Button>
        <Button $root:onClick={VMMLL}>VMMLL</Button>
        <Button $root:onClick={VMMLR}>VMMLR</Button>
        <Popover targetPosition={rxPosition.value} visible={popoverVisible} align={align}>
            {() => (<div>
                <div>popover content very very looooooooooooooooooooong</div>
                <div>popover content very very looooooooooooooooooooong</div>
                <div>popover content very very looooooooooooooooooooong</div>
                <div>popover content very very looooooooooooooooooooong</div>
                <div>popover content very very looooooooooooooooooooong</div>
                <div>popover content very very looooooooooooooooooooong</div>
                <div>popover content very very looooooooooooooooooooong</div>
                <div>popover content very very looooooooooooooooooooong</div>
                <div>popover content very very looooooooooooooooooooong</div>
            </div>)}
        </Popover>
    </div>
}