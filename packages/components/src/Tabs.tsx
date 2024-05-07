import {atom, createSelection, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext, RxList} from "axii";


const TabPropTypes = {
    options: PropTypes.rxList<any>().default(() => new RxList([])).isRequired,
    current: PropTypes.atom<any>().default(() => atom<any>(null)).isRequired,
}

export function Tabs(props: FixedCompatiblePropsType<typeof TabPropTypes>, {createElement, createRef}: RenderContext) {
    const {options, current} = props as PropsType<typeof TabPropTypes>

    const optionsMatch = createSelection(options, current)

    return (
        <div as="root" style={{position: 'relative'}}>
            <div as="head"></div>
            <div as="tabs" >
                {optionsMatch.map(([tab, selected]) => {
                    return <div as="tab" prop:tab={tab} prop:selected={selected} onClick={() => current(tab)}>{tab}</div>
                })}
            </div>
            <div as="foot"></div>
        </div>
    )
}

Tabs.propTypes = TabPropTypes
