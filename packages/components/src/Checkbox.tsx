import {atom, PropTypes, RenderContext, FixedCompatiblePropsType, Component} from "axii";

const CheckboxPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
}

export const Checkbox: Component = function(props: FixedCompatiblePropsType<typeof CheckboxPropTypes> , {createElement}: RenderContext) {

    const containerStyle = () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
    })

    return <div as='root' style={containerStyle}>
        <div as='main'></div>
    </div>
}

Checkbox.propTypes = CheckboxPropTypes

