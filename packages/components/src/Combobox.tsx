import {
    atom,
    Atom,
    Component,
    createSelection,
    FixedCompatiblePropsType,
    ModalContext,
    onEnterKey,
    RectObject,
    PropsType,
    PropTypes,
    RenderContext,
    RxDOMSize,
    RxList,
    SizeObject,
    withStopPropagation,
} from "axii";
import {Input} from "./Input.js";
import LoadingFour from "axii-icon-park/LoadingFour.js";


const ComboboxPropTypes = {
    search: PropTypes.atom<string>().default(() => atom('')),
    value: PropTypes.atom<any>().default(() => atom(null)).isRequired,
    placeholder: PropTypes.atom<any>().default(() => atom('')),
    options: PropTypes.rxList<any>().default(() => new RxList([])).isRequired
}

export const Combobox:Component = function Combobox(props: FixedCompatiblePropsType<typeof ComboboxPropTypes> , {createElement, createPortal, createRef, context}: RenderContext) {
    const {value, options, placeholder, search} = props as PropsType<typeof ComboboxPropTypes>

    const optionsWithSelected = createSelection(options, value)

    const optionVisible = atom(false)

    const dropdowmViewport = context.get(ModalContext)?.viewport || window
    const dropdowmContainer = context.get(ModalContext)?.container || document.body
    const viewportSize = atom<SizeObject|null>(null);
    (new RxDOMSize(viewportSize)).ref(dropdowmViewport())

    const dropdownBackgroundStyle = () => ({
        position: 'fixed',
        top: 0,
        left: 0,
        right:0,
        bottom:0,
    })

    // TODO position 改成 manual
    const rootRef = createRef()
    const rootPosition = atom.lazy(() => rootRef.current.getBoundingClientRect() as RectObject)
    const optionsStyle = (() => {
        // rootRectRef.sync!()
        return {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            top: rootPosition()?.bottom!,
            left: rootPosition()?.left,
            maxHeight: viewportSize()?.height! - rootPosition()?.bottom!-20,
            // maxHeight: `${viewportSize()?.height! - rootPosition()?.bottom!-20}px`,
            // maxHeight: '300px',
            overflow: 'auto',
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
                {option}
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
                    <div as="dropdownBackground" style={dropdownBackgroundStyle} onClick={() => optionVisible(false)} onScrollCapture={withStopPropagation(() => {})}>
                        <div as="optionsContainer" style={optionsStyle} prop:value={options} onClick={withStopPropagation(() => {})}>
                            <div as={'searchContainer'}>
                                <Input as={"search"} value={search}/>
                            </div>
                            {() => options.asyncStatus?.() ?
                                <div as={'loadingContainer'}>
                                    <span as={'loading'}><LoadingFour /></span>
                                </div>
                                 :
                                <div as={'options'}>
                                    {optionNodes}
                                </div>
                            }
                        </div>
                    </div>
                ) : null, dropdowmContainer)
            }
        </div>
    )
}

Combobox.propTypes = ComboboxPropTypes

