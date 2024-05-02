import {atom, PropTypes, RenderContext, FixedCompatiblePropsType, PropsType} from "axii";
import {pattern, scen} from "@theme";

const SwitchPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
}

export function Switch(props: FixedCompatiblePropsType<typeof SwitchPropTypes> , {createElement}: RenderContext) {
    const { value } = props as PropsType<typeof SwitchPropTypes>

    const containerStyleBase = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        width: scen.size.thing.box().mul(2),
        height: scen.size.thing.box(),
        borderRadius: scen.size.thing.box().div(2),
        transition: 'all 0.3s',
    }


    const containerStyle = () => {
        return ({
            background: value() ? pattern().inverted().active().bgColor() : pattern().inverted().inactive().bgColor(),
        })
    }

    const gap = scen.size.thing.box().sub(scen.size.thing.inner())

    const dotStyle = () => ({
        width: scen.size.thing.inner(),
        height: scen.size.thing.inner(),
        marginLeft: value() ?
            containerStyleBase.width.clone().sub(scen.size.thing.inner()).sub(gap):
            gap
        ,
        transition: 'all 0.3s',
        borderRadius: '50%',
        background: pattern().inverted().active().interactable().color(),
        shadow: pattern().shadow(6)
    })

    return <div as='root' style={[containerStyleBase, containerStyle]} onClick={() => value(!value())}>
        <div as='main' style={dotStyle}></div>
    </div>
}

Switch.propTypes = SwitchPropTypes

