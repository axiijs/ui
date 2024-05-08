import {atom, PropTypes, RenderContext, FixedCompatiblePropsType, PropsType, Component} from "axii";

const CheckboxPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
}

export const Checkbox: Component = function(props: FixedCompatiblePropsType<typeof CheckboxPropTypes> , {createElement}: RenderContext) {
    const { value } = props as PropsType<typeof CheckboxPropTypes>

    const containerStyle = () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    })


    return <div as='root' style={containerStyle} onClick={() => value(!value())}>
        <div as='main'></div>
    </div>
}

Checkbox.propTypes = CheckboxPropTypes

