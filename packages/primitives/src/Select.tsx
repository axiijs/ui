import {
    RenderContext,
    RxList,
    ToAllowFixedPropsType,
    ToPropsType,
    PropTypes,
    atom,
    onEnterKey,
    ModalContext, Atom, reactiveSize, reactivePosition, SizeObject, PositionObject, createSelection,
} from "axii";


const SelectPropTypes = {
    value: PropTypes.atom<any>().default(() => atom(null)).isRequired,
    placeholder: PropTypes.atom<any>().default(() => atom('')),
    options: PropTypes.rxList<any>().default(() => new RxList([])).isRequired
}

export function Select(props: ToAllowFixedPropsType<typeof SelectPropTypes> , {createElement, createPortal, context, createStateFromRef}: RenderContext) {
    const {value, options, placeholder} = props as ToPropsType<typeof SelectPropTypes>

    const optionsWithSelected = createSelection(options, value)

    const optionVisible = atom(false)

    const dropdowmViewport = context.get(ModalContext)?.viewport || window
    const dropdowmContainer = context.get(ModalContext)?.container || document.body
    const viewportSize = createStateFromRef(reactiveSize, undefined, dropdowmViewport)

    const dropdownBackgroundStyle = () => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: viewportSize()?.width,
        height: viewportSize()?.height,
    })

    // TODO position 改成 manual
    const rootSize = createStateFromRef<SizeObject>(reactiveSize)
    const rootPosition = createStateFromRef<PositionObject>(reactivePosition, {type:'interval', duration:100})
    const optionsStyle = (() => {
        // rootRectRef.sync!()
        return {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: 10,
            top: rootPosition()?.top! + rootSize()?.height! + 10,
            left: rootPosition()?.left,
            backgroundColor: 'white',
            border: '1px solid #ccc',
        }
    })

    const onSelect = (e: any) => {
        value(e)
        optionVisible(false)
    }

    const focusedOption = atom(null)

    const optionNodes = optionsWithSelected.map(([option, selected ]:[any,Atom<boolean> ]) => {
        const focused = atom(false)
        const optionStyle = () => ({
            cursor: 'pointer',
        })
        return (
            <div
                as="option"
                onClick={() => onSelect(option)}
                onkeydown={onEnterKey(() => onSelect(option))}
                onFocusIn={[() => focused(true), () => focusedOption(option)]}
                onFocusOut={[() => focused(false), () => focusedOption() === option && focusedOption(null)]}
                style={optionStyle}
                prop:value={option}
                prop:selected={selected}
                prop:optionVisible={optionVisible}
            >
                {option}
            </div>
        )
    })

    return (
        <div as="root" ref={[rootSize.ref, rootPosition.ref]}>
            <div as="displayValue" prop:value={value} prop:placeholder={placeholder} prop:optionVisible={optionVisible} onClick={() => optionVisible(true)}>{() => value() ?? placeholder()}</div>
            {
                () => optionVisible() ? createPortal((
                    <div as="dropdownBackground" style={dropdownBackgroundStyle()}>
                        <div as="options" style={optionsStyle} prop:value={options}>
                            {optionNodes}
                        </div>
                    </div>
                ), dropdowmContainer) : null
            }
        </div>
    )
}

Select.propTypes = SelectPropTypes

