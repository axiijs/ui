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
} from './util/basic.js';
import {matrixMatch} from './util/util.js'
import {INDEX} from './util/case.js'
export const valueRules = (primaryColor: string) => ({
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
            [undefined, undefined, undefined, undefined, colors.gray(-6)],
            [undefined, INDEX.active.inactive, undefined, undefined, colors.gray(-3)],
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
    borderColor() {
        return colors.gray(-2)
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

