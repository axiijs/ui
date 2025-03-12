import {atom, PropTypes, RenderContext, FixedCompatiblePropsType, Component, PropsType} from "axii";

const CheckboxPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
    disabled: PropTypes.atom<boolean>().default(() => atom(false)),
}

export const Checkbox: Component = function(props: FixedCompatiblePropsType<typeof CheckboxPropTypes> , {createElement}: RenderContext) {
    const { value, disabled } = props as PropsType<typeof CheckboxPropTypes>

    const containerStyle = () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled() ? 'not-allowed' : 'pointer',
        userSelect: 'none',
    })

    const handleClick = () => {
        if (!disabled()) {
            value(!value());
        }
    }

    return <div as='root' style={containerStyle} onClick={handleClick} data-disabled={disabled}>
        <div as='main'></div>
    </div>
}

Checkbox.propTypes = CheckboxPropTypes

