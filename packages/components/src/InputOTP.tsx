import {atom, PropTypes, RenderContext, FixedCompatiblePropsType, PropsType} from "axii";

const CheckboxPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
}

export function InputOTP(props: FixedCompatiblePropsType<typeof CheckboxPropTypes> , {createElement}: RenderContext) {
    const { value } = props as PropsType<typeof CheckboxPropTypes>

    const containerStyle = () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        width: 22,
        height: 22,
        borderRadius: '50%',
        outline: value() ? 'none' : '1px solid #DCDCDC',
        background: value() ? '#253FFD' : 'rgba(42,44,51,.7)',
    })

    const dotStyle = () => ({
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: value() ? '#fff' : 'transparent',
    })

    return <div as='root' style={containerStyle} onClick={() => value(!value())}>
        <div as='main' style={dotStyle}></div>
    </div>
}

InputOTP.propTypes = CheckboxPropTypes

