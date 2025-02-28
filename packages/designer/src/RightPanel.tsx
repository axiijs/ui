import {Atom, atom, RenderContext} from "axii";
import { SizeInput } from "./lib/SizeInput";
import { UnitType } from "../data/types";
import { BoxInfoEditor } from "./editors/BoxInfoEditor";
import { RxCanvas, RxNodeType } from "./RxPage";

type RightPanelProps = {
    canvas: RxCanvas
    selectedNode: Atom<RxNodeType|null>
}

export function RightPanel({canvas, selectedNode}: RightPanelProps, {createElement}: RenderContext) {
    const containerStyle = {
        width: '320px',
        height: '100%',
        backgroundColor: '#2c2c2c',
        overflow: 'auto',
        paddingTop: '100px',
        paddingLeft: '10px',
        paddingRight: '10px',
    }

    return (
        <div as={'root'} style={containerStyle}>
            {() => {
                const node = selectedNode()
                if (node) {
                    return <BoxInfoEditor node={node} />
                }
                return null
            }}
        </div>
    )
}
