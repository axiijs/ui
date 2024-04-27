import {Component, createContext, isAtom, PropTypes, RenderContext, RxList, RxMap} from "axii";
import {assert, ensureArray} from "./util.js";


type FormProps = {
    name: string,
    // delegate 所有的 onChange 的 item
    onChange?: (values: any) => void
    onSubmit?: (values: any) => void
    onClear?: () => void
    onReset?: () => void
    values: RxMap<string, any>
    children:any
}

type FormContextValue = {
    name: string
    register: (name: string, instance: FormItemInstance, multiple?: boolean) => void
    unregister: (name: string, instance: FormItemInstance, multiple?: boolean) => void
    onChange: FormProps['onChange'],
    submit: () => void
    clear:() => void,
    reset: () => void
}

export const FormContext = createContext<FormContextValue>('Form')

// TODO reset 如何实现？？？

type FormItemInstance = {
    reset: () => void
    clear: () => void
    value: any
}


// TODO 如何支持 multiple form，好像要往上继承？？？
// TODO 如何支持多 value 的情况？？需要配置？？
export function Form({ name, children, onChange, onSubmit, onClear, onReset, values }: FormProps, {createElement, context}: RenderContext) {

    const instances: {[k: string]: FormItemInstance|FormItemInstance[]} = {}

    const register = (name: string, instance: FormItemInstance, multiple?: boolean) => {
        if(multiple )  {
            if (!values.get(name)) {
                values.set(name,new RxList([]))
            }
            if (!instances[name]) {
                instances[name] = []
            }
            values.get(name).push(instance.value)
            (instances[name] as Array<FormItemInstance>).push(instance)

        } else {
            values.set(name, instance.value)
            instances[name] = instance
        }
    }

    const unregister = (name: string, instance: FormItemInstance, multiple?: boolean) => {
        if (multiple) {
            const valuesList = values.get(name) as RxList<any>
            const valueIndex = valuesList.findIndex(v => v === instance.value)
            if (valueIndex() > -1) {
                valuesList.splice(valueIndex(), 1)
            }

            const index = (instances[name] as Array<FormItemInstance>).findIndex(i => i === instance)
            if (index > -1) {
                (instances[name] as Array<FormItemInstance>).splice(index, 1)
            }
        } else {
            values.delete(name)
            delete instances[name]
        }
    }

    const submit = () => {
        onSubmit?.(values)
    }

    const reset = () => {
        Object.values(instances).forEach((instance: FormItemInstance|FormItemInstance[]) => {
            if (Array.isArray(instance)) {
                instance.forEach(i => i.reset())
            } else {
                instance.reset()
            }
        })
        onReset?.()
    }

    const clear = () => {
        Object.values(instances).forEach((instance: FormItemInstance|FormItemInstance[]) => {
            if (Array.isArray(instance)) {
                instance.forEach(i => i.clear())
            } else {
                instance.clear()
            }
        })

        onClear?.()
    }

    context.set(FormContext, {name, register, unregister, onChange, submit, reset, clear} as FormContextValue)
    return children
}

Form.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.rxMap<string, any>(),
    children: PropTypes.any.isRequired,
    onChange: PropTypes.function,
    onSubmit: PropTypes.function,
    onClear: PropTypes.function,
    onReset: PropTypes.function,
}


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
