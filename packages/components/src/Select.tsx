import {
    atom,
    Atom,
    Component,
    createSelection,
    FixedCompatiblePropsType,
    ModalContext,
    onEnterKey,
    PropsType,
    PropTypes,
    reactiveSize,
    RenderContext,
    RxList, withStopPropagation,
} from "axii";


const SelectPropTypes = {
    value: PropTypes.atom<any>().default(() => atom(null)).isRequired,
    placeholder: PropTypes.atom<any>().default(() => atom('')),
    options: PropTypes.rxList<any>().default(() => new RxList([])).isRequired
}

export const Select:Component = function Select(props: FixedCompatiblePropsType<typeof SelectPropTypes> , {createElement, createPortal, createRef, context, createStateFromRef}: RenderContext) {
    const {value, options, placeholder} = props as PropsType<typeof SelectPropTypes>

    const optionsWithSelected = createSelection(options, value)

    const optionVisible = atom(false)

    const dropdowmViewport = context.get(ModalContext)?.viewport || window
    const dropdowmContainer = context.get(ModalContext)?.container || document.body
    const viewportSize = createStateFromRef(reactiveSize, dropdowmViewport)

    const dropdownBackgroundStyle = () => ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    })

    const rootRef = createRef()
    const rootPosition = atom.lazy(() => rootRef.current.getBoundingClientRect())
    const optionsStyle = (() => {
        // rootRectRef.sync!()
        return {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            top: rootPosition()?.bottom!,
            maxHeight: viewportSize()?.height! - rootPosition()?.bottom!,
            left: rootPosition()?.left,
        }
    })

    const onSelect = (e: any) => {
        value(e)
        optionVisible(false)
    }

    const focusedOption = atom(null)

    const optionNodes = optionsWithSelected.map(([option, selected ]:[any,Atom<boolean> ]) => {
        const focused = atom(false)

        return (
            <div
                as="option"
                onClick={() => onSelect(option)}
                onkeydown={onEnterKey(() => onSelect(option))}
                onFocusIn={[() => focused(true), () => focusedOption(option)]}
                onFocusOut={[() => focused(false), () => focusedOption() === option && focusedOption(null)]}
                prop:value={option}
                prop:selected={selected}
                prop:optionVisible={optionVisible}
            >
                <div
                    as="displayOption"
                    prop:value={option}
                    prop:selected={selected}
                    prop:optionVisible={optionVisible}
                >
                    {option}
                </div>
            </div>
        )
    })

    return (
        <div as="root" ref={[rootRef]} onClick={() => optionVisible(true)}>
            <div as="displayValueContainer" >
                <div
                    as="displayValue"
                    prop:value={value}
                    prop:placeholder={placeholder}
                    prop:optionVisible={optionVisible}
                >
                    {() => value() ?? placeholder()}
                </div>
            </div>
            {
                createPortal(() => optionVisible() ? (
                    <div as="dropdownBackground" style={dropdownBackgroundStyle} onClick={()=>optionVisible(false)} onScrollCapture={withStopPropagation(() => {})} >
                        <div as="options" style={optionsStyle} prop:value={options}>
                            {optionNodes}
                        </div>
                    </div>)
                : null, dropdowmContainer)
            }
        </div>
    )
}

Select.propTypes = SelectPropTypes
