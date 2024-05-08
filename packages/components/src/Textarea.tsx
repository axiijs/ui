import {atom, Atom, PropTypes, reactiveFocused, RenderContext} from "axii";

type TextareaProps = {
    value: Atom<string>
    placeholder?: Atom<string>
}

export function Textarea({value, placeholder}: TextareaProps, {createElement, createStateFromRef}: RenderContext ) {

    const focused = createStateFromRef(reactiveFocused)

    const containerStyle = () => ({
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
    })

    const inputStyle = {
        border:0,
        outline:0,
        background: 'transparent',
        display: 'block',
        grow:1,
        color: '#fff',

    }

    return <div as="root" style={containerStyle}>
        <div as="header"></div>
        <textarea as="input" value={value} onInput={(e:any) => value(e.target.value)} style={inputStyle} ref={[focused.ref]} placeholder={placeholder} spellcheck={false}/>
        <div as="footer"></div>
    </div>
}

Textarea.propTypes = {
    value: PropTypes.string.default(() => atom('')),
    placeholder: PropTypes.string.default(() => atom('')),
}
