import {Component, RenderContext} from "axii";

type ButtonProps = {
    children?: any,
}

export const Button: Component = function({children}: ButtonProps, {createElement}: RenderContext) {
    return <button as='root'>{children}</button>
}
