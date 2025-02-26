import {RenderContext} from "axii";

export type ShadowRootProps = {
    mode?: ShadowRootMode;
    children:any
}
export function ShadowRoot({ mode, children}: ShadowRootProps, { createElement}: RenderContext) {
    const container = <div style={{display: 'none'}}></div> as HTMLElement
    const shadowRoot = container.attachShadow({mode: mode || 'open'})
    shadowRoot.appendChild(children)
    return container
}
