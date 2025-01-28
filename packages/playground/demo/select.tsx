import {Atom, atom, N_ATTR, RenderContext, RxList} from "axii";
import {Select} from "axii-ui";
type SelectItemProps = {
    value: any,
    onSelect: (value: any) => void,
    selected: Atom<boolean>
    children?: any,
    [N_ATTR]: any
}

function DisplayOption(props: SelectItemProps, {createElement}: RenderContext) {
    const {value, selected} = props
    const nativeAttrs = props[N_ATTR]
    console.log(value.raw, selected.raw)
    return <div {...nativeAttrs}>
        <span style={{marginRight:10}}>{() => selected() ? '√' : '*'}</span>
        {value.label}
    </div>
}

type DisplayValueProps = {
    value: () => Atom<any>,
    optionVisible: Atom<boolean>
    placeholder: () => string
}

function DisplayValue({value, optionVisible}: DisplayValueProps, {createElement}: RenderContext) {
    return <div onClick={() => optionVisible(true)}>{() => value()?.label ?? 'click to show options'}</div>
}

export function Demo({}, {createElement}: RenderContext) {
    const options = new RxList([{label: 'a11', value: 'a'}, {label: 'b', value: 'b'}])
    const value = atom(options.raw[0])

    return (
        <div>
            <div>
                <div>primitive value options</div>
                <Select options={[1,2,3]} value={atom(1)} />
            </div>
            <div>
                <div>object options</div>
                <Select
                    options={options}
                    value={value}
                    $displayOption:_use={DisplayOption}
                    $displayValue:_use={DisplayValue}
                />
            </div>
        </div>

    )
}