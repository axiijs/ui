import { RenderContext} from "axii";
import {gaps, styles} from "./style.js";

type ButtonProps = {
    children?: any,
    primary?: boolean,
}

export function Button({children, primary}: ButtonProps, {createElement}: RenderContext) {
    const style = {
        background: primary ? styles.gradientBg.background : '#2A2C33',
        outline:'none',
        color: 'white',
        border: primary? 'none' : '1px solid #545863',
        borderRadius: 4,
        padding: `${gaps.small}px ${gaps.extra}px`,
        fontSize: 14,
        cursor: 'pointer',
        userSelect: 'none',
    }

    return <button as='main' style={style}>{children}</button>
}
