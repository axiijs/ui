import {bindProps, N_ATTR, RenderContext} from "axii";

import {Select as ISelect} from '@primitive'


export function SelectOption(props: Parameters<typeof ISelect>[0], {createElement}: RenderContext) {
    const {value} = props

    return (
        <div
            {...props[N_ATTR]}
            as={'main'}
        >
            <div as="displayOption" prop:value={value}>
                {value}
            </div>
        </div>
    )
}

export const selectOptionProps = {
    '$option:_use': SelectOption,
}

export const Select = bindProps(ISelect, selectOptionProps)
