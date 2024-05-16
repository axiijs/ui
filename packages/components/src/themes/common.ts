import {StyleSize} from 'axii'
import {createPattern} from "./util/util.js";
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
    gap: number,
    align: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

type TextType = 'text' | 'description' | 'supportive' | 'heading'

export function createCommon(inputColors: InputColors) {
    const sizes = {
        font: {
            heading(level: number) {
                return rem(2 + level)
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
            box() {
                return rem(2)
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
            padding(value: number = .75) {
                // 和外部的 border 之间的距离
                return rem(value)
            },
            gap() {
                // item 之间的具体距离
                return rem(1)
            },
            inner(level: number = 4) {
                // 内部的 item 和自己的 border 之间的距离
                return px(level)
            }
        },
        radius: {
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
                const offset = type === 'text' ? 0 : (type === 'description' ? -2 : -4)
                return inverted ? pattern(inputColors).inverted().color(offset) : pattern(inputColors).color(offset)
            },
            disabled(inverted = false) {
                return inverted ? pattern(inputColors).inverted().interactable().inactive().color() : pattern(inputColors).interactable().inactive().color()
            },
            active(inverted = false) {
                return inverted ? pattern(inputColors).inverted().active().color() : pattern(inputColors).active().color()
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
                    return pattern(inputColors).inverted().active().bgColor()
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
        center() {
            return {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        },
        rowCenter() {
            return {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }
        },
        columnCenter() {
            return {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }
        },
        twoSide(column = false) {
            return {
                display: 'flex',
                flexDirection: column ? 'column' : 'row',
                justifyContent: 'space-between',
            }
        }
    }

    const paddingContainer = {
        padding: rem(1),
    }

    // 正文
    const mainText = {
        fontSize: sizes.font.text(),
        color: colors.text.normal(),
    }
    const textField = {}


    const textBox = {
        ...layout.rowCenter(),
        height: sizes.thing.box(),
        padding: [0, sizes.space.padding()]
    }

    const supportiveText = {
        fontSize: sizes.font.supportive(),
        color: colors.text.normal(false, 'supportive'),
    }

    const supportiveTextField = {
        background: colors.background.item.normal(),
    }

    const labelTextField = {}

    const descriptionText = {
        fontSize: sizes.font.description(),
        color: colors.text.normal(false, 'description'),
    }

    const descriptionTextField = {}

    const interactableTextField = {
        cursor: 'pointer',
        '&:hover': {
            background: colors.background.item.normal(),
        }
    }

    const enclosedContainer = {
        borderRadius: rem(0.5),
        overflow: 'hidden',
        border: `1px solid ${colors.line.border.normal()}`,
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

    const listItems = {
        '& > *' : {
            padding: [sizes.space.padding(), sizes.space.padding(2)],
            '&:hover': {
                background: colors.background.item.normal(),
                cursor: 'pointer',
            },
        }
    }

    const groupedListItems = {
        '& > *': {
            borderBottom: `1px solid ${colors.line.separator()}`,
            '&:last-child': {
                borderBottom: 'none'
            },
            '& > *': {
                ...listItems,
            }
        }
    }

    return {
        colors,
        sizes,
        layout,
        transitions,
        paddingContainer,
        textField,
        supportiveTextField,
        labelTextField,
        descriptionTextField,
        interactableTextField,
        enclosedContainer,
        modalContainer,
        projectingContainer,
        levitatingContainer,
        textBox,
        mainText,
        descriptionText,
        supportiveText,
        listItems,
        groupedListItems,
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


