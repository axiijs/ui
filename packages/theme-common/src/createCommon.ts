import {StyleSize} from 'axii'
import {matrixMatch, RangeValueGetter} from "./util/util.js";
import {InputColors,} from "./pattern.js";
import chroma from 'chroma-js'


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
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'around' | 'evenly' | 'stretch'
}

type TextType = 'text' | 'description' | 'supportive' | 'heading'


export type TextBoxOptions = {
    color?: string,
    infoColor?: string,
    invertedColor?: string,

    colorBox?: boolean,
    highlight?: boolean,
    interactable?: boolean,

    borderWidth?: number|StyleSize,
    textAsContent?: boolean,
}

export type ColorSchema = {
    line: string,
    lineInverted: string,
    error: string,
    warning: string,
    success: string,
    info: string,
    process: string,
    // for extended
    [k:string]: any
}

export function createCommon(
    themeColorSchema: ColorSchema,
    themeDark = false,
    themeBorderWidth: StyleSize = new StyleSize(1, 'px'),
    themeRadius: RangeValueGetter<StyleSize>,
    shadows:RangeValueGetter<string>,
    weights: RangeValueGetter<number>
) {
    const brighten = (color: string, amount: number) => themeDark ? chroma(color).darken(amount): chroma(color).brighten(amount)
    const darken = (color: string, amount: number) => themeDark ? chroma(color).brighten(amount): chroma(color).darken(amount)

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
                return em(times)
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
                return themeRadius(0).clone()
            },
            item() {
                return themeRadius(1).clone()
            },
            box() {
                return themeRadius(2).clone()
            },
            panel() {
                return themeRadius(3).clone()
            }
        }
    }

    const colors = ({
        text: {
            normal(inverted = false, type: TextType = 'text') {
                return inverted ? themeColorSchema.lineInverted : themeColorSchema.line
            },
            disabled(inverted = false) {
                return darken(inverted ? themeColorSchema.lineInverted : themeColorSchema.line, 1)
            },
            active(inverted = false) {
                return inverted ? themeColorSchema.lineInverted:themeColorSchema.line
            },
            success() {
                return themeColorSchema.success
            },
            warning() {
                return themeColorSchema.warning
            },
            danger() {
                return themeColorSchema.error
            },
            info() {
                return themeColorSchema.info
            },
        },
        background: {
            box: {
                normal() {
                    return themeColorSchema.lineInverted
                },
                disabled() {
                    return themeColorSchema.lineInverted
                },
                active() {
                    return themeColorSchema.line
                },
                focus() {
                    return themeColorSchema.lineInverted
                },
                success() {
                    return themeColorSchema.success
                },
                warning() {
                    return themeColorSchema.warning
                },
                danger() {
                    return themeColorSchema.error
                },
                info() {
                    return themeColorSchema.info
                },
            },
            item: {
                normal() {
                    return darken(themeColorSchema.lineInverted, .3)
                },
                active() {
                    return themeColorSchema.line
                },
                disabled() {
                    return darken(themeColorSchema.lineInverted, .3)
                },
            }
        },
        line: {
            border: {
                normal(inverted = false) {
                    return inverted ? 'none' : brighten(themeColorSchema.line, 4)
                },
                focused(inverted = false) {
                    return inverted ? themeColorSchema.lineInverted: themeColorSchema.line
                },
                success() {
                    return themeColorSchema.success
                },
                warning() {
                    return themeColorSchema.warning
                },
                danger() {
                    return themeColorSchema.error
                },
                info() {
                    return themeColorSchema.info
                },
            },
            separator() {
                return brighten(themeColorSchema.line, 4)
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
                // 允许换行
                flexWrap: 'wrap',
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
        evenlyGrid: (rowGap: string | number | StyleSize, columnGap: string | number | StyleSize, minWidth: string | number | StyleSize) => ({
            display: 'grid',
            rowGap,
            columnGap,
            gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
        }),
        circle(radius: number | StyleSize = 40) {
            return {
                borderRadius: '50%',
                width: radius,
                height: radius,
                boxSizing: 'border-box',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }
        },
        oneLine(overflow = 'hidden') {
            return {
                whiteSpace: 'nowrap',
                overflow,
                maxWidth: '100%',
                textOverflow: 'ellipsis',
            }
        }
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

    // 支持 3 种模式：
    // 1. 描边模式 color/infoColor 来文字和描边, invertedColor 来填充
    // 2. 色块模式，color/infoColor 来填充，invertedColor 来写文字。无边框。
    // 3. 高亮模式，color 文字，infoColor 变浅填充，infoColor 边框
    const textBox = (options: TextBoxOptions = {}) => {
        const {
            color = themeColorSchema.line,
            infoColor,
            invertedColor = themeColorSchema.lineInverted,
            colorBox = false, // 色块模式
            highlight = false, // 高亮模式
            interactable,
            borderWidth = themeBorderWidth,
            textAsContent = true
        } = options

        // colorBox | highlight | dark
        const colorPattern = [
            [false, false, undefined, infoColor||color],
            [true, false, true, infoColor ? color : invertedColor],
            [true, false, false, invertedColor],
            [false, true, undefined, color],
        ]

        // colorBox | highlight
        const backgroundColoPattern = [
            [false, false, invertedColor],
            [true, false, infoColor||color],
            [false, true, brighten(infoColor||color, 2)],
        ]


        const attrs: any = {
            color: matrixMatch([colorBox, highlight, themeDark], colorPattern),
            backgroundColor: matrixMatch([colorBox, highlight], backgroundColoPattern),
            borderColor: infoColor||color,
        }

        if (interactable === true) {
            attrs.cursor = 'pointer'
            attrs['&:hover'] = {
                color: brighten(attrs.color,1),
                borderColor:brighten(attrs.borderColor,1),
                backgroundColor: brighten(attrs.backgroundColor, 1),
            }
        } else if (interactable === false) {
            attrs.cursor = 'not-allowed'
            attrs.color = brighten(attrs.color,2)
            attrs.borderColor = brighten(attrs.borderColor,2)
            if (attrs.backgroundColor && attrs.backgroundColor!== 'transparent') {
                attrs.backgroundColor =   brighten(attrs.backgroundColor,2)
            }
        }

        if (borderWidth) {
            attrs.borderWidth = borderWidth
        }

        attrs.boxSizing = 'border-box'
        attrs.padding = [sizes.space.innerText().div(textAsContent ? 2 : 1), sizes.space.innerText()]

        return attrs

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
            background: darken(themeColorSchema.lineInverted, .2),
        }
    }

    const enclosedContainer = {
        borderRadius: sizes.radius.item(),
        border: `${themeBorderWidth} solid ${colors.line.border.normal()}`,
        overflow: 'hidden',
    }


    const modalContainer = {
        ...enclosedContainer,
        boxShadow: shadows(4),
        background: colors.background.box.normal(),
    }

    const projectingContainer = {
        ...enclosedContainer,
        boxShadow: shadows(0),
        background: colors.background.box.normal(),
    }

    const levitatingContainer = {
        ...enclosedContainer,
        boxShadow: shadows(1),
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
        iconBox,
        textBox,
        interactableItem,

        textField,
        supportiveTextField,
        labelTextField,
        descriptionTextField,

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
        colorScheme: themeColorSchema,
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


