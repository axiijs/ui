import {atom, Component, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";

const SwitchPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
    disabled: PropTypes.atom<boolean>().default(() => atom(false)),
}

export const Switch:Component = function(props: FixedCompatiblePropsType<typeof SwitchPropTypes> , {createElement}: RenderContext) {
    const { value, disabled } = props as PropsType<typeof SwitchPropTypes>

    const containerStyleBase = {
        display: 'flex',
        alignItems: 'center',
        cursor: disabled() ? 'not-allowed' : 'pointer',
    }

    const handleClick = () => {
        if (!disabled()) {
            value(!value());
        }
    }

    return <div as='root' style={[containerStyleBase]} onClick={handleClick} data-disabled={disabled} >
        <div as='main' ></div>
    </div>
}

Switch.propTypes = SwitchPropTypes

