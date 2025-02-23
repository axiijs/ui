import {
    atom,
    Component,
    FixedCompatiblePropsType,
    PropsType,
    PropTypes,
    RectObject,
    RenderContext,
    RxDOMRect,
    RxList
} from "axii";
import {Button, Dropdown} from 'axii-ui'
import {styleSystem} from '../../styleSystem'
import Search from 'axii-icon-park/Search.js'

const FilterPropTypes = {
    label: PropTypes.any.isRequired,
    options: PropTypes.rxList<any>().default(() => new RxList([])),
    search: PropTypes.atom<string>().default(() => atom('')),
}


export const Filter: Component = function (props: FixedCompatiblePropsType<typeof FilterPropTypes>, {createElement}:RenderContext) {
    const {label, search, options} = props as PropsType<typeof FilterPropTypes>

    const dropdownVisible = atom(false)
    const rxLabelPosition = new RxDOMRect(atom<RectObject>(null), {type:'interval', duration:100})


    return <Button>
        <div
            ref={rxLabelPosition.ref}
            style={styleSystem.layout.row({ gap: styleSystem.sizes.space.gap()})}
            onClick={() => dropdownVisible(true)}
        >
            <div>
                {label}
            </div>
        </div>
        <Dropdown visible={dropdownVisible} targetPosition={rxLabelPosition.value}>
            <div style={styleSystem.layout.flexColumn({})}>
                <div style={{...styleSystem.boxPaddingContainer, ...styleSystem.layout.row({gap: styleSystem.sizes.space.gap()})}}>
                    <Search />
                    <input placeholder={'Search'} style={styleSystem.rawControl} type="text" value={search} onChange={(e:any) => search(e.target.value)}/>
                </div>

                <div style={styleSystem.separator(false, 0)}/>

                <div style={{...styleSystem.boxPaddingContainer,...styleSystem.layout.flexColumn({gap: styleSystem.sizes.space.gap()})}}>
                    {options.map((option) => {
                        return <div as='option' prop:option={option}>{option}</div>
                    })}
                </div>
            </div>

        </Dropdown>
    </Button>
}

Filter.propTypes = FilterPropTypes
