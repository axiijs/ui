import {Component, isAtom, PropTypes, RenderContext, RxList, RxMap} from "axii";
import {assert, ensureArray} from "./util.js";
import {FormContext, FormContextValue} from "axii";

type CreateFormItemConfigure = {
    // TODO 是否要支持多 value 的情况？？需要配置？？
    multipleValueProperties?: string[]
    changeEvents?: string[]
    reset?: (value: any, defaultValue: () => any) => any
    clear?: (value: any) => any
}

type FormItemProps = {
    name: string
    label?: any
    defaultValue: () => any
    required?: boolean,
    [k: string]: any
}


function combineOnChangeEvents(onChange: FormContextValue['onChange'], events: CreateFormItemConfigure['changeEvents'], props: {[k:string]:any} ) {
    const changeEvents = events || ['onChange']
    changeEvents.forEach(event => {
        props[event] = ensureArray(props[event]||[]).concat(onChange)
    })
    return props
}




const defaultReset = (value: any, defaultValue: FormItemProps["defaultValue"]) => {
    if (isAtom(value)) {
        value(defaultValue())
    } else if(value instanceof RxList) {
        value.splice(0, value.length(), ...defaultValue())
    } else if(value instanceof RxMap) {
        value.clear()
        const newValue = defaultValue()
        if (typeof newValue === 'object') {
            Object.keys(newValue).forEach(key => value.set(key, newValue[key]))
        } else if (Array.isArray(newValue)) {
            newValue.forEach((v, i) => value.set(i, v))
        }
    }
}

const defaultClear = (value: any) => {
    if (isAtom(value)) {
        value(null)
    } else if(value instanceof RxList) {
        value.splice(0, value.length())
    } else if(value instanceof RxMap) {
        value.clear()
    }
}

export function createFormItem(Control: Component, config: CreateFormItemConfigure = {}) {

    function FormItem({name, label, defaultValue, required, multiple, value, ...controlProps}: FormItemProps, {createElement, context, useEffect}: RenderContext) {
        const formContext = context.get(FormContext) as FormContextValue
        if (!formContext) {
            throw new Error('FormItem should be used in Form')
        }

        const {register, unregister, onChange} = formContext

        const reset = () => config.reset? config.reset(value, defaultValue) : defaultReset(value, defaultValue)
        const clear = () => config.clear? config.clear(value) : defaultClear(value)

        const instance = {
            value,
            reset,
            clear,
        }

        useEffect(() => {
            // 注册之前先 reset 成 defaultValue
            reset()
            register(name, instance, multiple)
            return () => {
                unregister(name, instance, multiple)
            }
        })

        combineOnChangeEvents(onChange, config.changeEvents, controlProps)

        return <div as='root'>
            <div as='labelContainer'>
                <label as='label'>{label}</label>
                {() => required ? <span as='labelRequired'>*</span> : null}
            </div>
            <Control as='control' {...controlProps} value={value} />
        </div>
    }

    FormItem.propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.any,
        defaultValue: PropTypes.function,
        required: PropTypes.bool,
        ...Control.propTypes
    }

    return FormItem
}


function combineProps(originProps: {[k:string]:any}, propsToAttach: {[k:string]:any}) {
    const output = {...originProps}
    Object.keys(propsToAttach).forEach(key => {
        if (key.startsWith('on') || key === 'ref' || /^$[0-9a-zA-Z_]+:on.+/.test(key)) {
            if (key in output) {
                output[key] = ensureArray(output[key]).concat(propsToAttach[key])
            } else {
                output[key] = propsToAttach[key]
            }
        } else if(!output[key]) {
            output[key] = propsToAttach[key]
        } else {
            assert(false, `key ${key} already exists in props`)
        }
    })
    return output
}

type FormControlType = 'submit' | 'reset' | 'clear'

export function createFormControl(Control: Component, type: FormControlType) {
    function FormControl(props: any, {createElement, context}: RenderContext) {
        const formContext = context.get(FormContext) as FormContextValue
        if (!formContext) {
            throw new Error('FormControl should be used in Form')
        }

        const {submit, clear, reset} = formContext

        const onClick = () => {
            if (type === 'submit') {
                submit()
            } else if (type === 'clear') {
                clear()
            } else if (type === 'reset') {
                reset()
            }
        }

        const propsToAttach = {...combineProps(props, {'$main:onClick': onClick})}
        return <Control {...propsToAttach}/>
    }

    FormControl.propTypes = Control.propTypes

    return FormControl
}
