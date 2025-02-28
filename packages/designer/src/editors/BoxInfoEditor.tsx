import { Atom, RenderContext } from "axii";
import { SizeInput } from "../../src/lib/SizeInput";
import { UnitType } from "../../data/types";
import { RxNode } from "../RxPage";
import { MaxWidthIcon } from "../icons/maxWidth";
import { DownIcon } from "../icons/down";


type SizeInputProps = {
    value: Atom<[number, UnitType] | null> 
}

const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(56,56,56)',
    borderRadius: 4,
    minWidth: 0,
    '&>div:first-child': {
        color: 'white',
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&>svg': {
            width: 12,
            height: 12,
        }
    },
    '&>div:last-child': {
        color: 'white',
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&>svg': {
            width: 12,
            height: 12,
        }
    }
}

function WidthInput({value}: SizeInputProps, {createElement}: RenderContext) {
    return (
        <div style={inputContainerStyle}>
            <div>W</div>
            <SizeInput value={value} $main:placeholder="auto" />
            <div>
                <DownIcon />
            </div>
        </div>
    )
}

function HeightInput({value}: SizeInputProps, {createElement}: RenderContext) {
    return (
        <div style={inputContainerStyle}>
            <div>H</div>
            <SizeInput value={value} $main:placeholder="auto" />
            <div>
                <DownIcon />
            </div>
        </div>
    )
}

function MaxWidthInput({value}: SizeInputProps, {createElement}: RenderContext) {
    return (
        <div style={inputContainerStyle}>
            <div><MaxWidthIcon /></div>
            <SizeInput value={value} $main:placeholder="Max W" />
            <div>
                <DownIcon />
            </div>
        </div>
    )
}

function MinWidthInput({value}: SizeInputProps, {createElement}: RenderContext) {
    return (
        <div style={inputContainerStyle}>
            <div><MaxWidthIcon /></div>
            <SizeInput value={value} $main:placeholder="Min W" />
            <div>
                <DownIcon />
            </div>
        </div>
    )
}

function MaxHeightInput({value}: SizeInputProps, {createElement}: RenderContext) {
    return (
        <div style={inputContainerStyle}>
            <div><MaxWidthIcon /></div>
            <SizeInput value={value} $main:placeholder="Max H" />
            <div>
                <DownIcon />
            </div>
        </div>
    )
}

function MinHeightInput({value}: SizeInputProps, {createElement}: RenderContext) {
    return (
        <div style={inputContainerStyle}>
            <div><MaxWidthIcon /></div>
            <SizeInput value={value} $main:placeholder="Min H" />
            <div>
                <DownIcon />
            </div>
        </div>
    )
}


export function BoxInfoEditor({node}: {node: RxNode}, {createElement}: RenderContext) {
 const valuesContainerStyle = {
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
        <div>
            <div>Box</div>
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