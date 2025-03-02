import { Atom, RenderContext, RxList } from "axii";
import { RxTextNode } from "../RxPage";
import { commonOptionStyle, subPanelStyle } from "../style";
import { createElement as icon, Type, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide';
import { SizeInput } from "../lib/SizeInput";
import {  DisplayValue, Select } from "../lib/Select";
import { UnitType } from "../../data/types";

// Font size input component
type FontSizeInputProps = {
    value: {
        value: Atom<[number, UnitType] | null> 
        variable: Atom<string | undefined>
    }
}

function FontSizeInput({value}: FontSizeInputProps, {createElement}: RenderContext) {
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
            <div>{icon(Type, {stroke: 'white', width:12, height:12})}</div>
            <SizeInput value={value.value} $main:placeholder="Font Size" />
        </div>
    )
}

type LineHeightInputProps = {
    value: {
        value: Atom<[number, UnitType] | null> 
        variable: Atom<string | undefined>
    }
}


// Line height input component
function LineHeightInput({value}: LineHeightInputProps, {createElement}: RenderContext) {
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
            <div>LH</div>
            <SizeInput value={value.value} $main:placeholder="Line Height" />
        </div>
    )
}

type LetterSpacingInputProps = {
    value: {
        value: Atom<[number, UnitType] | null> 
        variable: Atom<string | undefined>
    }
}


// Letter spacing input component
function LetterSpacingInput({value}: LetterSpacingInputProps, {createElement}: RenderContext) {
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
            <div>LS</div>
            <SizeInput value={value.value} $main:placeholder="Letter Spacing" />
        </div>
    )
}

type WordSpacingInputProps = {
    value: {
        value: Atom<[number, UnitType] | null> 
        variable: Atom<string | undefined>
    }
}

// Word spacing input component
function WordSpacingInput({value}: WordSpacingInputProps, {createElement}: RenderContext) {
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
            <div>WS</div>
            <SizeInput value={value.value} $main:placeholder="Word Spacing" />
        </div>
    )
}

type FontFamilyInputProps = {
    value: {
        value: Atom<string | null>  
        variable: Atom<string | undefined>
    }
}

// Font family selector component
function FontFamilySelector({value}: FontFamilyInputProps, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: string}>([
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Helvetica', value: 'Helvetica, sans-serif' },
        { label: 'Times New Roman', value: 'Times New Roman, serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Courier New', value: 'Courier New, monospace' },
        { label: 'Verdana', value: 'Verdana, sans-serif' },
        { label: 'Tahoma', value: 'Tahoma, sans-serif' },
        { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' }
    ]);

    const selectedFont = options.find(option => option.value === value.value());


    function Option({value: optionValue, selected}: {value: {label: string, value: string}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({fontFamily: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedFont} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

    
// Font weight selector component
function FontWeightSelector({value}: {value: {
    value: Atom<number | null>
    variable: Atom<string | undefined>
}}, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: number}>([
        { label: 'Thin (100)', value: 100 },
        { label: 'Extra-Light (200)', value: 200 },
        { label: 'Light (300)', value: 300 },
        { label: 'Normal (400)', value: 400 },
        { label: 'Medium (500)', value: 500 },
        { label: 'Semi-Bold (600)', value: 600 },
        { label: 'Bold (700)', value: 700 },
        { label: 'Extra-Bold (800)', value: 800 },
        { label: 'Black (900)', value: 900 },
    ]);

    const selectedWeight = options.find(option => option.value === value.value());
    function Option({value: optionValue, selected}: {value: {label: string, value: number}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({fontWeight: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedWeight} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Font style selector component
function FontStyleSelector({value}: {value: {
    value: Atom<'normal' | 'italic' | null>
    variable: Atom<string | undefined>
}}, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'normal' | 'italic'}>([
        { label: 'Normal', value: 'normal' },
        { label: 'Italic', value: 'italic' }
    ]);

    const selectedStyle = options.find(option => option.value === value.value());
    function Option({value: optionValue, selected}: {value: {label: string, value: 'normal' | 'italic'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({fontStyle: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }
    return <Select options={options} value={selectedStyle} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Text decoration selector component
function TextDecorationSelector({value}: {value: {
    value: Atom<'none' | 'underline' | 'line-through' | null>
    variable: Atom<string | undefined>
}}, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'none' | 'underline' | 'line-through'}>([
        { label: 'None', value: 'none' },
        { label: 'Underline', value: 'underline' },
        { label: 'Line Through', value: 'line-through' }
    ]);

    const selectedDecoration = options.find(option => option.value === value.value());
    function Option({value: optionValue, selected}: {value: {label: string, value: 'none' | 'underline' | 'line-through'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({textDecoration: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }

    return <Select options={options} value={selectedDecoration} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Text align selector component
function TextAlignSelector({value}: {value: {
    value: Atom<'left' | 'center' | 'right' | 'justify' | null>
    variable: Atom<string | undefined>
}}, {createElement}: RenderContext) {
    const alignTypes = new RxList<{type: 'left' | 'center' | 'right' | 'justify', icon: any}>([
        { type: 'left', icon: AlignLeft },
        { type: 'center', icon: AlignCenter },
        { type: 'right', icon: AlignRight },
        { type: 'justify', icon: AlignJustify }
    ]);

    const selectedAlign = alignTypes.find(align => align.type === value.value());

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'stretch',
        backgroundColor: 'rgb(56,56,56)',
        borderRadius: 4,
        '&>div': {
            flexGrow: 1,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '1px solid rgb(76,76,76)',
            '&:first-child': {
                borderLeftWidth: 0,
            }
        }
    }

    return <div style={containerStyle}>
        {alignTypes.createSelection(selectedAlign).map(([align, selected]) => (
            <div onClick={() => value.value(align.type)} >
                {() => icon(align.icon, {stroke: selected() ? 'white' : 'gray', width:12, height:12})}
            </div>
        ))}
    </div>
}

// Text transform selector component
function TextTransformSelector({value}: {value: {
    value: Atom<'none' | 'capitalize' | 'uppercase' | 'lowercase' | null>
    variable: Atom<string | undefined>
}}, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'none' | 'capitalize' | 'uppercase' | 'lowercase'}>([
        { label: 'None', value: 'none' },
        { label: 'Capitalize', value: 'capitalize' },
        { label: 'Uppercase', value: 'uppercase' },
        { label: 'Lowercase', value: 'lowercase' }
    ]);

    const selectedTransform = options.find(option => option.value === value.value());
    function Option({value: optionValue, selected}: {value: {label: string, value: 'none' | 'capitalize' | 'uppercase' | 'lowercase'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({textTransform: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }
    return <Select options={options} value={selectedTransform} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Font variant selector component
function FontVariantSelector({value}: {value: {
    value: Atom<'normal' | 'small-caps' | null>
    variable: Atom<string | undefined>
}}, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'normal' | 'small-caps'}>([
        { label: 'Normal', value: 'normal' },
        { label: 'Small Caps', value: 'small-caps' }
    ]);

    const selectedVariant = options.find(option => option.value === value.value());
    function Option({value: optionValue, selected}: {value: {label: string, value: 'normal' | 'small-caps'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({FontVariantSelector: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }
    return <Select options={options} value={selectedVariant} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Font stretch selector component
function FontStretchSelector({value}: {value: {
    value: Atom<'normal' | 'condensed' | 'expanded' | null>
    variable: Atom<string | undefined>
}}, {createElement}: RenderContext) {
    const options = new RxList<{label: string, value: 'normal' | 'condensed' | 'expanded'}>([
        { label: 'Normal', value: 'normal' },
        { label: 'Condensed', value: 'condensed' },
        { label: 'Expanded', value: 'expanded' }
    ]);

    const selectedStretch = options.find(option => option.value === value.value());
    function Option({value: optionValue, selected}: {value: {label: string, value: 'normal' | 'condensed' | 'expanded'}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={[commonOptionStyle(selected), () => ({FontStretchSelector: optionValue.value})]} onClick={() => value.value(optionValue.value)}>
            {optionValue.label}
        </div>
    }
    return <Select options={options} value={selectedStretch} $option:_use={Option} $displayValue:_use={DisplayValue} />;
}

// Main FontInfoEditor component
export function FontInfoEditor({node}: {node: RxTextNode}, {createElement}: RenderContext) {
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
            <div as='name'>Font</div>
            <div style={valuesContainerStyle}>
                <div>
                    <FontSizeInput value={node.font.fontSize} />
                    <LineHeightInput value={node.font.lineHeight} />
                </div>
                <div>
                    <FontFamilySelector value={node.font.fontFamily} />
                </div>
                <div>
                    <FontWeightSelector value={node.font.fontWeight} />
                    <FontStyleSelector value={node.font.fontStyle} />
                </div>
                <div>
                    <TextAlignSelector value={node.font.textAlign} />
                </div>
                <div>
                    <TextDecorationSelector value={node.font.textDecoration} />
                </div>
                <div>
                    <LetterSpacingInput value={node.font.letterSpacing} />
                    <WordSpacingInput value={node.font.wordSpacing} />
                </div>
                <div>
                    <TextTransformSelector value={node.font.textTransform} />
                </div>
                <div>
                    <FontVariantSelector value={node.font.fontVariant} />
                    <FontStretchSelector value={node.font.fontStretch} />
                </div>
            </div>
        </div>
    )
} 