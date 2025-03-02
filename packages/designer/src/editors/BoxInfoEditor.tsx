import { RenderContext } from "axii";
import { RxNode } from "../RxPage";
import {  subPanelStyle } from "../style";
import { WidthInput, HeightInput, MaxWidthInput, MaxHeightInput, MinWidthInput, MinHeightInput } from "../lib/SizeInputs";

export function BoxInfoEditor({node}: {node: RxNode}, {createElement}: RenderContext) {
 const valuesContainerStyle = {
    padding: [0, 12, 12],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    '&>*': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        '&>*': {
            flexShrink:1,
            flexGrow:1,
            flexBasis: 0,
            maxWidth: '100%',
            minWidth: 0,
        }
    },
    maxWidth: '100%',
    minWidth: 0,
 }

    return (
        <div style={subPanelStyle}>
            <div as='name'>Box</div>
            <div style={valuesContainerStyle}>
                <div>
                    <WidthInput value={node.box.width} />
                    <HeightInput value={node.box.height} />
                </div>
                <div>
                    <MaxWidthInput value={node.box.maxWidth} />
                    <MaxHeightInput value={node.box.maxHeight} />
                </div>
                <div>
                    <MinWidthInput value={node.box.minWidth} />
                    <MinHeightInput value={node.box.minHeight} />
                </div>
            </div>
        </div>
    )
}