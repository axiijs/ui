import ArrowRight from "axii-icon-park/Right.js";
import { RenderContext} from "axii";
import {originMenuContainerStyle} from "axii-ui";
import {common} from 'axii-ui/themes/inc.js'

export function Demo({}, {createElement, createStateFromRef}: RenderContext) {
    return (
        <div style={{...originMenuContainerStyle}}>
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
    )
}
