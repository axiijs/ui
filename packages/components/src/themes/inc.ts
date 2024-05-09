import {Input} from "../Input.js";
import {Select} from "../Select.js";
import {atomComputed, mergeProp, reactiveFocused, RenderContext, StyleSize} from "axii";
import {createCommon, percent, ThemeColors,} from "./common.js";
import {Checkbox} from "../Checkbox.js";
import {BlockOption, RadioGroup, RadioOption} from "../RadioGroup.js";
import {Switch} from "../Switch.js";
import {Tabs} from "../Tabs.js";
import {Calendar} from "../Calendar.js";
import {genColors} from './util/color.macro.js' with {type: 'macro'}
import {Button} from "../Button.js";
import {AccordionItem} from "../Accordion.js";

const zincThemeColors = genColors('#333333')
const themeColors = new ThemeColors(zincThemeColors)
themeColors.injectVars()

const {
    colors,
    layout,
    enclosedContainer,
    interactableTextField,
    modalContainer,
    paddingContainer,
    raisedContainer,
    sizes,
    transitions,
    supportiveTextField,
    textBox
} = createCommon(themeColors.inputColorVars)

Input.boundProps = [function ({}, {createStateFromRef}: RenderContext) {
    const focused = createStateFromRef(reactiveFocused)
    // TODO 继承 form status? 还是放在 createForm 里面？
    return {
        '$root:style': () => {
            const base = enclosedContainer
            return {
                ...base,
                borderRadius: sizes.radius.item(),
                overflow: 'hidden',
                border: focused() ? `1px solid ${colors.line.border.focused()}` : base.border
            }
        },
        '$main:style': {
            borderWidth: 0,
            outline: 'none',
            padding: [0, sizes.space.padding()],
            placeholderColor: colors.text.normal(false, 'auxiliary'),
            color: colors.text.normal(),
        },
        '$prefix:style': {
            ...textBox,
            ...supportiveTextField,
            borderRight: enclosedContainer.border
        },
        '$affix:style': {
            ...textBox,
            ...supportiveTextField,
            borderLeft: enclosedContainer.border
        },
        '$main:ref': focused.ref
    }
}];

Select.boundProps = [...Select.boundProps!, function ({}, {createElement}: RenderContext) {
    return {
        '$root:style': {
            ...enclosedContainer,
            ...textBox,
            cursor: 'pointer',
            borderRadius: sizes.radius.item(),
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
                ...interactableTextField,
                ...textBox,
            }
        }
    }
}];

Checkbox.boundProps = [...(Checkbox.boundProps || []), function ({value}, {createElement}: RenderContext) {
    return {
        '$root:style': () => ({
            cursor: 'pointer',
            width: sizes.thing.item(),
            height: sizes.thing.item(),
            borderRadius: '50%',
            outline: value() ? `1px solid ${colors.line.border.focused()}` : `1px solid ${colors.line.border.normal()}`,
        }),
        '$main:style': () => [{
            width: 0,
            height: 0,
            borderRadius: '50%',
            transition: 'height 0.3s, width 0.3s',
            background: value() ? colors.background.item.active() : 'transparent',
        }, {
            width: value() ? sizes.thing.item().div(2) : 0,
            height: value() ? sizes.thing.item().div(2) : 0,
        }],
    }
}];

RadioGroup.boundProps = [...(RadioGroup.boundProps || []), function ({}, {createElement}: RenderContext) {
    return {
        '$root:style': () => ({
            gap: sizes.space.gap(),
        }),
    }
}]

RadioOption.boundProps = [...(RadioOption.boundProps || []), function ({selected}, {createElement}: RenderContext) {
    return {
        '$root:style': () => ({
            gap: sizes.space.inner(),
        }),
        '$dotContainer:style': () => ({
            width: sizes.thing.item(),
            height: sizes.thing.item(),
            gap: sizes.space.inner(),
            borderRadius: '50%',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: `1px solid ${selected() ? colors.line.border.focused() : colors.line.border.normal()}`,
        }),
        '$dot:style': () => {
            return [{
                width: 0,
                height: 0,
                borderRadius: '50%',
                background: selected() ? colors.background.item.active() : 'transparent',
                transition: 'height 0.3s, width 0.3s',
            }, {
                width: selected() ? sizes.thing.item().div(2) : 0,
                height: selected() ? sizes.thing.item().div(2) : 0,
            }]
        }

    }
}];

BlockOption.boundProps = [...(BlockOption.boundProps || []), function ({selected}, {createElement}: RenderContext) {
    return {
        '$root:style': () => ({
            color: '#fff',
            borderRadius: sizes.radius.item(),
            padding: `${sizes.thing.text()}px ${sizes.thing.text().mul(2)}px`,
            cursor: 'pointer',
            background: selected() ? colors.background.item.active() : 'transparent',
            '&:hover': {
                background: colors.background.item.normal()
            }
        }),
    }
}];

Switch.boundProps = [...(Switch.boundProps || []), function ({value}, {createElement}: RenderContext) {
    const gap = sizes.thing.item().sub(sizes.thing.inner())

    return {
        '$root:style': () => ({
            width: sizes.thing.item().mul(2),
            height: sizes.thing.item(),
            borderRadius: sizes.thing.item().div(2),
            transition: 'margin-left 0.3s, background 0.3s',
            background: value() ? colors.background.item.active() : colors.background.item.normal(),
        }),
        '$main:style': () => ({
            ...(value() ? {} : raisedContainer),
            boxSizing: 'border-box',
            width: sizes.thing.inner(),
            height: sizes.thing.inner(),
            marginLeft: value() ?
                sizes.thing.item().mul(2).sub(sizes.thing.inner()).sub(sizes.space.inner()) :
                gap
            ,
            transition: 'all 0.3s',
            background: '#fff',
            borderRadius: '50%',
        })
    }
}];


Tabs.boundProps = [...(Tabs.boundProps || []), function ({current, options}, {
    createElement,
    createRxRef,
    createRef
}: RenderContext) {

    const optionsToPosRef = options.map((option: any) => {
        // CAUTION 一定要用 createRxRef，否则用 createRxRef 的时候，ref 第一次 attach 不会触发 style 计算。
        const ref = createRxRef()
        return {option, ref}
    }).indexBy('option')

    const rootRef = createRef()
    const currentRect = atomComputed(() => {
        const rect = optionsToPosRef.get(current())?.ref.current.getBoundingClientRect()
        return rect
    })

    return {
        '$root:ref': rootRef,
        '$root:style': {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'inline-flex',
            alignItems: 'stretch',
            borderRadius: sizes.radius.box(),
            background: colors.background.item.normal(),
        },
        '$tabs:style': {
            display: 'flex',
        },
        '$head:style': () => {
            const rect = currentRect()
            const rootRect = rootRef.current?.getBoundingClientRect()!
            return ({
                ...raisedContainer,
                position: 'absolute',
                top: 0,
                bottom: 0,
                margin: 'auto 0',
                left: (rect && rootRect) ? sizes.space.inner().add(rect.left - rootRect.left, 'px') : 0,
                opacity: current() ? 1 : 0,
                boxSizing: 'border-box',
                height: percent(100).sub(sizes.space.inner().mul(2)),
                width: rect ? (new StyleSize(rect.width!, 'px').sub(sizes.space.inner().mul(2))) : 0,
                borderRadius: sizes.radius.item(),
                transition: 'all 0.3s',
            })
        },
        '$tab:ref_': (_: any, {tab}: any) => {
            return mergeProp('ref', _, optionsToPosRef.get(tab)!.ref!)
        },
        '$tab:style_': () => {
            return {
                cursor: 'pointer',
                padding: sizes.space.padding(),
                borderRadius: sizes.radius.item(),
                zIndex: 2,
                '&:hover': {
                    // background: colors.background.item.normal()
                }
            }
        },
    }
}];

Calendar.boundProps = [...(Calendar.boundProps || []), function ({value}, {createElement}: RenderContext) {
    return {
        '$root:style': {
            ...enclosedContainer,
            ...paddingContainer,
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            background: colors.background.box.normal(),
        },
        '$head:style': {
            color: colors.text.normal(false, 'auxiliary'),
        },
        '$control:style': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: sizes.space.inner(),
        },
        '$leftControl:style': {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: sizes.space.gap().div(2),
        },
        '$rightControl:style': {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: sizes.space.gap().div(2),
        },
        '$lastMonth:style': {
            ...interactableTextField,
            ...enclosedContainer,
            ...transitions.button('left'),
            useSelect: 'none',
            color: colors.text.normal(false, 'auxiliary'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizes.thing.item(),
            height: sizes.thing.item(),
        },
        '$nextMonth:style': {
            ...interactableTextField,
            ...enclosedContainer,
            ...transitions.button('right'),
            useSelect: 'none',

            color: colors.text.normal(false, 'auxiliary'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizes.thing.item(),
            height: sizes.thing.item(),
        },
        '$lastYear:style': {
            ...interactableTextField,
            ...enclosedContainer,
            ...transitions.button('left'),
            useSelect: 'none',

            color: colors.text.normal(false, 'auxiliary'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizes.thing.item(),
            height: sizes.thing.item(),
        },
        '$nextYear:style': {
            ...interactableTextField,
            ...enclosedContainer,
            ...transitions.button('right'),
            useSelect: 'none',
            color: colors.text.normal(false, 'auxiliary'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizes.thing.item(),
            height: sizes.thing.item(),
        },
        '$date:style': {
            padding: 0,
            margin: 0,
            borderWidth: 0,
        },
        '$displayDate:style_': (_: any, {date}: any) => {
            return () => ({
                color: (date.isLastMonth || date.isNextMonth) ? colors.text.disabled() : colors.text.normal(),
                // color: (date.isLastMonth || date.isNextMonth) ? 'red': colors.text.normal(),
                cursor: 'pointer',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                height: sizes.thing.box(),
                width: sizes.thing.box(),
                borderRadius: sizes.radius.item(),
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    background: colors.background.item.normal()
                }
            })
        }
    }
}]

// Button
Button.boundProps = [function ({}, {createElement}: RenderContext) {
    return {
        '$root:style': {
            ...raisedContainer,
            ...textBox,
            cursor: 'pointer',
            useSelect: 'none',
            borderRadius: sizes.radius.item(),
            background: colors.background.box.normal(),
            color: colors.text.normal(),
            '&:hover': {
                // background: colors.background.item.active()
            },
            transition: 'all 0.1s',
            '&:active': {
                // 往右往下移动一点
                transform: 'translate(1px, 1px)'
            }
        }
    }
}]

AccordionItem.boundProps = [function ({visible}: any, {createRxRef}: RenderContext) {

    return {
        '$root:style': {
            borderBottom: `1px solid ${colors.line.border.normal()}`,
            '&:last-child': {
                borderBottom: 0
            }
        },
        '$head:style': {
            alignItems: 'center',
            padding: [sizes.space.padding(), 0],
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        '$title:style': {
            fontWeight: 500,
        },
        '$handle:style': () => ({
            ...layout.rowCenter(),
            transform: visible() ? 'rotate(-90deg)' : 'rotate(0deg)',
            transition: 'transform .3s',
        }),
        '$contentContainer:style': {
            transition: 'height .3s',
        },
        '$content:style': {
            paddingBottom: sizes.space.padding(),
        }
    }
}]