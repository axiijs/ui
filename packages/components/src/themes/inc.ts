import {Input} from "../Input.js";
import {Select} from "../Select.js";
import {Component, reactiveFocused, RenderContext, atomComputed, mergeProp} from "axii";
import {
    colors,
    enclosedContainer,
    interactableTextField,
    modalContainer,
    paddingContainer, percent,
    raisedContainer,
    sizes,
    supportiveTextField
} from "./common.js";
import {Checkbox} from "../Checkbox.js";
import {BlockOption, RadioOption} from "../RadioGroup.js";
import {gaps} from "../style.js";
import {Switch} from "../Switch.js";
import {Tabs} from "../Tabs.js";


(Input as Component).boundProps = [function({}, {createStateFromRef}: RenderContext) {
    const focused = createStateFromRef(reactiveFocused)
    // TODO 继承 form status? 还是放在 createForm 里面？
    return {
        '$root:style': () => {
            const base = enclosedContainer
            return {
                ...base,
                borderRadius:8,
                overflow: 'hidden',
                border: focused() ? `1px solid ${colors.line.border.focused()}`: base.border
            }
        },
        '$main:style': {
            borderWidth: 0,
            outline: 'none',
            ...paddingContainer,
            placeholderColor: colors.text.normal(false, 'auxiliary'),
            color: colors.text.normal(),
        },
        '$prefix:style': {
            ...paddingContainer,
            ...supportiveTextField,
            borderRight: enclosedContainer.border
        },
        '$affix:style': {
            ...paddingContainer,
            ...supportiveTextField,
            borderLeft: enclosedContainer.border
        },
        '$main:ref': focused.ref
    }
}];

(Select as Component).boundProps = [...(Select as Component).boundProps!, function({}, {createElement}: RenderContext) {
    return {
        '$root:style': {
            ...enclosedContainer,
            ...paddingContainer,
            cursor: 'pointer',
            borderRadius: 8,
        },
        '$displayValue:style': {
            display: 'flex',
            alignItems: 'center',
            fontSize: sizes.font.text(),
            justifyContent: 'space-between',
        },
        '$options:style': {
            ...modalContainer,
            color: colors.text.normal(),
            fontSize: sizes.font.text(),
            lineHeight: '20px',
        },
        '$option': {
            '$displayOption:style': {
                ...paddingContainer,
                ...interactableTextField,
            }
        }
    }
}];

(Checkbox as Component).boundProps = [...((Checkbox as Component).boundProps||[]), function({ value }, {createElement}: RenderContext) {
    return {
        '$root:style': () => ({
            cursor: 'pointer',
            width: sizes.thing.box(),
            height: sizes.thing.box(),
            borderRadius: '50%',
            outline: value() ? `1px solid ${colors.line.border.focused()}` :`1px solid ${colors.line.border.normal()}` ,
        }),
        '$main:style': () => ({
            width: sizes.thing.box().div(2),
            height: sizes.thing.box().div(2),
            borderRadius: '50%',
            background: value() ? colors.background.item.active() : 'transparent',
        }),
    }
}];

(RadioOption as Component).boundProps = [...((RadioOption as Component).boundProps||[]), function({ selected }, {createElement}: RenderContext) {
    return {
        '$dotContainer:style': () => ({
            width: sizes.thing.box(),
            height: sizes.thing.box(),
            borderRadius: '50%',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: `1px solid ${selected() ? colors.line.border.focused() : colors.line.border.normal() }`,
        }),
        '$dot:style': () => ({
            width: selected() ? sizes.thing.box().div(2) : 0,
            height: selected() ? sizes.thing.box().div(2) : 0,
            borderRadius: '50%',
            background: colors.background.item.active(),
            transition: 'all 1s',
        })

    }
}];

(BlockOption as Component).boundProps = [...((BlockOption as Component).boundProps||[]), function({ selected }, {createElement}: RenderContext) {
    return {
        '$root:style': () => ({
            color: '#fff',
            borderRadius: 4,
            padding: `${gaps.small}px ${gaps.large}px`,
            cursor: 'pointer',
            background: selected() ? colors.background.item.active() : 'transparent',
            '&:hover': {
                background: colors.background.item.normal()
            }
        }),
    }
}];

(Switch as Component).boundProps = [...((Switch as Component).boundProps||[]), function({ value }, {createElement}: RenderContext) {
    const gap = sizes.thing.box().sub(sizes.thing.inner())

    return {
        '$root:style': () => ({
            width: sizes.thing.box().mul(2),
            height: sizes.thing.box(),
            borderRadius: sizes.thing.box().div(2),
            transition: 'all 0.3s',
            background: value() ? colors.background.item.active() : colors.background.item.normal(),
        }),
        '$main:style': () => ({
            ...(value() ? {} : raisedContainer),
            boxSizing: 'border-box',
            width: sizes.thing.inner(),
            height: sizes.thing.inner(),
            marginLeft: value() ?
                sizes.thing.box().mul(2).sub(sizes.thing.inner()).sub(gap):
                gap
            ,
            transition: 'all 0.3s',
            background: '#fff',
            borderRadius: '50%',
        })
    }
}];


(Tabs as Component).boundProps = [...((Tabs as Component).boundProps||[]), function({ current, options }, {createElement, createRxRef, createRef}: RenderContext) {

    const optionsToPosRef = options.map((option:any) => {
        // CAUTION 一定要用 createRxRef，否则用 createRxRef 的时候，ref 第一次 attach 不会触发 style 计算。
        const ref = createRxRef()
        return {option, ref}
    }).indexBy('option')

    const rootRef = createRef()
    const currentRect = atomComputed(() => {
        const rect =  optionsToPosRef.get(current())?.ref.current.getBoundingClientRect()
        console.log(rect)
        return rect
    })

    return {
        '$root:ref': rootRef,
        '$root:style': {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'inline-flex',
            alignItems: 'stretch',
            borderRadius: sizes.thing.box().div(2),
            background: colors.background.item.normal(),
        },
        '$tabs:style': {
            display: 'flex',
        },
        '$head:style': () => {
            const rect = currentRect()
            const rootRect = rootRef.current?.getBoundingClientRect()!
            console.log((rect&&rootRect) ? (rect.left - rootRect.left):0, rect, rootRef.current)
            return ({
                ...raisedContainer,
                position: 'absolute',
                top: 0,
                bottom: 0,
                margin: 'auto 0',
                left: (rect&&rootRect) ? (rect.left - rootRect.left):0,
                opacity: current() ? 1 : 0,
                boxSizing: 'border-box',
                height: percent(100).sub(sizes.space.inner().mul(5)),
                width: rect?.width||0,
                borderRadius: sizes.thing.box().div(2),
                transition: 'all 0.3s',
            })
        },
        '$tab:ref_':(_:any, { tab }: any) => {
            return mergeProp('ref', _, optionsToPosRef.get(tab)!.ref!)
        },
        '$tab:style_': () => {
            return {
                cursor: 'pointer',
                padding: sizes.space.padding(),
                borderRadius: sizes.thing.box().div(2),
                zIndex:2,
                '&:hover': {
                    // background: colors.background.item.normal()
                }
            }
        },
    }
}];