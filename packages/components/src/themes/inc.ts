import { Input } from "../Input.js";
import {Component, reactiveFocused, RenderContext} from "axii";
import { scen } from "@theme";


(Input as Component).boundProps = [function({}, {createStateFromRef}: RenderContext) {
    const focused = createStateFromRef(reactiveFocused)

    return {
        '$root:style': () => ({
            borderRadius:8,
            background: scen.color.background.box.normal(),
            padding: '10px 16px',
            border: `1px solid ${focused() ? scen.color.line.border.focused(): scen.color.line.border.normal()}`
        }),
        '$main:style': {
            borderWidth: 0,
            outline: 'none',
            placeholderColor: scen.color.text.normal(false, 'auxiliary'),
            color: scen.color.text.normal(),
        },
        '$main:ref': focused.ref
    }
}]