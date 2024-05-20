import {createRange, matrixMatch} from './util/util.js'
import {INDEX} from './util/case.js'


export type InputColors = {
    black: [string[], number]
    gray: [string[], number]
    primary: [string[], number]
}

export const valueRules = (inputColors: InputColors) => {
    const colors = {
        black: createRange(inputColors.black[0], inputColors.black[1]),
        gray: createRange(inputColors.gray[0], inputColors.gray[1]),
        primary: createRange(inputColors.primary[0], inputColors.primary[1]),
    }

    return ({
        // 颜色类，受交互状态、反色等规则影响。
        // 字体颜色
        color({interactable, stress, inverted, active, interact, feature}: any, offset = 0) {
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
                [INDEX.interactable, undefined, INDEX.inverted, INDEX.active.active, undefined, undefined, colors.gray(-6)], // 反色
                [INDEX.interactable, undefined, undefined, undefined, undefined, undefined, colors.black(offset)], // 可交互时，默认颜色是正色
                [INDEX.interactable, undefined, undefined, INDEX.active.active, undefined, undefined, colors.primary(offset)], // 可交互并且激活时，显示的是主色。
                [INDEX.interactable, undefined, undefined, INDEX.active.inactive, undefined, undefined, colors.gray()], // 可交互，但未激活是灰色
                [INDEX.interactable, undefined, undefined, INDEX.active.active, INDEX.interact, undefined, colors.primary(-1 + offset)], // 可交互，激活，正在交互时，主色变浅一点。
                // 根据不同的 feature 展示不同的颜色
                // FIXME feature 颜色算设么
                [INDEX.interactable, undefined, undefined, undefined, undefined, INDEX.feature.danger, colors.primary(-1 + offset)],
                [INDEX.interactable, undefined, undefined, undefined, INDEX.interact, INDEX.feature.danger, colors.primary(-2 + offset)],
            ]

            return matrixMatch([interactable, stress, inverted, active, interact, feature], matrix)
        },
        // 背景颜色
        bgColor({inverted, active, interact, feature}: any, offset = 0) {
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
                [undefined, INDEX.active.inactive, undefined, undefined, colors.gray(-4)],
                [INDEX.inverted, undefined, undefined, undefined, colors.primary(offset)],
                [INDEX.inverted, INDEX.active.inactive, undefined, undefined, colors.primary(-3 + offset)],
                [INDEX.inverted, INDEX.active.active, undefined, undefined, colors.primary(offset)],
                [INDEX.inverted, undefined, INDEX.interact, undefined, colors.primary(-1 + offset)],
                [INDEX.inverted, INDEX.active.active, INDEX.interact, undefined, colors.primary(-1 + offset)],
                // FIXME 根据不同的 feature 展示不同的颜色
                [INDEX.inverted, undefined, undefined, INDEX.feature.danger, colors.primary(-1 + offset)],
                [INDEX.inverted, undefined, INDEX.interact, INDEX.feature.danger, colors.primary(-2 + offset)],
            ]

            return matrixMatch([inverted, active, interact, feature], matrix)
        },
        borderColor() {
            return colors.gray(-2)
        },
        // 分隔符颜色
        separateColor() {
            return colors.gray(-2)
        },
    })
}

