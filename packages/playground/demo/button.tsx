import {RenderContext} from "axii";
import {Button} from "axii-ui";
import {styleSystem} from "../styleSystem";

export function Demo({}, {createElement}: RenderContext) {
    return (<div style={{...styleSystem.layout.column({gap: styleSystem.sizes.space.gap()})}}>
        <div style={{...styleSystem.layout.row({gap: styleSystem.sizes.space.gap(), flexWrap: 'wrap'})}}>
            <Button $root:style={styleSystem.textBox()}>
                default button
            </Button>
            <Button $root:style={styleSystem.textBox({interactable:false})}>
                default button
            </Button>
            <Button $root:style={styleSystem.textBox({colorBox: true, infoColor: styleSystem.colorScheme.error})}>
                button with error color
            </Button>
            <Button $root:style={styleSystem.textBox({colorBox: true, infoColor: styleSystem.colorScheme.error, interactable:true})}>
                interactable button with error color
            </Button>
            <Button $root:style={styleSystem.textBox({colorBox: true, infoColor: styleSystem.colorScheme.error, interactable:false})}>
                non-interactable button with error color
            </Button>
        </div>
        <div style={{...styleSystem.layout.row({gap: styleSystem.sizes.space.gap(), flexWrap:'wrap'})}}>
            <Button $root:style={styleSystem.textBox({colorBox:true})}>
                inverted button
            </Button>
            <Button $root:style={styleSystem.textBox({infoColor: styleSystem.colorScheme.error, colorBox:true})}>
                inverted button
            </Button>
            <Button $root:style={styleSystem.textBox({infoColor: styleSystem.colorScheme.error, colorBox:true, interactable: true})}>
                interactable inverted button
            </Button>
            <Button $root:style={styleSystem.textBox({infoColor: styleSystem.colorScheme.error, colorBox:true, interactable: false})}>
                non-interactable inverted button
            </Button>
        </div>
    </div>)
}