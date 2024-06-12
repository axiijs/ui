import {atom, createReactivePosition, RenderContext} from "axii";
import ArrowRight from "axii-icon-park/Right.js";
import {Button, Popover, originMenuContainerStyle} from 'axii-ui'
import {common} from 'axii-ui/themes/inc.js'

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

    return <div>
        <Button $root:onClick={LLTB} $root:ref={position.ref}>show menu</Button>
        <Popover targetPosition={position} visible={popoverVisible} align={align}>
            {() => (
                <div style={{...originMenuContainerStyle, boxShadow: 'none', border: 0}}>
                    <div>
                        <span>item 1</span>
                    </div>
                    <div>
                        <div>
                            <span>item 2</span>
                            <ArrowRight/>
                        </div>
                        <div style={{...originMenuContainerStyle, ...common.levitatingContainer}}>
                            <div><span>item 2.1</span></div>
                            <div>
                                <div>
                                    <span>item 2.2</span>
                                    <ArrowRight/>
                                </div>
                                <div style={{...originMenuContainerStyle, ...common.levitatingContainer}}>
                                    <div><span>item 2.2.1</span></div>
                                    <div><span>item 2.2.2</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>item 3 very long item</span>
                    </div>
                </div>
            )}
        </Popover>
    </div>

}