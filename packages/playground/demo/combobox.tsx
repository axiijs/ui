import {Atom, atom, createElement, N_ATTR, RenderContext, RxList} from "axii";
import {Combobox} from "axii-ui";


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

function DisplayValue({value, optionVisible}: DisplayValueProps) {
    return <div onClick={() => optionVisible(true)}>{() => value()?.label ?? 'Choose'}</div>
}

const comboboxOptionsData = Array(100).fill(0).map((_, i) => ({label: `option ${i}`, value: i}))
const searchComboboxData = (search: string): Promise<any[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(comboboxOptionsData.filter(option => option.label.includes(search)))
        }, 1000)
    })
}
const comboboxSearch = atom('')
const comboboxOptions = new RxList(function* (): Generator<Promise<any[]>, any[], any> {
    const data = yield searchComboboxData(comboboxSearch())
    return data
})

export function Demo({}, {createElement}: RenderContext) {
    return <Combobox
        options={comboboxOptions}
        search={comboboxSearch}
        $option:_use={DisplayOption}
        $displayValue:_use={DisplayValue}
    />
}