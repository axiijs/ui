import {
    RenderContext,
    RxList,
    ToAllowFixedPropsType,
    ToPropsType,
    PropTypes,
    atom,
    onEnterKey,
    ModalContext, Atom, reactiveSize, reactivePosition, SizeObject, PositionObject,
} from "axii";


const SelectPropTypes = {
    value: PropTypes.atom<any>().default(() => atom(null)).isRequired,
    placeholder: PropTypes.atom<any>().default(() => atom('')),
    options: PropTypes.rxList<any>().default(() => new RxList([])).isRequired
}

export function Select(props: ToAllowFixedPropsType<typeof SelectPropTypes> , {createElement, createPortal, context, createStateFromRef}: RenderContext) {
    const {value, options, placeholder} = props as ToPropsType<typeof SelectPropTypes>

    const uniqueMatch = options.createUniqueMatch(false, value)

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
        backgroundColor: 'transparent',
        background: 'rgba(0,0,0,0.5)',
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

    const optionNodes = uniqueMatch.map((option: any, selected: Atom<boolean>) => {
        const focused = atom(false)
        const hovered = atom(false)
        const style = () => ({
            cursor: 'pointer',
            backgroundColor: focused() ? 'lightblue' : (hovered() ? 'lightgray' : 'white')
        })
        return (
            <div
                as="option"
                onClick={() => onSelect(option)}
                onkeydown={onEnterKey(() => onSelect(option))}
                onMouseEnter={() => hovered(true)}
                onMouseLeave={() => hovered(false)}
                onFocusIn={[() => focused(true), () => focusedOption(option)]}
                onFocusOut={[() => focused(false), () => focusedOption() === option && focusedOption(null)]}
                style={style}
                prop:focused={focused}
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

