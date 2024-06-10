import {
    atom,
    Atom, computed,
    Component,
    createSelection,
    FixedCompatiblePropsType,
    PropsType,
    PropTypes,
    RenderContext,
    RxList
} from "axii";
import dayjs from 'dayjs'
import weekdayPlugin from 'dayjs/plugin/isoWeek'
import Left from 'axii-icon/Left'
import Right from 'axii-icon/Right'
import DoubleLeft from 'axii-icon/DoubleLeft'
import DoubleRight from 'axii-icon/DoubleRight'

dayjs.extend(weekdayPlugin)

const CalendarPropTypes = {
    value: PropTypes.atom<string>().default(() => atom(dayjs(Date.now()).format('YYYY-MM-DD'))).isRequired,
    format: PropTypes.atom<string>().default(() => atom('YYYY-MM-DD')),
}

// TODO locale
//  startDayOfWeek
export type DateType = {
    year: number,
    month: number,
    date: number,
    isLastMonth?: boolean,
    isNextMonth?: boolean,
}

export const Calendar: Component = function(props: FixedCompatiblePropsType<typeof CalendarPropTypes> , {createElement}: RenderContext) {
    const { value, format } = props as PropsType<typeof CalendarPropTypes>
    const month = atom(dayjs(value() || Date.now()).month())
    const year = atom(dayjs(value() || Date.now()).year())

    const getDisplayDate = () => {
        return dayjs(`${year()}-${month()+1}`)
    }

    const dates = new RxList(() => {
        const startDay = getDisplayDate().startOf('month')
        const endDay = getDisplayDate().endOf('month')

        const dateData: string[] = Array(endDay.date()).fill(0).map((_, i) => startDay.add(i, 'day').format(format()))
        // 往前补
        const startDayOfWeek = startDay.isoWeekday()
        if (startDayOfWeek > 1) {
            for( let i = 0; i < startDayOfWeek - 1;  i++ ) {
                dateData.unshift(startDay.subtract(i+1, 'day').format(format()))
            }
        }

        const endDayOfWeek  = endDay.isoWeekday()

        if (endDayOfWeek < 7) {
            for( let i = 0; i < (7-endDayOfWeek); i++) {
                dateData.push(endDay.add(i+1, 'day').format(format()))
            }
        }

        return dateData
    })

    const lastMonth = () => {
        month(getDisplayDate().subtract(1, 'month').month())
    }

    const nextMonth = () => {
        month(getDisplayDate().add(1, 'month').month())
    }

    const lastYear = () => {
        year(getDisplayDate().subtract(1, 'year').year())
    }

    const nextYear = () => {
        year(getDisplayDate().add(1, 'year').year())
    }

    const displayData = createSelection(dates, value)

    return (
        <div as={'root'}>
            <div as={'control'}>
                <div as={'leftControl'}>
                    <span as={'lastYear'} onClick={lastYear}>
                        <DoubleLeft />
                    </span>
                    <span as={'lastMonth'} onClick={lastMonth}>
                        <Left />
                    </span>
                </div>
                <span as={'displayValue'}>{() => `${year()}-${month()+1}`}</span>
                <div as={'rightControl'}>
                    <span as={'nextMonth'} onClick={nextMonth}>
                        <Right />
                    </span>
                    <span as={'nextYear'} onClick={nextYear}>
                        <DoubleRight />
                    </span>
                </div>
            </div>
            <table as={'table'}>
                <thead as={'head'}>
                    <tr>
                        {['一', '二', '三', '四', '五', '六', '日'].map(index => (
                            <th>
                                {index}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody as={'body'}>
                {() => Array(displayData.length()/7).fill(0).map((_, i) => {
                    return (
                        <tr>
                            {Array(7).fill(0).map((_, j) => {
                                const [date, selected] = displayData.at(i*7+j) as [string, Atom<boolean>]
                                const dataShort = dayjs(date).date()
                                return (
                                    <td as='date'>
                                        <div
                                            onClick={() => value(date)}
                                            as={'displayDate'}
                                            prop:selected={selected}
                                            prop:dateShort={dataShort}
                                            prop:date={date}
                                            prop:year={year}
                                            prop:month={computed(() => month() + 1)}
                                        >
                                            {dataShort}
                                        </div>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

Calendar.propTypes = CalendarPropTypes

