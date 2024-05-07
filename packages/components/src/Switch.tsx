import {atom, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";

const SwitchPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
}

export function Switch(props: FixedCompatiblePropsType<typeof SwitchPropTypes> , {createElement}: RenderContext) {
    const { value } = props as PropsType<typeof SwitchPropTypes>

    const containerStyleBase = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    }


    return <div as='root' style={[containerStyleBase]} onClick={() => value(!value())}>
        <div as='main' ></div>
    </div>
}

Switch.propTypes = SwitchPropTypes

