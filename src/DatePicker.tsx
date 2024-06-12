import {
    atom,
    Component,
    createReactivePosition,
    FixedCompatiblePropsType,
    ModalContext,
    PositionObject,
    PropsType,
    PropTypes,
    reactiveSize,
    RenderContext,
    withStopPropagation
} from "axii";
import {Calendar} from "./Calendar.js";
import CalendarIcon from 'axii-icon-park/Calendar'

const DatePickerPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
    placeholder: PropTypes.atom<any>().default(() => atom('Click to pick a date')),

}

export const DatePicker:Component = function Combobox(props: FixedCompatiblePropsType<typeof DatePickerPropTypes> , {createElement, createPortal, context, createStateFromRef}: RenderContext) {
    const {value, placeholder} = props as PropsType<typeof DatePickerPropTypes>


    const dropdownVisible = atom(false)

    const dropdowmViewport = context.get(ModalContext)?.viewport || window
    const dropdowmContainer = context.get(ModalContext)?.container || document.body
    const viewportSize = createStateFromRef(reactiveSize, dropdowmViewport)

    const dropdownBackgroundStyle = () => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: viewportSize()?.width,
        height: viewportSize()?.height,
    })

    // TODO position 改成 manual
    const rootPosition = createStateFromRef<PositionObject>(createReactivePosition({type:'interval', duration:100}) )
    const optionsStyle = (() => {
        // rootRectRef.sync!()
        return {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            top: rootPosition()?.bottom!,
            left: rootPosition()?.left,
        }
    })


    return (
        <div
            as="root"
            ref={[rootPosition.ref]}
            onClick={() => dropdownVisible(true)}
        >
            <div as="displayValueContainer" >
                <span as={'displayValueIcon'}><CalendarIcon /></span>
                <span
                    as="displayValue"
                    prop:value={value}
                    prop:placeholder={placeholder}
                >
                    {() => value() || placeholder()}
                </span>
            </div>
            {
                () => dropdownVisible() ? createPortal((
                    <div as="dropdownBackground" style={dropdownBackgroundStyle()} onClick={() => dropdownVisible(false)}>
                        <div as="calendarContainer" style={optionsStyle} onClick={withStopPropagation(() => {})}>
                            <Calendar as={'main'} value={value}/>
                        </div>
                    </div>
                ), dropdowmContainer) : null
            }
        </div>
    )
}

DatePicker.propTypes = DatePickerPropTypes

