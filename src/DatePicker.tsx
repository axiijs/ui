import {
    atom,
    Component,
    FixedCompatiblePropsType,
    ModalContext,
    PositionObject,
    PropsType,
    PropTypes,
    RenderContext,
    withStopPropagation
} from "axii";
import {Calendar} from "./Calendar.js";
import CalendarIcon from 'axii-icon-park/Calendar.js'

const DatePickerPropTypes = {
    value: PropTypes.atom<boolean>().default(() => atom(false)).isRequired,
    placeholder: PropTypes.atom<any>().default(() => atom('Click to pick a date')),

}

export const DatePicker:Component = function Combobox(props: FixedCompatiblePropsType<typeof DatePickerPropTypes> , {createElement, createRef, createPortal, context, createStateFromRef}: RenderContext) {
    const {value, placeholder} = props as PropsType<typeof DatePickerPropTypes>


    const dropdownVisible = atom(false)

    const dropdowmContainer = context.get(ModalContext)?.container || document.body

    const dropdownBackgroundStyle = () => ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    })

    const rootRef = createRef()
    const rootPosition = atom.lazy(() => rootRef.current.getBoundingClientRect() as PositionObject)
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
            ref={[rootRef]}
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
                createPortal(() => dropdownVisible() ? (
                    <div as="dropdownBackground" style={dropdownBackgroundStyle} onClick={() => dropdownVisible(false)} onscrollCapature={withStopPropagation(()=>{})}>
                        <div as="calendarContainer" style={optionsStyle} onClick={withStopPropagation(() => {})}>
                            <Calendar as={'main'} value={value}/>
                        </div>
                    </div>
                ): null, dropdowmContainer)
            }
        </div>
    )
}

DatePicker.propTypes = DatePickerPropTypes

