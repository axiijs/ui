import {computed, createElement,mergeProp, reactiveFocused, RenderContext, StyleSize} from "axii";
import {percent} from "axii-ui-theme-common";
import {
    AccordionItem,
    Avatar,
    BlockOption,
    Button,
    Calendar,
    Checkbox,
    Combobox,
    Contextmenu,
    DatePicker,
    Dialog,
    Drawer,
    Dropdown,
    Input,
    originMenuContainerStyle,
    Popover,
    RadioGroup,
    RadioOption,
    Select,
    Slider,
    Sonner,
    Switch,
    Tabs,
    Textarea,
    Toast
} from "axii-ui";
import dayjs from "dayjs";
import {common} from "./common.js";

const {
    colors,
    layout,
    enclosedContainer,
    interactableItem,
    modalContainer,
    itemPaddingContainer,
    textPaddingContainer,
    projectingContainer,
    levitatingContainer,
    sizes,
    transitions,
    supportiveTextField,
    textBox,
    mainText,
    descriptionText,
    // supportiveText
    rawControl
} = common


export const menuItemStyle = {
    ...originMenuContainerStyle['&>*'],
    ...itemPaddingContainer,
    width:'100%',
    boxSizing: 'border-box',
    // ...layout.rowCenter(),
    borderBottom: `1px solid ${colors.line.border.normal()}`,
    '&:last-child': {
        borderBottom: 0
    },
    '&>*:nth-child(1)': {
        width:'100%',
        boxSizing: 'border-box',
        ...layout.twoSide(),
        ...textBox({borderWidth:0}),
        ...interactableItem,
    }
}

export const menuContainerStyle = {
    ...enclosedContainer,
    ...projectingContainer,
    overflow: 'visible',
    '&>*': menuItemStyle
}


export function install() {

    Avatar.boundProps = [function ({}, {createElement}: RenderContext) {
        return {
            '$root:style': {
                height: sizes.thing.box(1.5),
                width: sizes.thing.box(1.5),

                borderRadius: '50%',
                overflow: 'hidden',
                background: colors.background.item.normal(),
                ...common.layout.center()
            },
            '$alt:style': {
                fontSize: sizes.thing.box(.75),
                lineHeight: 1,
            },
            '$image:style': {
                width: '100%',
                height: '100%',
            }
        }
    }]


    Object.assign(originMenuContainerStyle, menuContainerStyle)

    Popover.boundProps = [function ({}, {createElement}: RenderContext) {
        return {
            '$content:style': {
                ...enclosedContainer,
                ...levitatingContainer,
            }
        }
    }]

    Dropdown.boundProps = [function ({}, {createElement}: RenderContext) {
        return {
            '$content:style': {
                ...enclosedContainer,
                ...levitatingContainer,
            }
        }
    }]

    Slider.boundProps = [function ({}, {createElement}: RenderContext) {
        return {
            '$root:style': {
                ...layout.columnCenter(),
                justifyContent: 'center',
                alignItems: 'stretch',
                height: sizes.thing.item(),
            },
            '$container:style': {
                margin: [0, sizes.thing.item().div(2)]
            },
            '$main:style': {
                ...projectingContainer,
                cursor: 'pointer',
                width: sizes.thing.item(),
                height: sizes.thing.item(),
                background: colors.background.box.normal(),
                marginLeft: `-${sizes.thing.item().div(2)}`,
                borderRadius: '50%',
            },
            '$bar:style': {
                background: colors.background.item.normal(),
                borderRadius: sizes.radius.item().div(2),
                height: sizes.thing.item().div(4),
            },
            '$barInner:style': {
                borderRadius: sizes.radius.item().div(2),
                background: colors.background.item.active(),
            }
        }
    }]

    Textarea.boundProps = [function ({}, {createElement}: RenderContext) {
        return {
            '$root:style': {
                ...enclosedContainer,
                ...projectingContainer,
                ...layout.columnCenter(),
                alignItems: 'stretch',
                borderRadius: sizes.radius.item(),
                overflow: 'hidden',
                padding: sizes.space.inner(),
            },
            '$main:style': {
                ...mainText,
                borderWidth: 0,
                outline: 'none',
                color: colors.text.normal(),
                placeholderColor: colors.text.normal(false, 'supportive'),
                background: colors.background.box.normal(),

            }
        }
    }]


    DatePicker.boundProps = [function ({value}, {createElement}: RenderContext) {
        return {
            '$main': {
                '$root:style': {
                    ...levitatingContainer,
                }
            },
            '$displayValueContainer:style': {
                ...textBox(),
                ...projectingContainer,
                ...layout.rowCenter(),
                cursor: 'pointer',
                gap: sizes.space.inner(),
            },
            '$displayValueIcon:style': {
                lineHeight: 0,
            }
        }
    }]

    Combobox.boundProps = [...Combobox.boundProps||[], function ({}, {createElement}: RenderContext) {
        return {
            '$root:style': {
                ...textBox(),
                ...projectingContainer,
                cursor: 'pointer',
            },
            '$displayValue:style': {
                display: 'flex',
                alignItems: 'center',
                fontSize: sizes.fontSize.text(),
                justifyContent: 'space-between',
            },
            '$optionsContainer:style': {
                ...modalContainer,
            },
            '$searchContainer:style': {
                padding: sizes.space.inner(),
            },
            '$loadingContainer:style': {
                ...itemPaddingContainer,
                ...layout.columnCenter(),
            },
            '$loading:style': {
                // 修复 svg 下面有个额外高度的问题
                lineHeight: 0,
                '@keyframes': {
                    from: {
                        transform:'rotate(0deg)'
                },
                    to: {
                        transform:'rotate(360deg)'
                    }
                },
                'animation': '1s linear infinite @self',
            },
            '$options:style': {
                color: colors.text.normal(),
                fontSize: sizes.fontSize.text(),
                lineHeight: '20px',
                overflow: 'auto',
                ...itemPaddingContainer
            },
            '$option:style': {
                ...interactableItem,
                ...textBox({borderWidth:0}),
            }
        }
    }];

    Sonner.boundProps = [function ({visible, stack}: any, {createElement}: RenderContext) {
        return {
            '$root:style': {
                position: 'fixed',
                bottom: 0,
                right: 0,
                overflow: 'visible',
            },
            '$content:style_': (_:any, {index}:any) => {
                return () => {
                    const translateY = `calc(-100% - ${index()*10}px)`
                    // const scale = `scaleX(${1 - index()*0.1})`
                    return [{
                        ...enclosedContainer,
                        ...itemPaddingContainer,
                        ...levitatingContainer,
                        position: 'fixed',
                        right:10,
                        bottom:10,
                        zIndex: 2000 - index(),
                        transition: 'transform .3s, opacity .3s',
                        transform: `translateY(150%)`,
                    }, {
                        transform: `translateY(${translateY}) scale(${1 - index()*0.1})`
                    }]
                }
            },
            '$content:detachStyle_': (_:any, {index, expired}:any) => {
                return () => {
                    return {
                        opacity: 0,
                    }
                }
            }
        }
    }]


    Toast.boundProps = [function ({visible}, {createElement}: RenderContext) {
        return {
            '$root:style': {
                position: 'fixed',
                bottom: 0,
                right: 0,
                overflow: 'visible',
            },
            '$content:style_': (_:any, {index}:any) => {
                return () => {
                    const translateY = `calc(-${index()* 100}% - ${index()*10}px)`

                    return [{
                            ...enclosedContainer,
                            ...itemPaddingContainer,
                            ...levitatingContainer,
                            position: 'fixed',
                            right:10,
                            bottom:10,
                            zIndex: 1000 - index(),
                            transition: 'transform .3s',
                            transform: `translateY(150%)`,
                    }, {
                            transform: `translateY(${translateY})`
                    }]
                }
            },
            '$content:detachStyle_': (_:any, {index, expired}:any) => {
                return () => {
                    const translateY = `calc(-${index()* 100}% - ${index()*10}px)`
                     return {
                         transform: `translate(200%, ${translateY})`
                     }
                }
            }
        }
    }]

    Contextmenu.boundProps = [function ({visible}, {createElement}: RenderContext) {
        return {
            '$content:style': {
                ...enclosedContainer,
                ...levitatingContainer,
            },
        }
    }]

    Drawer.boundProps = [function ({visible}, {createElement}: RenderContext) {
        return {
            '$root:style': [{
                background: 'rgba(0,0,0,.7)',
                zIndex: 10000,
                transition: 'opacity .3s',
                opacity: 0,
            }, () => ({
                opacity: visible() ? 1 : 0,
            })],
            '$content:style': [{
                transition: 'transform .3s',
                transform: 'translateY(100%)',
                background: colors.background.box.normal(),
            },() => ({
                transform: visible() ? 'translateY(0)' : 'translateY(100%)',
            })]
        }
    }]

    Dialog.boundProps = [function ({visible}, {createElement}: RenderContext) {
        return {
            '$root:style': [{
                background: 'rgba(0,0,0,.7)',
                zIndex: 10000,
                transition: 'opacity .3s',
                opacity: 0,
            }, () => ({
                opacity: visible() ? 1 : 0,
            })],
            '$content:style': {
                ...enclosedContainer,
                ...levitatingContainer,
                background: colors.background.box.normal(),
                padding: sizes.space.padding(),
                borderRadius: sizes.radius.panel(),
            }
        }
    }]

    Input.boundProps = [function ({}, {createStateFromRef}: RenderContext) {
        const focused = createStateFromRef(reactiveFocused)
        // TODO 继承 form status? 还是放在 createForm 里面？
        return {
            '$root:style': () => {
                const result = {
                    ...textBox(),
                    padding: 0,
                    ...projectingContainer,
                }
                if (focused()) {
                    result.borderColor = colors.line.border.focused()
                }

                console.log(projectingContainer.borderRadius, result.borderRadius)
                return result
            },
            '$main:style': {
                ...rawControl,
                ...mainText,
                padding: textBox().padding,
                placeholderColor: colors.text.normal(false, 'supportive'),
                color: colors.text.normal(),
            },
            '$prefix:style': {
                ...textBox({borderWidth:0}),
                ...supportiveTextField,
                borderRadius: 0,
                borderRight: enclosedContainer.border
            },
            '$affix:style': {
                ...textBox({borderWidth:0}),
                ...supportiveTextField,
                borderRadius: 0,
                borderLeft: enclosedContainer.border
            },
            '$main:ref': focused.ref
        }
    }];

    Select.boundProps = [...(Select.boundProps||[]), function ({value}, {createElement}: RenderContext) {
        return {
            '$root:style': {
                ...textBox(),
                ...projectingContainer,
                cursor: 'pointer',
                borderRadius: sizes.radius.item(),
            },
            '$displayValue:style': () => ({
                display: 'flex',
                alignItems: 'center',
                fontSize: sizes.fontSize.text(),
                color: value() ? colors.text.normal() : colors.text.normal(false, 'supportive'),
                justifyContent: 'space-between',
            }),
            '$options:style': {
                ...modalContainer,
                ...itemPaddingContainer,
                color: colors.text.normal(),
                fontSize: sizes.fontSize.text(),
                lineHeight: '20px',
            },
            '$displayOption:style': {
                ...interactableItem,
                ...textBox({borderWidth:0}),
            }
        }
    }];

    Checkbox.boundProps = [...(Checkbox.boundProps || []), function ({value}, {createElement}: RenderContext) {
        return {
            '$root:style': [{
                cursor: 'pointer',
                width: sizes.thing.item(),
                height: sizes.thing.item(),
                borderRadius: '50%',
            },() => ({
                outline: value() ? `1px solid ${colors.line.border.focused()}` : `1px solid ${colors.line.border.normal()}`,
            })],
            '$main:style': [{
                borderRadius: '50%',
                transition: 'height 0.3s, width 0.3s',
                background: colors.background.item.active()
            },() => {
                return {
                    width: value() ? sizes.thing.item().div(2) : 0,
                    height: value() ? sizes.thing.item().div(2) : 0,
                }
            }],
        }
    }];

    RadioGroup.boundProps = [...(RadioGroup.boundProps || []), function ({}, {createElement}: RenderContext) {
        return {
            '$root:style': () => ({
                gap: sizes.space.gap(),
            }),
            '$option': {
                '$root:style': ({
                    gap: sizes.space.gap(),
                })
            }
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
            '$dot:style': [{
                width:0,
                height:0,
                borderRadius: '50%',
                transition: 'height 0.3s, width 0.3s',
                background: colors.background.item.active(),
            },() => {
                return {
                    width: selected() ? sizes.thing.item().div(2) : 0,
                    height: selected() ? sizes.thing.item().div(2) : 0,
                }
            }]
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
                ...(value() ? {} : projectingContainer),
                boxSizing: 'border-box',
                width: sizes.thing.inner(),
                height: sizes.thing.inner(),
                marginLeft: value() ?
                    sizes.thing.item().mul(2).sub(sizes.thing.inner()).sub(sizes.space.inner()) :
                    gap
                ,
                transition: 'all 0.3s',
                background: colors.background.box.normal(),
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

        const rootRef = createRxRef()
        const currentRect = computed<DOMRect>(() => {
            const rect = optionsToPosRef.get(current())?.ref.current?.getBoundingClientRect()
            return rect
        })

        return {
            '$root:ref': rootRef,
            '$root:style': {
                position: 'relative',
                // 补充一个和 bg 一样的 border，主要是为了填充高度
                border: `1px solid ${colors.background.item.normal()}`,
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
                    ...projectingContainer,
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
                    transition: 'left 0.3s',
                })
            },
            '$tab:ref_': (_: any, {tab}: any) => {
                return mergeProp('ref', _, optionsToPosRef.get(tab)!.ref!)
            },
            '$tab:style_': () => {
                return {
                    ...textPaddingContainer,
                    cursor: 'pointer',
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
                ...itemPaddingContainer,
                ...projectingContainer,
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                background: colors.background.box.normal(),
            },
            '$head:style': {
                color: colors.text.normal(false, 'supportive'),
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
                ...interactableItem,
                ...enclosedContainer,
                ...transitions.button('left'),
                useSelect: 'none',
                color: colors.text.normal(false, 'supportive'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: sizes.thing.item(),
                height: sizes.thing.item(),
            },
            '$nextMonth:style': {
                ...interactableItem,
                ...enclosedContainer,
                ...transitions.button('right'),
                useSelect: 'none',

                color: colors.text.normal(false, 'supportive'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: sizes.thing.item(),
                height: sizes.thing.item(),
            },
            '$lastYear:style': {
                ...interactableItem,
                ...enclosedContainer,
                ...transitions.button('left'),
                useSelect: 'none',

                color: colors.text.normal(false, 'supportive'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: sizes.thing.item(),
                height: sizes.thing.item(),
            },
            '$nextYear:style': {
                ...interactableItem,
                ...enclosedContainer,
                ...transitions.button('right'),
                useSelect: 'none',
                color: colors.text.normal(false, 'supportive'),
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
            '$displayDate:style_': (_: any, {date, month, selected}: any) => {

                const isLastMonth = dayjs(date).month() < month()-1
                const isNextMonth = dayjs(date).month() > month()-1

                return () => ({
                    color: selected() ? colors.text.active(true) : ((isLastMonth || isNextMonth) ? colors.text.disabled() : colors.text.normal()),
                    // color: selected() ? 'white' : ((isLastMonth || isNextMonth) ? colors.text.disabled() : colors.text.normal()),
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
                    background: selected() ? colors.background.item.active() : 'transparent',
                    '&:hover': {
                        background: selected() ? colors.background.item.active() : colors.background.item.normal()
                    }
                })
            }
        }
    }]

    // Button
    Button.boundProps = [function ({}, {createElement}: RenderContext) {
        return {
            '$root:style': {
                ...projectingContainer,
                cursor: 'pointer',
                useSelect: 'none',
                ...common.transitions.button(),
                whiteSpace: 'nowrap',

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
                color: colors.text.normal(false, 'supportive'),
                transform: visible() ? 'rotate(-90deg)' : 'rotate(0deg)',
                transition: 'transform .3s',
            }),
            '$contentContainer:style': {
                transition: 'height .3s',
            },
            '$content:style': {
                ...descriptionText,
                paddingBottom: sizes.space.padding(),
            }
        }
    }]

    // 从 query 中获取 mode
    const search = new URLSearchParams(window.location.search)
    const dark = search.get('mode') === 'dark'

    console.log('dark', dark)
    document.head.appendChild(<style>
{`
body {
    background: ${dark ? '#111' : '#fff'};
    color: ${dark ? '#fff' : '#000'
}
`}
    </style> as HTMLElement)

}

export const variants = {
    Button: {
        primary: {
            '$root:style': {
                border: 0,
                background: colors.background.box.active(),
                color: colors.text.active(true),
            }
        },
        // size 信息？？
    }
}
