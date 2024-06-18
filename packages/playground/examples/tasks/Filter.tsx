import {
    atom,
    Component,
    createReactivePosition,
    FixedCompatiblePropsType,
    PropsType,
    PropTypes,
    RenderContext, RxList
} from "axii";
import {Dropdown} from 'axii-ui'
import { common } from '../../common.js'
import Search from 'axii-icon-park/Search.js'

const FilterPropTypes = {
    label: PropTypes.any.isRequired,
    options: PropTypes.rxList<any>().default(() => new RxList([])),
    search: PropTypes.atom<string>().default(() => atom('')),
}


export const Filter: Component = function (props: FixedCompatiblePropsType<typeof FilterPropTypes>, {createElement, createStateFromRef}:RenderContext) {
    const {label, search, options} = props as PropsType<typeof FilterPropTypes>

    const dropdownVisible = atom(false)
    const labelPosition = createStateFromRef(createReactivePosition({type:'interval', duration:100}))


    return <div style={{...common.enclosedContainer, ...common.boxPaddingContainer, cursor: 'pointer'}}>
        <div
            ref={labelPosition.ref}
            style={common.layout.rowCenter({ gap: common.sizes.space.gap()})}
            onClick={() => dropdownVisible(true)}
        >
            <div>
                {label}
            </div>
        </div>
        <Dropdown visible={dropdownVisible} targetPosition={labelPosition}>
            <div style={common.layout.flexColumn({})}>
                <div style={{...common.boxPaddingContainer, ...common.layout.rowCenter({gap: common.sizes.space.gap()})}}>
                    <Search />
                    <input placeholder={'Search'} style={common.rawControl} type="text" value={search} onChange={(e:any) => search(e.target.value)}/>
                </div>

                <div style={common.separator(false, 0)}/>

                <div style={{...common.boxPaddingContainer,...common.layout.flexColumn({gap: common.sizes.space.gap()})}}>
                    {options.map((option) => {
                        return <div as='option' prop:option={option}>{option}</div>
                    })}
                </div>
            </div>

        </Dropdown>
    </div>
}

Filter.propTypes = FilterPropTypes
