import {atom, PropTypes, RenderContext, FixedCompatiblePropsType, PropsType, atomComputed, Atom, Component} from "axii";
import dayjs from 'dayjs'
import weekdayPlugin from 'dayjs/plugin/isoWeek'
import { Dayjs } from 'dayjs'
dayjs.extend(weekdayPlugin)

const CalendarPropTypes = {
    value: PropTypes.atom<Dayjs>().default(() => atom(dayjs(Date.now()))).isRequired,
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
    const { value } = props as PropsType<typeof CalendarPropTypes>

    const days: Atom<{year: number, month: number, date: number}[][]> = atomComputed(() => {
        const startDay = dayjs(value()).startOf('month')
        const endDay = dayjs(value()).endOf('month')
        console.log('recompute', value())


        const dates: DateType[] = Array(endDay.date()).fill(0).map((_, i) => ({
            year: value().year(),
            month: value().month(),
            date: i+1,
        }))
        // 往前补
        const startDayOfWeek = startDay.isoWeekday()
        if (startDayOfWeek > 1) {
            const lastMonth = dayjs(startDay).subtract(1, 'day')
            const lastDayOfLastMonth = lastMonth.date()
            for( let i = startDayOfWeek - 1; i > 0; i-- ) {
                dates.unshift({
                    year: lastMonth.year(),
                    month: lastMonth.month(),
                    date: lastDayOfLastMonth - (startDayOfWeek - i - 1),
                    isLastMonth: true
                })
            }
        }

        const endDayOfWeek  = endDay.isoWeekday()

        if (endDayOfWeek < 7) {
            const nextMonth = dayjs(endDay).add(1, 'day')
            for( let i = endDayOfWeek + 1; i < 8; i++) {
                dates.push({
                    year: nextMonth.year(),
                    month: nextMonth.month(),
                    date: i - endDayOfWeek,
                    isNextMonth: true
                })
            }
        }

        // 每 7 个一组
        const datesGroupByWeek = dates.reduce((result, current) => {
            const lastGroup =  result[result.length - 1]
            if (lastGroup.length === 7) {
                result.push([current])
            } else {
                lastGroup.push(current)
            }
            return result
        }, [[]] as {year: number, month: number, date: number}[][])

        console.log(datesGroupByWeek)
        return datesGroupByWeek
    })

    const lastMonth = () => {
        value(dayjs(value()).subtract(1, 'month'))
    }

    const nextMonth = () => {
        value(dayjs(value()).add(1, 'month'))
    }

    const lastYear = () => {
        value(dayjs(value()).subtract(1, 'year'))
    }

    const nextYear = () => {
        value(dayjs(value()).add(1, 'year'))
    }

    return (
        <div as={'root'}>
            <div as={'control'}>
                <div as={'leftControl'}>
                    <span as={'lastYear'} onClick={lastYear}>{'<<'}</span>
                    <span as={'lastMonth'} onClick={lastMonth}>{'<'}</span>
                </div>
                <span as={'displayValue'}>{() => value().format('YYYY-MM-DD')}</span>
                <div as={'rightControl'}>
                    <span as={'nextMonth'} onClick={nextMonth}>{'>'}</span>
                    <span as={'nextYear'} onClick={nextYear}>{'>>'}</span>
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
                {() => days().map(week => {
                    return (
                        <tr as={'week'}>
                            {week.map(date => (
                                <td as={'date'} prop:date={date}>
                                    <span as={'displayDate'} prop:date={date}>
                                    {date.date}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

Calendar.propTypes = CalendarPropTypes

