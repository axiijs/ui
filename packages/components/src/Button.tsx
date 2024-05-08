import { RenderContext} from "axii";

type ButtonProps = {
    children?: any,
    primary?: boolean,
}

export function Button({children, primary}: ButtonProps, {createElement}: RenderContext) {
    const style = {
        outline:'none',
        color: 'white',
        border: primary? 'none' : '1px solid #545863',
        borderRadius: 4,
        fontSize: 14,
        cursor: 'pointer',
        userSelect: 'none',
    }

    return <button as='main' style={style}>{children}</button>
}
