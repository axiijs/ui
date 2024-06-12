
export function invariant(condition: any, format?: string, a?:any, b?:any, c?:any, d?:any, e?:any, f?:any) {
    if (format === undefined) {
        throw new Error('invariant requires an error message argument');
    }

    if (!condition) {
        debugger
        let error;
        if (format === undefined) {
            error = new Error(
                'Minified exception occurred; use the non-minified dev environment ' +
                'for the full error message and additional helpful warnings.'
            );
        } else {
            let args = [a, b, c, d, e, f];
            let argIndex = 0;
            error = new Error(
                format.replace(/%s/g, function() { return args[argIndex++]; })
            );
            error.name = 'Invariant Violation';
        }

        // @ts-ignore
        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
    }
}

/**
 * 用法
 * this.ruleName().ruleName2().xxxValue()
 * 见 AXII component pattern。
 */

// type FlattenKeys<T> = keyof NestedObject<T>;
export type FlattenKeys<T> = {
    [K in keyof T]: K | (T[K] extends object ? keyof T[K] : never);
}[keyof T];

export type ValueRules = {
    [key: string]: (arg:{[key:string]:any}, offset:number) => any
}

export type Index = {
    [key: string]: number | {[key:string]: number}
}

export type ScenI<I extends Index, V extends ValueRules> = {
    [i in FlattenKeys<I>]: (arg?: any) => Scen<I, V>;
}

export type ScenV<V extends ValueRules> = {
    [i in keyof V]: (offset?: number) => any;
}

export type Scen<I extends Index, V extends ValueRules> = ScenI<I, V> & ScenV<V>

export function createPattern<I extends Index, V extends ValueRules>(index: I, values: V): Scen<I,V> {
    const scen: {[k:string] : (arg:any) => any} = {}

    const rules: {[k:string]:any} = {}

    // 获取具体值的函数
    Object.keys(values).forEach((name) => {
        scen[name] = (...argv) => {
            return values[name](rules, ...argv)
        }
    })

    // 构建尝尽过的函数
    Object.entries(index).forEach(([ruleName, ruleValues]) => {
        invariant(!Object.keys(values).some((name ) => name === ruleName), `${ruleName} is a value name` )
        rules[ruleName] = undefined
        if (typeof ruleValues === 'object') {
            Object.entries(ruleValues).forEach(([subKey, subValue]) => {
                scen[subKey] = () => {
                    rules[ruleName] = subValue
                    return scen
                }
            })
        } else {
            scen[ruleName] = () => {
                rules[ruleName] = ruleValues
                return scen
            }
        }
    })

    return scen as Scen<I, V>
}

export function createRange(values: any[], baseIndex: number) {
    return function getValue(offset = 0) {
        const index = baseIndex + offset
        const range = [0, values.length -1]
        return values[index < range[0] ? 0 : (index > range[1] ? range[1] : index)]
    }
}

type ConditionValues = any[]
type ValueMatrix = any[][]
// 这里有个 fallback，如果没有完全 match，那么就选 match 最多的哪一个
export function matrixMatch(conditionValues: ConditionValues, matrix: ValueMatrix) {
    let match: { exactMatch: number, result: any } | undefined
    matrix.forEach(conditionValuesInMatrix => {
        let exactMatch = 0
        const passed = conditionValues.every((conditionValue, i) => {
            if (conditionValuesInMatrix[i] === conditionValue) exactMatch += 1
            return conditionValuesInMatrix[i] === undefined || conditionValuesInMatrix[i] === conditionValue
        })

        if (passed && (!match || match.exactMatch < exactMatch)) {
            match = { exactMatch, result: conditionValuesInMatrix[conditionValuesInMatrix.length -1] }
        }
    })

    invariant(match, `rule not exist, condition: ${conditionValues}`)
    return match!.result
}
//
// export function addAlpha(color, opacity) {
//     // coerce values so ti is between 0 and 1.
//     const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
//     return color + _opacity.toString(16).toUpperCase();
// }