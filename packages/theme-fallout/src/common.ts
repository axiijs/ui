import {ColorSchema, createStyleSystem, createRange} from "axii-ui-theme-common";
import {StyleSize} from "axii";


const colorSchema: ColorSchema = {
    line: '#ffd52c',
    lineInverted:'#111',
    error: '#c72d04',
    success: '#52C41A',
    warning: '#ff5c00',
    info: '#ffd52c',
    process: '#FFFFFF',
}

const radius = createRange([new StyleSize(0, 'px')], 0)

const shadows = createRange<string>(
    [
        '0 0px 0px 0 transparent',
    ],
    0
)

const weights = createRange(
    [
        100, 200, 300, 400, 500, 600, 700, 800, 900
    ],
    3
)

// 外部也可以使用
export const common = createStyleSystem(
    colorSchema,
    false,
    new StyleSize(4, 'px'),
    radius,
    shadows,
    weights
)