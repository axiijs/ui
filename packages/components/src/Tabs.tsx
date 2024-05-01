import {
    atom,
    atomComputed,
    createRxRef,
    createSelection,
    FixedCompatiblePropsType,
    PropsType,
    PropTypes,
    RenderContext,
    RxList
} from "axii";
import {colors, gaps} from "./style.js";


const TabPropTypes = {
    options: PropTypes.rxList<any>().default(() => new RxList([])).isRequired,
    current: PropTypes.atom<any>().default(() => atom<any>(null)).isRequired,
}

export function Tabs(props: FixedCompatiblePropsType<typeof TabPropTypes>, {createElement, createRef}: RenderContext) {
    const {options, current} = props as PropsType<typeof TabPropTypes>

    const optionsToPosRef = options.map((option) => {
        // CAUTION 一定要用 createRxRef，否则用 createRxRef 的时候，ref 第一次 attach 不会触发 style 计算。
        const ref = createRxRef()
        return {option, ref}
    }).indexBy('option')

    const rootRef = createRef()

    // TODO  find 没有收集 matchFn 中的 reactive，只收集了 list 里面的变化，所以不能用。
    // const currentWithPos = optionsWithPos.find(({option}) => option === current())
    const currentPosRef = atomComputed(() => optionsToPosRef.get(current())?.ref)
    const optionsMatch = createSelection(options, current)

    const indicatorStyle = () => {
        const rect = currentPosRef()?.current?.getBoundingClientRect()
        const rootRect = rootRef.current?.getBoundingClientRect()!

        console.log(111, currentPosRef()?.current)
        console.log(222, currentPosRef()?.current?.getBoundingClientRect())
        return {
            position:'absolute',
            bottom: 0,
            height:2,
            width: rect?.width||0,
            left: (rect&&rootRect) ? (rect.left - rootRect.left):0,
            transition: 'all 0.3s',
            backgroundColor: colors.primaryBlue,
        }
    }

    const tabsStyle = () => ({
        display: 'flex',
    })

    return (
        <div as="root" style={{position:'relative'}} ref={rootRef}>
            <div style={tabsStyle}>
                {optionsMatch.map(([tab, selected]) => {
                    const style = () => ({
                        padding: `${gaps.small}px ${gaps.medium}px`,
                        color: selected() ? 'red' : 'black',
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'red',
                        }
                    })

                    const ref = optionsToPosRef.get(tab)!.ref
                    return <div ref={ref} style={style} onClick={() => current(tab)}>{tab}</div>
                })}
            </div>
            <div as="indicator" style={indicatorStyle}></div>
        </div>
    )
}

Tabs.propTypes = TabPropTypes
