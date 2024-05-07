import {StyleSize} from 'axii'
import {createPattern} from "./util/util.js";
import {INDEX} from "./util/case.js";
import {valueRules} from "./pattern.js";

const PRIMARY_COLOR = 'black'

function pattern(primaryColor: string = PRIMARY_COLOR) {
    return createPattern(INDEX, valueRules(primaryColor))
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

type TextType = 'text' | 'description' | 'auxiliary' | 'heading'

export const sizes =  {
    font: {
        heading(level: number) {
            return rem(2 + level)
        },
        text() {
            return rem(1)
        },
        // 出错信息等
        description() {
            return rem(0)
        },
        // 辅助文字  placeholder 等都算
        auxiliary() {
            return rem(-1)
        },
    },
    thing: {
        box() {
            return rem(2)
        },
        text() {
            return rem(1)
        },
        inner(level: number = 2) {
            return rem(2).sub(2, 'px')
        }
    },
    space: {
        padding(value: number= 1) {
            // 和外部的 border 之间的距离
            return rem(value)
        },
        gap(){
            // item 之间的具体距离
            return rem(1)
        },
        inner(level: number = 2) {
            // 内部的 item 和自己的 border 之间的距离
            return px(2)
        }
    },
}

export const colors =  {
    text: {
        normal(inverted = false, type: TextType = 'text') {
            const offset = type === 'text' ? 0 : (type === 'description' ? -1 : -2)
            return inverted ? pattern().inverted().color(offset) : pattern().color(offset)
        },
        disabled(inverted = false) {
            return inverted ? pattern().inverted().inactive().color() : pattern().inactive().color()
        },
        active(inverted = false) {
            return inverted ? pattern().inverted().active().color() : pattern().active().color()
        },
        success() {
            return pattern().feature().success().color()
        },
        warning() {
            return pattern().feature().warning().color()
        },
        danger() {
            return pattern().feature().danger().color()
        },
        info() {
            return pattern().feature().info().color()
        },
    },
    background: {
        box: {
            normal() {
                return pattern().bgColor()
            },

            disabled() {
                return pattern().inactive().bgColor()
            },
            active() {
                return pattern().inverted().active().bgColor()
            },
            success() {
                return pattern().feature().success().bgColor()
            },
            warning() {
                return pattern().feature().warning().bgColor()
            },
            danger() {
                return pattern().feature().danger().bgColor()
            },
            info() {
                return pattern().feature().info().bgColor()
            },
        },
        item: {
            normal() {
                return pattern().inactive().bgColor()
            },
            active() {
                return pattern().inverted().active().bgColor()
            },
            disabled() {
                return pattern().inactive().color()
            },
        }
    },
    line: {
        border: {
            normal(inverted = false) {
                return inverted ? 'none' : pattern().borderColor()
            },
            focused(inverted = false) {
                return inverted ? 'none' : pattern().interactable().active().color()
            },
            success() {
                return pattern().feature().success().color()
            },
            warning() {
                return pattern().feature().warning().color()
            },
            danger() {
                return pattern().feature().danger().color()
            },
            info() {
                return pattern().feature().info().color()
            },
        },
        separator() {
            return pattern().separateColor()
        }
    }
}

export const layout = {
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

export const paddingContainer = {
    padding: rem(1),
}

// 正文
export const textField = {

}

export const supportiveTextField = {
    background: colors.background.item.normal(),
}

export const labelTextField = {

}

export const descriptionTextField = {

}

export const interactableTextField = {
    cursor: 'pointer',
    '&:hover': {
        background: colors.background.item.normal(),
    }
}

export const enclosedContainer = {
    borderRadius: rem(0.5),
    overflow: 'hidden',
    border: `1px solid ${colors.line.border.normal()}`,
}

export const modalContainer = {
    ...enclosedContainer,
    boxShadow: pattern().shadow(6),
    background: colors.background.box.normal(),
}

export const raisedContainer = {
    ...enclosedContainer,
    boxShadow: pattern().shadow(2),
    background: colors.background.box.normal(),
}

