import { Atom, RenderContext, RxList } from "axii";
import { RxTextNode } from "../RxPage";
import { commonOptionStyle,  subPanelStyle } from "../style";
import { createElement as icon, AlignHorizontalDistributeStart, AlignHorizontalDistributeEnd } from 'lucide';
import { SizeInput } from "../lib/SizeInput";
import { DisplayOption, DisplayValue, Select } from "../lib/Select";
import { UnitType } from "../../data/types";

// Define type for TextIndentInput props
type TextIndentInputProps = {
    value: {
        value: Atom<[number, UnitType] | null>
        variable: Atom<string | undefined>
    }
}

// Text indent input component
function TextIndentInput({value}: TextIndentInputProps, {createElement}: RenderContext) {
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
            flexShrink: 0,
            '&>svg': {
                width: 12,
                height: 12,
            }
        }
    }

    return (
        <div style={inputContainerStyle}>
            <div>{icon(AlignHorizontalDistributeStart, {stroke: 'white', width:12, height:12})}</div>
            <SizeInput value={value.value} $main:placeholder="Text Indent" />
        </div>
    )
}

// Define type for WhiteSpaceSelector props
type WhiteSpaceSelectorProps = {
    value: {
        value: Atom<'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | null>
        variable: Atom<string | undefined>
    }
}

// White space selector component
function WhiteSpaceSelector({value}: WhiteSpaceSelectorProps, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'}>([
        { label: 'Normal', value: 'normal' },
        { label: 'No Wrap', value: 'nowrap' },
        { label: 'Pre', value: 'pre' },
        { label: 'Pre Wrap', value: 'pre-wrap' },
        { label: 'Pre Line', value: 'pre-line' }
    ]);

    const selectedOption = options.find(option => option.value === value.value());

    function Option({value: optionValue, selected}: {value: {label: string, value: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({whiteSpace: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedOption} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Define type for TextOverflowSelector props
type TextOverflowSelectorProps = {
    value: {
        value: Atom<'clip' | 'ellipsis' | null>
        variable: Atom<string | undefined>
    }
}

// Text overflow selector component
function TextOverflowSelector({value}: TextOverflowSelectorProps, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'clip' | 'ellipsis'}>([
        { label: 'Clip', value: 'clip' },
        { label: 'Ellipsis', value: 'ellipsis' }
    ]);

    const selectedOption = options.find(option => option.value === value.value());

    function Option({value: optionValue, selected}: {value: {label: string, value: 'clip' | 'ellipsis'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({textOverflow: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedOption} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Define type for WordBreakSelector props
type WordBreakSelectorProps = {
    value: {
        value: Atom<'normal' | 'break-all' | 'keep-all' | 'break-word' | null>
        variable: Atom<string | undefined>
    }
}

// Word break selector component
function WordBreakSelector({value}: WordBreakSelectorProps, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'normal' | 'break-all' | 'keep-all' | 'break-word'}>([
        { label: 'Normal', value: 'normal' },
        { label: 'Break All', value: 'break-all' },
        { label: 'Keep All', value: 'keep-all' },
        { label: 'Break Word', value: 'break-word' }
    ]);

    const selectedOption = options.find(option => option.value === value.value());

    function Option({value: optionValue, selected}: {value: {label: string, value: 'normal' | 'break-all' | 'keep-all' | 'break-word'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({wordBreak: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedOption} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Define type for OverflowWrapSelector props
type OverflowWrapSelectorProps = {
    value: {
        value: Atom<'normal' | 'break-word' | null>
        variable: Atom<string | undefined>
    }
}

// Overflow wrap selector component
function OverflowWrapSelector({value}: OverflowWrapSelectorProps, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'normal' | 'break-word'}>([
        { label: 'Normal', value: 'normal' },
        { label: 'Break Word', value: 'break-word' }
    ]);

    const selectedOption = options.find(option => option.value === value.value());

    function Option({value: optionValue, selected}: {value: {label: string, value: 'normal' | 'break-word'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({overflowWrap: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedOption} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Define type for HyphensSelector props
type HyphensSelectorProps = {
    value: {
        value: Atom<'none' | 'manual' | 'auto' | null>
        variable: Atom<string | undefined>
    }
}

// Hyphens selector component
function HyphensSelector({value}: HyphensSelectorProps, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'none' | 'manual' | 'auto'}>([
        { label: 'None', value: 'none' },
        { label: 'Manual', value: 'manual' },
        { label: 'Auto', value: 'auto' }
    ]);

    const selectedOption = options.find(option => option.value === value.value());

    function Option({value: optionValue, selected}: {value: {label: string, value: 'none' | 'manual' | 'auto'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({hyphens: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedOption} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Define type for DirectionSelector props
type DirectionSelectorProps = {
    value: {
        value: Atom<'ltr' | 'rtl' | null>
        variable: Atom<string | undefined>
    }
}

// Direction selector component
function DirectionSelector({value}: DirectionSelectorProps, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'ltr' | 'rtl'}>([
        { label: 'Left to Right', value: 'ltr' },
        { label: 'Right to Left', value: 'rtl' }
    ]);

    const selectedOption = options.find(option => option.value === value.value());

    function Option({value: optionValue, selected}: {value: {label: string, value: 'ltr' | 'rtl'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({direction: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedOption} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Main TextLayoutInfoEditor component
export function TextLayoutInfoEditor({node}: {node: RxTextNode}, {createElement}: RenderContext) {
    const valuesContainerStyle = {
        padding: [0, 12, 12],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: 10,
        '&>*': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            '&>*': {
                flexShrink: 1,
                flexGrow: 1,
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
            <div as='name'>Text Layout</div>
            <div style={valuesContainerStyle}>
                <div>
                    <TextIndentInput value={node.textLayout.textIndent} />
                </div>
                <div>
                    <WhiteSpaceSelector value={node.textLayout.whiteSpace} />
                    <TextOverflowSelector value={node.textLayout.textOverflow} />
                </div>
                <div>
                    <WordBreakSelector value={node.textLayout.wordBreak} />
                    <OverflowWrapSelector value={node.textLayout.overflowWrap} />
                </div>
                <div>
                    <HyphensSelector value={node.textLayout.hyphens} />
                    <DirectionSelector value={node.textLayout.direction} />
                </div>
            </div>
        </div>
    )
} 