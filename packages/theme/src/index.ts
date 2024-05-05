import {matrixMatch, createPattern} from './pattern/util.js'
import {
    colors,
    spaceValues,
    fontSizes,
    lineHeightValues,
    maskColors,
    zIndexes,
    shadows,
    fontWeights,
    borderRadius,
    PRIMARY_COLOR
} from './pattern/basic.js';
import {INDEX} from './pattern/case.js'
import {StyleSize } from 'axii'

// 正色是黑色
// 主色是蓝色
// 反色不管什么情况都是白色


const valueRules = (primaryColor: string) => ({
    // 颜色类，受交互状态、反色等规则影响。
    // 字体颜色
    color({interactable, stress, inverted, active, interact, feature}: any, offset = 0, color = primaryColor) {
        /**
         * 判断维度：
         * 1. 先判断 interactable。如果否，判断 stress.
         * 2. interactable 下判断 invert,
         *  2.1 invert 是，直接白色。
         *  2.2 invert 否，判断 active
         *    2.2.1 active 无。black 再判断 interactive
         *
         *    2.2.1 active inactive。灰
         *    2.2.1 active active。主色
         *
         */
        const matrix = [
            [undefined, undefined, undefined, undefined, undefined, undefined, colors.black(offset)],  // 正常情况下是褐色
            [undefined, INDEX.stressed, undefined, undefined, undefined, undefined, colors.black(1 + offset)], // 强调的时候黑色变深
            [INDEX.interactable, undefined, INDEX.inverted, undefined, undefined, undefined, colors.gray(-6)], // 反色
            [INDEX.interactable, undefined, undefined, undefined, undefined, undefined, colors.black(offset)], // 可交互时，默认颜色是正色
            [INDEX.interactable, undefined, undefined, INDEX.active.active, undefined, undefined, colors[color](offset)], // 可交互并且激活时，显示的是主色。
            [INDEX.interactable, undefined, undefined, INDEX.active.inactive, undefined, undefined, colors.gray()], // 可交互，但未激活是灰色
            [INDEX.interactable, undefined, undefined, INDEX.active.active, INDEX.interact, undefined, colors[color](-1 + offset)], // 可交互，激活，正在交互时，主色变浅一点。
            // 根据不同的 feature 展示不同的颜色
            [INDEX.interactable, undefined, undefined, undefined, undefined, INDEX.feature.danger, colors.red(-1 + offset)],
            [INDEX.interactable, undefined, undefined, undefined, INDEX.interact, INDEX.feature.danger, colors.red(-2 + offset)],
        ]

        return matrixMatch([interactable, stress, inverted, active, interact, feature], matrix)
    },
    shadowColor(props: any, offset = 0, color = primaryColor) {
        return this.color(props, offset - 4, color)
    },
    shadow({elevate}: any, offset = 0) {
        return shadows(offset)
    },
    // 背景颜色
    bgColor({inverted, active, interact, feature}: any, offset = 0, color = primaryColor) {
        /**
         * 判断维度: 正常情况下都是 transparent(undefined)
         * 1. 判断 invert
         *   1.1 否。透明
         *   1.2 是。判断 active
         *     1.2.1 常亮 primary | 正常 primary | disabled 灰色。常亮和正常下还要判断 interacting
         *     1.2.1.1 interacting 是 变亮一点。否，正常
         */
        const matrix = [
            [undefined, undefined, undefined, undefined, 'transparent'],
            [undefined, INDEX.active.active, undefined, undefined, colors.gray(-6)],
            [INDEX.inverted, undefined, undefined, undefined, colors[color](offset)],
            [INDEX.inverted, INDEX.active.inactive, undefined, undefined, colors[color](-3 + offset)],
            [INDEX.inverted, INDEX.active.active, undefined, undefined, colors[color](offset)],
            [INDEX.inverted, undefined, INDEX.interact, undefined, colors[color](-1 + offset)],
            [INDEX.inverted, INDEX.active.active, INDEX.interact, undefined, colors[color](-1 + offset)],
            // 根据不同的 feature 展示不同的颜色
            [INDEX.inverted, undefined, undefined, INDEX.feature.danger, colors.red(-1 + offset)],
            [INDEX.inverted, undefined, INDEX.interact, INDEX.feature.danger, colors.red(-2 + offset)],
        ]

        return matrixMatch([inverted, active, interact, feature], matrix)
    },
    // 遮罩颜色
    maskColor() {
        return maskColors.base
    },
    // 分隔符颜色
    separateColor() {
        return colors.gray(-2)
    },
    // 受 size 影响
    fontSize({size}: any, offset = 0) {
        const matrix = [
            [undefined, fontSizes(offset)],
            [INDEX.size.small, fontSizes(-1 + offset)],
            [INDEX.size.large, fontSizes(1 + offset)],
        ]
        return matrixMatch([size], matrix)
    },
    lineHeight({size}: any, offset = 0) {
        return (size === undefined ? lineHeightValues() : (size === 1 ? lineHeightValues() : lineHeightValues(1))) + offset
    },
    weight({stressed}: any) {
        const matrix = [
            [undefined, fontWeights()],
            [INDEX.stressed, fontWeights(1)],
        ]
        return matrixMatch([stressed], matrix)
    },
    spacing({size}: any, offset = 0) {
        const matrix = [
            [undefined, spaceValues(offset)],
            [INDEX.size.small, spaceValues(-1 + offset)],
            [INDEX.size.large, spaceValues(1 + offset)],
        ]
        return matrixMatch([size], matrix)
    },
    // 其他
    lineWidth() {
        return 1
    },
    outlineWidth() {
        return 2
    },
    fontFamily() {
    },
    radius({}, offset = 0) {
        return borderRadius(offset)
    },
    zIndex({zIndex}: any) {
        const matrix = [
            [undefined, zIndexes(-1)],
            [INDEX.layer.fixed, zIndexes()],
            [INDEX.layer.modal, zIndexes(1)],
            [INDEX.layer.message, zIndexes(2)],
            [INDEX.layer.popover, zIndexes(3)],
            [INDEX.layer.picker, zIndexes(4)],
        ]
        return matrixMatch([zIndex], matrix)
    }
})


/***************
 * export
 **************/
export function pattern(primaryColor: string = PRIMARY_COLOR) {
    return createPattern(INDEX, valueRules(primaryColor))
}


export function px(value: number) {
    return new StyleSize(value, 'px')
}

export function rem(value: number = 0) {
    return new StyleSize(value, 'rem')
}

export function percent(value: number = 0) {
    return new StyleSize(value, 'percent')
}

export function em(value: number = 0) {
    return new StyleSize(value, 'em')
}

type flexRowProps = {
    gap: number,
    align: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

export const scen = {
    layout: {
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
    },
    size: {
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
            padding(value: number) {
                return rem(1)
            },
            gap(){
                return rem(1)
            },
            inner(level: number = 2) {
                return px(2)
            }
        },
    },
    color: {
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
                    return pattern().active().bgColor()
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
                    return pattern().interactable().inactive().color()
                },
                disabled() {
                    return pattern().inactive().color()
                },
            }
        },
        line: {
            border: {
                normal(inverted = false) {
                    return inverted ? 'none' : pattern().color()
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
    },
}

type TextType = 'text' | 'description' | 'auxiliary' | 'heading'

export function classname(name:string, ...status: any[]) {
    return name
}