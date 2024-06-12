import {atom, Atom, Component, PropTypes, RenderContext} from "axii";

type TextareaProps = {
    value: Atom<string>
    placeholder?: Atom<string>
}

export const Textarea: Component = function Textarea({value, placeholder}: TextareaProps, {createElement}: RenderContext ) {

    const onInput = (e: Event) => {
        const target = e.target as HTMLTextAreaElement
        if (target.clientHeight < target.scrollHeight) {
            target.style.height = target.scrollHeight + 'px'
        }
        value(target.value)
    }

    return <div as="root">
        <div as="header"></div>
        <textarea as="main" value={value} onInput={[onInput]} placeholder={placeholder}/>
        <div as="footer"></div>
    </div>
}

Textarea.propTypes = {
    value: PropTypes.atom<string>().default(() => atom('')),
    placeholder: PropTypes.atom<string>().default(() => atom('')),
}
