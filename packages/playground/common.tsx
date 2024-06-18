import {common as incCommon} from 'axii-ui-theme-inc/common.js'
import {common as falloutCommon} from "axii-ui-theme-fallout/common.js";


const themeToCommon: {[k:string]:any} = {
    inc: incCommon,
    fallout: falloutCommon
}

// 从 query 中获取 theme，默认是 inc
const search = new URLSearchParams(location.search)
const theme: keyof typeof themeToCommon = search.get('theme') || 'inc'

export const common = themeToCommon[theme]