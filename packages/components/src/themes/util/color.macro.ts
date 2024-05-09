import chroma from 'chroma-js'
import {InputColors} from "../pattern.js";

export function genColors(primaryColor:string = 'black'): InputColors {
    const blackScale = chroma.scale()
    return {
        black: [[
            blackScale(.7).hex(),
            blackScale(.75).hex(),
            blackScale(.8).hex(),
            blackScale(.85).hex(),
            blackScale(.9).hex(),
            blackScale(1).hex(),
        ], 4],
        gray: [[
            blackScale(0).hex(),
            blackScale(.05).hex(),
            blackScale(.1).hex(),
            blackScale(.2).hex(),
            blackScale(.3).hex(),
            blackScale(.4).hex(),
            blackScale(.5).hex(),
            blackScale(.6).hex(),
            blackScale(.7).hex(),
            blackScale(.8).hex(),
            blackScale(.9).hex(),
            blackScale(1).hex(),
        ], 5],
        primary: [[
            chroma(primaryColor).brighten(4).hex(),
            chroma(primaryColor).brighten(3).hex(),
            chroma(primaryColor).brighten(2).hex(),
            chroma(primaryColor).brighten(1).hex(),
            primaryColor,
            chroma(primaryColor).darken(1).hex(),
            chroma(primaryColor).darken(2).hex(),
            chroma(primaryColor).darken(3).hex(),
            chroma(primaryColor).darken(4).hex(),
        ], 4]
    }
}
