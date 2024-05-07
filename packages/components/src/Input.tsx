import {Atom, atom, PropTypes, RenderContext} from "axii";

type InputProps = {
    value: Atom<string>
    placeholder?: string,
    prefix?: Atom<any>
    affix?: Atom<any>
}

export function Input({ value, placeholder, prefix, affix}: InputProps, {createElement}: RenderContext) {
    const containerStyle = () => ({
        display: 'flex',
    })

    const inputStyle= {
        flexGrow:1,
    }

    const onInput = (e:InputEvent) => {
        value((e.target as HTMLInputElement).value)
    }

    return <div as="root" style={containerStyle}>
        {() => prefix() && <div as="prefix">{prefix}</div>}
        <input as="main" value={value} placeholder={placeholder} onInput={onInput} style={inputStyle} spellcheck={false}/>
        {() => affix() && <div as="affix">{affix}</div>}
    </div>
}

Input.propTypes = {
    value: PropTypes.atom<string>().default(() => atom('')),
    placeholder: PropTypes.atom<string>().default(() => atom('')),
    prefix: PropTypes.atom<string>().default(() => atom(null)),
    affix: PropTypes.atom<string>().default(() => atom(null)),
}
