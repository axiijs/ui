import {Atom, RenderContext, PropTypes, atom, reactiveFocused} from "axii";
import {colors} from "./style.js";

type InputProps = {
    value: Atom<string>
    placeholder?: string
}

export function Input({ value, placeholder}: InputProps, {createElement, createStateFromRef}: RenderContext) {
    const focused = createStateFromRef(reactiveFocused)

    const containerStyle = () => ({
        borderRadius:8,
        display: 'flex',
        color: '#fff',
        background: colors.inputBg,
        padding: '10px 16px',
        outline: focused() ? `1px solid ${colors.primaryBlue}` : 'none',
    })

    const inputStyle= {
        placeholderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 0,
        outline: 'none',
        color: '#fff',
        background: 'transparent',
        flexGrow:1
    }


    // TODO 改成 createStateFromRef 的设计？？
    const onInput = (e:InputEvent) => {
        value((e.target as HTMLInputElement).value)
    }


    return <div style={containerStyle}>
        <div as="before"></div>
        <input as="main" value={value} placeholder={placeholder} onInput={onInput} style={inputStyle} ref={focused.ref} spellcheck={false}/>
        <div as="after"></div>
    </div>
}

Input.propTypes = {
    value: PropTypes.string.default(() => atom('')),
    placeholder: PropTypes.string.default(() => atom('')),
}
