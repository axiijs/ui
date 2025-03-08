import {Atom, atom, RenderContext} from "axii";
import { SizeInput } from "./lib/SizeInput";
import { UnitType } from "../data/types";
import { BoxInfoEditor } from "./editors/BoxInfoEditor";
import { RxCanvas, RxCollection, RxNodeType, RxTextNode } from "./RxPage";
import { LayoutInfoEditor } from "./editors/LayoutInfoEditor";
import { FillEditor } from "./editors/FillEditor";
import { TextLayoutInfoEditor } from "./editors/TextLayoutInfoEditor";
import { FontInfoEditor } from "./editors/FontInfoEditor";

type RightPanelProps = {
    canvas: RxCanvas
}

export function RightPanel({canvas}: RightPanelProps, {createElement}: RenderContext) {
    const selectedNode = canvas.leafSelectedNode
    const containerStyle = {
        width: '320px',
        height: '100%',
        backgroundColor: '#2c2c2c',
        overflow: 'auto',
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
            {() => {
                const node = selectedNode()
                if (node instanceof RxCollection) {
                    return <LayoutInfoEditor node={node} />
                }
                return null
            }}
            {/* {() => {
                const node = selectedNode()
                if (node instanceof RxCollection) {
                    return <FillEditor node={node} />
                }
                return null
            }} */}
            {() => {
                const node = selectedNode()
                if (node instanceof RxTextNode) {
                    return <TextLayoutInfoEditor node={node} />
                }
                return null
            }}
            {() => {
                const node = selectedNode()
                if (node instanceof RxTextNode) {
                    return <FontInfoEditor node={node} />
                }
                return null
            }}
        </div>
    )
}
