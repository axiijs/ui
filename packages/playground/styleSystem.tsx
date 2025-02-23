import {styleSystem as incCommon} from 'axii-ui-theme-inc/common.js'
import {styleSystem as falloutCommon} from "axii-ui-theme-fallout/common.js";


const system: {[k:string]:any} = {
    inc: incCommon,
    fallout: falloutCommon
}

// 从 query 中获取 theme，默认是 inc
const search = new URLSearchParams(location.search)
const theme: keyof typeof system = search.get('theme') || 'inc'

export const styleSystem = system[theme]