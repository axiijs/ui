import {StyleSize} from 'axii'
import {createPattern, createRange} from "./util/util.js";
import {INDEX} from "./util/case.js";
import {InputColors, valueRules} from "./pattern.js";


const shadows = [
    '0 1px 2px 0 rgba(0,0,0,.05)',
    '0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03)',
    '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    '-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)',
    '6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05), 12px 0 48px 16px rgba(0, 0, 0, 0.03)',
]


function pattern(inputColors: InputColors) {
    return createPattern(INDEX, valueRules(inputColors))
}

export function px(value: number) {
    return new StyleSize(value, 'px')
}

export function rem(value: number = 0) {
    return new StyleSize(value, 'rem')
}

export function percent(value: number = 0) {
    return new StyleSize(value, '%')
}

export function em(value: number = 0) {
    return new StyleSize(value, 'em')
}

type flexRowProps = {
    gap?: number|StyleSize,
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch'
}

type TextType = 'text' | 'description' | 'supportive' | 'heading'

export function createCommon(inputColors: InputColors) {
    const weights = createRange([100, 200, 300, 400, 500, 600, 700, 800, 900], 3)

    const sizes = {
        fontWeight(offset: number = 0) {
            return weights(offset)
        },
        fontSize: {
            heading(level: number =0) {
                return rem(2 + level)
            },
            title() {
                return rem(1.2)
            },
            text() {
                return rem(1)
            },
            // 出错信息等
            description() {
                return rem(1)
            },
            // 辅助文字  placeholder 等都算
            supportive() {
                return rem(.9)
            },
        },
        thing: {
            box(times: number = 1) {
                return rem(2*times)
            },
            item() {
                return rem(1.5)
            },
            text() {
                return rem(1)
            },
            inner(level: number = 2) {
                return sizes.thing.item().sub(sizes.space.inner())
            }
        },
        space: {
            panel(times: number = 1) {
              // 和外部 panel 之间的距离
                return rem(times)
            },
            padding(times: number = 1) {
                // 和外部的 border 之间的距离
                return rem(.65*times)
            },
            // text 和 border 之间的距离
            innerText(times: number = 1) {
                return rem(.75*times)
            },
            itemGap(times: number = 1) {
                return px(4*times)
            },
            gap(times: number = 1) {
                // item 之间的具体距离
                return rem(.75 * times)
            },
            inner(times: number = 1) {
                // 内部的 item 和自己的 border 之间的距离
                return px(4*times)
            }
        },
        radius: {
            text() {
                return rem(0.3)
            },
            item() {
                return rem(0.5)
            },
            box() {
                return rem(.55)
            },
            panel() {
                return rem(.6)
            }
        }
    }

    const colors = ({
        text: {
            normal(inverted = false, type: TextType = 'text') {
                const offset = type === 'text' ? 0 : (type === 'description' ? -2 : -6)
                return inverted ? pattern(inputColors).inverted().color(offset) : pattern(inputColors).color(offset)
            },
            disabled(inverted = false) {
                return inverted ? pattern(inputColors).inverted().interactable().inactive().color() : pattern(inputColors).interactable().inactive().color()
            },
            active(inverted = false) {
                return inverted ? pattern(inputColors).inverted().interactable().active().color() : pattern(inputColors).interactable().active().color()
            },
            success() {
                return pattern(inputColors).feature().success().color()
            },
            warning() {
                return pattern(inputColors).feature().warning().color()
            },
            danger() {
                return pattern(inputColors).feature().danger().color()
            },
            info() {
                return pattern(inputColors).feature().info().color()
            },
        },
        background: {
            box: {
                normal() {
                    return pattern(inputColors).bgColor()
                },
                disabled() {
                    return pattern(inputColors).inactive().bgColor()
                },
                active() {
                    return pattern(inputColors).interactable().inverted().active().bgColor()
                },
                focus() {
                    return pattern(inputColors).interactable().inactive().interact().bgColor()
                },
                success() {
                    return pattern(inputColors).feature().success().bgColor()
                },
                warning() {
                    return pattern(inputColors).feature().warning().bgColor()
                },
                danger() {
                    return pattern(inputColors).feature().danger().bgColor()
                },
                info() {
                    return pattern(inputColors).feature().info().bgColor()
                },
            },
            item: {
                normal() {
                    return pattern(inputColors).inactive().bgColor()
                },
                active() {
                    return pattern(inputColors).inverted().active().bgColor()
                },
                disabled() {
                    return pattern(inputColors).inactive().color()
                },
            }
        },
        line: {
            border: {
                normal(inverted = false) {
                    return inverted ? 'none' : pattern(inputColors).borderColor()
                },
                focused(inverted = false) {
                    return inverted ? 'none' : pattern(inputColors).interactable().active().color()
                },
                success() {
                    return pattern(inputColors).feature().success().color()
                },
                warning() {
                    return pattern(inputColors).feature().warning().color()
                },
                danger() {
                    return pattern(inputColors).feature().danger().color()
                },
                info() {
                    return pattern(inputColors).feature().info().color()
                },
            },
            separator() {
                return pattern(inputColors).separateColor()
            }
        }
    })

    const layout = {
        flexRow({gap, align, justify}: flexRowProps) {
            return {
                display: 'flex',
                flexDirection: 'row',
                gap,
                alignItems: align,
                justifyContent: justify,
            }
        },
        flexColumn({gap, align, justify}: flexRowProps) {
            return {
                display: 'flex',
                flexDirection: 'column',
                gap,
                alignItems: align,
                justifyContent: justify,
            }
        },
        flexColumnStretched({gap}: flexRowProps) {
            return {
                display: 'flex',
                flexDirection: 'column',
                gap,
                alignItems: 'stretch',
            }
        },
        center() {
            return {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        },
        rowCenter({gap, justify}: flexRowProps = {}) {
            return {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap,
                justifyContent: justify
            }
        },
        columnCenter({gap}: flexRowProps = {}) {
            return {
                display: 'flex',
                flexDirection: 'column',
                gap,
                alignItems: 'center',
            }
        },
        twoSide(column = false) {
            return {
                display: 'flex',
                flexDirection: column ? 'column' : 'row',
                justifyContent: 'space-between',
            }
        },
        middleGrow(column = false, middleOffset = 2) {
            return {
                display: 'flex',
                minHeight: 0,
                flexDirection: column ? 'column' : 'row',
                [`&>*:nth-child(-n+${middleOffset-1})`]: {
                    flexGrow:0,
                    flexShrink:0,
                },
                [`&>*:nth-child(${middleOffset})`]: {
                    flexGrow:1,
                    flexShrink:1,
                },
                [`&>*:nth-child(n+${middleOffset+1})`]: {
                    flexGrow:0,
                    flexShrink:0,
                }
            }
        },

    }

    const itemPaddingContainer = {
        padding: sizes.space.inner(),
    }

    const textPaddingContainer = {
        padding: [sizes.space.innerText(.8), sizes.space.innerText(1.2),],
    }

    const boxPaddingContainer = {
        padding: sizes.space.padding(),
    }

    const panelPaddingContainer = {
        padding: sizes.space.panel(),
    }

    // 正文
    const mainText = {
        fontSize: sizes.fontSize.text(),
        color: colors.text.normal(),
    }
    const textField = {}


    const textBox = {
        ...layout.rowCenter(),
        // height: sizes.thing.box(),
        borderRadius: sizes.radius.text(),
        padding: [sizes.space.innerText(), sizes.space.innerText()]
    }

    const iconBox = {
        ...layout.rowCenter(),
        borderRadius: sizes.radius.text(),
        padding: sizes.space.innerText()
    }

    const supportiveText = {
        fontSize: sizes.fontSize.supportive(),
        color: colors.text.normal(false, 'supportive'),
    }

    const supportiveTextField = {
        background: colors.background.item.normal(),
    }

    const labelTextField = {}

    const descriptionText = {
        fontSize: sizes.fontSize.description(),
        color: colors.text.normal(false, 'description'),
    }

    const descriptionTextField = {}

    const interactableItem = {
        cursor: 'pointer',
        '&:hover': {
            background: colors.background.item.normal(),
        }
    }

    const enclosedContainer = {
        borderRadius: rem(0.5),
        border: `1px solid ${colors.line.border.normal()}`,
        overflow: 'hidden',
    }


    const modalContainer = {
        ...enclosedContainer,
        boxShadow: shadows[4],
        background: colors.background.box.normal(),
    }

    const projectingContainer = {
        ...enclosedContainer,
        boxShadow: shadows[0],
        background: colors.background.box.normal(),
    }

    const levitatingContainer = {
        ...enclosedContainer,
        boxShadow: shadows[1],
        background: colors.background.box.normal(),
    }


    const transitions = {
        button(direction: 'left' | 'right' | 'down' = 'down') {
            return {
                transition: 'transform 0.1s',
                '&:active': {
                    transform:
                        direction === 'left' ?
                            'translateX(-1px)' :
                            direction === 'right' ?
                                'translateX(1px)' :
                                'translate(1px, 1px)',
                }
            }
        }
    }



    const separatedList = (vertical = false) => {
        return vertical ? {
            '& > *': {
                borderBottom: `1px solid ${colors.line.separator()}`,
                '&:last-child': {
                    borderBottom: 'none'
                }
            }
        } : {
            '& > *': {
                borderRight: `1px solid ${colors.line.separator()}`,
                '&:last-child': {
                    borderRight: 'none'
                }
            }
        }
    }

    const listItems = {
        '& > *' : {
            padding: [sizes.space.padding(), sizes.space.padding(2)],
            '&:hover': {
                background: colors.background.item.normal(),
                cursor: 'pointer',
            },
        }
    }

    const listItem = {
        ...textPaddingContainer,
        ...interactableItem,
        ...layout.rowCenter()
    }

    const groupedListItems = {
        ...separatedList(true),
        '& > * >*': listItems,
    }

    const separator = (horizontal?:boolean, times = 1) => {
        return horizontal ? {
            backgroundColor: colors.line.separator(),
            margin: [0, sizes.space.padding(times), ],
            width: 1,
            height: '100%',
        } : {
            margin: [sizes.space.padding(times), 0],
            backgroundColor: colors.line.separator(),
            height:1,
            width: '100%',
        }
    }

    const rawControl = {
        border: 'none',
        background: 'none',
        outline: 'none',
        padding: 0,
        margin: 0,
        lineHeight: 1,
    }

    const heading = (level: number = 0) => ({
        fontSize: sizes.fontSize.heading(level),
        fontWeight: sizes.fontWeight(4),
        lineHeight: 1
    })



    const table = () => ({
        ...enclosedContainer,
        overflow: 'auto',
        '& > table': {
            minWidth: '100%',
            margin: 0,
            padding: 0,
            borderCollapse: 'collapse',
        },

        '& > table > thead > tr': {
            borderBottom: `1px solid ${colors.line.separator()}`,
            '& > th': {
                textAlign: 'left',
                borderWidth: 0,
                background: colors.background.item.normal(),
                padding: sizes.space.padding(),
            }
        },
        '& > table > tbody > tr': {
            borderBottom: `1px solid ${colors.line.separator()}`,

            '&:last-child': {
                borderBottom: 'none'
            },
            '& > td' : {
                border: 0,
                padding: sizes.space.padding(),
                // 不换行
                whiteSpace: 'nowrap',
            }

        }
    })

    const mask = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

    const spin = (speed: number = 1) => ({
        '@keyframes': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(359deg)' }
        },
        lineHeight: 0,
        animation: `@self ${speed}s linear infinite`,
        transformOrigin: 'center center',
    })

    return {
        // primitives
        colors,
        sizes,
        layout,
        transitions,
        // containers
        itemPaddingContainer,
        textPaddingContainer,
        boxPaddingContainer,
        panelPaddingContainer,
        enclosedContainer,
        modalContainer,
        projectingContainer,
        levitatingContainer,
        // text like fields
        textField,
        iconBox,
        supportiveTextField,
        labelTextField,
        descriptionTextField,
        interactableItem,
        textBox,
        mainText,
        descriptionText,
        supportiveText,
        heading,
        // list items
        separatedList,
        listItems,
        listItem,
        groupedListItems,
        // other
        mask,
        spin,
        rawControl,
        separator,
        table,
        pattern() {
            return pattern(inputColors)
        }
    }
}

function getColorVar(type: string, index: number) {
    return `--color-${type}-${index}`
}


export class ThemeColors {
    public inputColorVars!: InputColors
    public varsToColors: { [key: string]: string } = {}

    constructor(public inputColors: InputColors) {
        this.genVars()
    }

    genVars() {
        this.inputColorVars = {} as InputColors
        this.varsToColors = {}
        for (let key in this.inputColors) {
            const colorType = key as keyof InputColors
            this.inputColorVars[colorType] = [[], this.inputColors[colorType as keyof InputColors][1]]
            this.inputColors[colorType as keyof InputColors][0].forEach((color: string, index: number) => {
                const varName = getColorVar(colorType, index)
                this.varsToColors[varName] = color
                this.inputColorVars[colorType][0][index] = `var(${varName})`
            })
        }
    }

    injectVars() {
        for (let varName in this.varsToColors) {
            document.documentElement.style.setProperty(varName, this.varsToColors[varName])
        }
    }

    replaceColors(inputColors: InputColors) {
        this.inputColors = inputColors
        this.genVars()
        this.injectVars()
    }
}


