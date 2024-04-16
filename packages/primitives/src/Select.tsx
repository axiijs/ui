import {
    RenderContext,
    RxList,
    ToAllowFixedPropsType,
    ToPropsType,
    PropTypes,
    atom,
    onEnterKey,
    ModalContext, Atom,
} from "axii";


const SelectPropTypes = {
    value: PropTypes.atom<any>().default(() => atom(null)).isRequired,
    placeholder: PropTypes.atom<any>().default(() => atom('')),
    options: PropTypes.rxList<any>().default(() => new RxList([])).isRequired
}

export function Select(props: ToAllowFixedPropsType<typeof SelectPropTypes> , {createElement, createPortal, context, createRxRectRef}: RenderContext) {
    const {value, options, placeholder} = props as ToPropsType<typeof SelectPropTypes>

    const uniqueMatch = options.createUniqueMatch(false, value)

    const optionVisible = atom(false)

    const dropdowmViewport = context.get(ModalContext)?.viewport || window
    const dropdowmContainer = context.get(ModalContext)?.container || document.body
    const viewportRectRef = createRxRectRef({size:true, target:dropdowmViewport})

    const dropdownBackgroundStyle = () => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: viewportRectRef.current?.width,
        height: viewportRectRef.current?.height,
        backgroundColor: 'transparent',
    })

    // TODO position 改成 manual
    const rootRectRef = createRxRectRef({size: true, position: {type:'interval', duration:100}})
    const optionsStyle = (() => {
        // rootRectRef.sync!()
        return {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: 10,
            top: rootRectRef.current?.top! + rootRectRef.current?.height! + 10,
            left: rootRectRef.current?.left,
            backgroundColor: 'white',
            border: '1px solid #ccc',
        }
    })

    const onSelect = (e: any) => {
        value(e)
        optionVisible(false)
    }

    return (
        <div as="root" rectRef={rootRectRef}>
            <div as="displayValue" prop:value={value} prop:placeholder={placeholder} prop:optionVisible={optionVisible} onClick={() => optionVisible(true)}>{() => value() ?? placeholder()}</div>
            {
                () => optionVisible() ? createPortal((
                    <div as="dropdownBackground" style={dropdownBackgroundStyle()}>
                        <div as="options" style={optionsStyle} prop:value={options}>
                            {uniqueMatch.map((option: any, selected: Atom<boolean>) => (
                                <SelectItem as="option" value={option} onSelect={onSelect} selected={selected}>{option}</SelectItem>
                            ))}
                        </div>
                    </div>
                ), dropdowmContainer) : null
            }
        </div>
    )
}

Select.propTypes = SelectPropTypes


type SelectItemProps = {
    value: any,
    onSelect: (value: any) => void,
    selected: Atom<boolean>
    children?: any
}

export function SelectItem({value, onSelect, selected, children}: SelectItemProps, {createElement}: RenderContext) {
    return <div
        as="item"
        onClick={() => onSelect(value)}
        onkeydown={onEnterKey(() => onSelect(value))}
        prop:value={value}
        prop:selected={selected}
    >
        <span>
            {children}
        </span>
        <span>{() => selected() ? 'selected': ''}</span>
    </div>
}
