import {Atom, atom, N_ATTR, RenderContext, RxList} from "axii";
import {Select} from "axii-ui";
const value = atom(null)
const options = new RxList([{label: 'a11', value: 'a'}, {label: 'b', value: 'b'}])
type SelectItemProps = {
    value: any,
    onSelect: (value: any) => void,
    selected: Atom<boolean>
    children?: any,
    [N_ATTR]: any
}

function DisplayOption(props: SelectItemProps, {createElement}: RenderContext) {
    const {value} = props
    const nativeAttrs = props[N_ATTR]
    return <div {...nativeAttrs}>
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
                    $option={{
                        '$displayOption:_use': DisplayOption,
                    }}
                    $displayValue:_use={DisplayValue}
                />
            </div>
        </div>

    )
}