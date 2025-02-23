import {RenderContext} from "axii";
import {Button} from "axii-ui";
import {common} from "../common.js";

export function Demo({}, {createElement}: RenderContext) {
    return (<div style={{...common.layout.column({gap: common.sizes.space.gap()})}}>
        <div style={{...common.layout.row({gap: common.sizes.space.gap(), flexWrap: 'wrap'})}}>
            <Button $root:style={common.textBox()}>
                default button
            </Button>
            <Button $root:style={common.textBox({interactable:false})}>
                default button
            </Button>
            <Button $root:style={common.textBox({colorBox: true, infoColor: common.colorScheme.error})}>
                button with error color
            </Button>
            <Button $root:style={common.textBox({colorBox: true, infoColor: common.colorScheme.error, interactable:true})}>
                interactable button with error color
            </Button>
            <Button $root:style={common.textBox({colorBox: true, infoColor: common.colorScheme.error, interactable:false})}>
                non-interactable button with error color
            </Button>
        </div>
        <div style={{...common.layout.row({gap: common.sizes.space.gap(), flexWrap:'wrap'})}}>
            <Button $root:style={common.textBox({colorBox:true})}>
                inverted button
            </Button>
            <Button $root:style={common.textBox({infoColor: common.colorScheme.error, colorBox:true})}>
                inverted button
            </Button>
            <Button $root:style={common.textBox({infoColor: common.colorScheme.error, colorBox:true, interactable: true})}>
                interactable inverted button
            </Button>
            <Button $root:style={common.textBox({infoColor: common.colorScheme.error, colorBox:true, interactable: false})}>
                non-interactable inverted button
            </Button>
        </div>
    </div>)
}