import {
    atom,
    bindProps,
    N_ATTR, RenderContext
} from "axii";
import {colors} from "./style.js";

import { Select as ISelect } from '@primitive'


export function SelectOption(props: any, {createElement}: RenderContext) {
    const {value} = props
    const focused = atom(false)
    const hovered = atom(false)

    const optionStyle = () => ({
        background: hovered() ? colors.primaryBlue : 'transparent',
    })

    return (
        <div
            {...props[N_ATTR]}
            as={'main'}
            $self:style = {optionStyle}
            $self:onMouseEnter={() => hovered(true)}
            $self:onMouseLeave={() => hovered(false)}
            $self:onFocusIn={() => focused(false)}
            $self:onFocusOut={() => focused(false)}
        >
            <div as="displayOption" prop:value={value}>
                {value}
            </div>
        </div>
    )
}

export const selectOptionsStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid #ccc',
}

export const selectOptionProps = {
    '$option:_use': SelectOption,
}

export const Select = bindProps(ISelect, selectOptionProps)
