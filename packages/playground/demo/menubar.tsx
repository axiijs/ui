import {atom, RectObject, RenderContext, RxDOMRect} from "axii";
import ArrowRight from "axii-icon-park/Right.js";
import {Button, originMenuContainerStyle, Popover} from 'axii-ui'
import {styleSystem} from '../styleSystem'

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

    const subItemStyle = {
        ...styleSystem.levitatingContainer,
        ...originMenuContainerStyle,
    }

    return <div>
        <Button
            $root:style={styleSystem.textBox()}
            $root:onClick={LLTB}
            $root:ref={rxPosition.ref}
        >
            show menu
        </Button>
        <Popover targetPosition={rxPosition.value} visible={popoverVisible} align={align} $content:style={{overflow:'visible'}}>
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
                        <div style={subItemStyle}>
                            <div><span>item 2.1</span></div>
                            <div>
                                <div>
                                    <span>item 2.2</span>
                                    <ArrowRight/>
                                </div>
                                <div style={subItemStyle}>
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