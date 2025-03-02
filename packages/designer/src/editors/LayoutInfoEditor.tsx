import { Atom, RenderContext, RxList } from "axii";
import { RxCollection } from "../RxPage";
import { commonOptionStyle, subPanelStyle } from "../style";
import { createElement as icon, MoveRight, MoveDown, LayoutGrid, MoveLeft, AlignHorizontalJustifyCenter, Dot } from 'lucide';
import { RowGapInput, ColumnGapInput } from "../lib/SizeInputs";
import { AlignType, LayoutType } from "../../data/types";
import { DisplayOption, DisplayValue, Select } from "../lib/Select";


function AlignGridSelector({node}: {node: RxCollection<any, any>}, {createElement}: RenderContext) {
    // alignItems 和 justifyContent 的配列组合，总共 9 种
    const alignTypes = new RxList<{type: {alignItems: AlignType, justifyContent: AlignType}, icon: any}>([
        // 第一行: alignItems = START
        {
            type: {
                alignItems: AlignType.START,
                justifyContent: AlignType.START,
            },
            icon: Dot,
        }, 
        {
            type: {
                alignItems: AlignType.START,
                justifyContent: AlignType.CENTER,
            },
            icon: Dot,
        }, 
        {
            type: {
                alignItems: AlignType.START,
                justifyContent: AlignType.END,
            },
            icon: Dot,
        },
        
        // 第二行: alignItems = CENTER
        {
            type: {
                alignItems: AlignType.CENTER,
                justifyContent: AlignType.START,
            },
            icon: Dot,
        }, 
        {
            type: {
                alignItems: AlignType.CENTER,
                justifyContent: AlignType.CENTER,
            },
            icon: Dot,
        }, 
        {
            type: {
                alignItems: AlignType.CENTER,
                justifyContent: AlignType.END,
            },
            icon: Dot,
        },
        
        // 第三行: alignItems = END
        {
            type: {
                alignItems: AlignType.END,
                justifyContent: AlignType.START,
            },
            icon: Dot,
        }, 
        {
            type: {
                alignItems: AlignType.END,
                justifyContent: AlignType.CENTER,
            },
            icon: Dot,
        }, 
        {
            type: {
                alignItems: AlignType.END,
                justifyContent: AlignType.END,
            },
            icon: Dot,
        }
    ])

    const selectedAlignType = alignTypes.find(alignType => {
        const alignItems = node.layout.alignItems.value() || AlignType.START
        const justifyContent = node.layout.justifyContent.value() || AlignType.START
        return alignType.type.alignItems === alignItems && alignType.type.justifyContent === justifyContent
    })

    const onClick = (alignType: {alignItems: AlignType, justifyContent: AlignType}) => {
        node.layout.alignItems.value(alignType.alignItems)
        node.layout.justifyContent.value(alignType.justifyContent)
    }


    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '4px',
        backgroundColor: 'rgb(56,56,56)',
        borderRadius: '4px',
        padding: '4px',
        '& > div': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '2px',
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
            }
        }
    }

    return (
        <div style={gridContainerStyle}>
            {alignTypes.createSelection(selectedAlignType).map(([alignTypes, selected]) => (
                <div onClick={onClick} >
                    {() => icon(alignTypes.icon, {stroke: selected() ? 'white' : 'gray', width:12, height:12})}
                </div>
            ))}
        </div>
    )
}




function LayoutTypeSelector({node}: {node: RxCollection<any, any>}, {createElement}: RenderContext) {


    const layouts = new RxList<{type: string, icon: any}>([{
            type: 'row',
            icon: MoveRight,
        }, {
            type: 'column',
            icon: MoveDown,
        }, {
            type: 'grid',
            icon: LayoutGrid,
    }])

    const selectedLayout = layouts.find(layout => layout.type === node.layout.type.value())

    

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'stretch',
        backgroundColor: 'rgb(56,56,56)',
        borderRadius: 4,
        '&>div': {
            flexGrow: 1,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '1px solid rgb(76,76,76)',
            '&:first-child': {
                borderLeftWidth: 0,
            }
        }
    }

    return <div style={containerStyle}>
        {layouts.createSelection(selectedLayout).map(([layouts, selected]) => (
            <div onClick={() => node.layout.type.value(layouts.type as LayoutType)} >
                {() => icon(layouts.icon, {stroke: selected() ? 'white' : 'gray', width:12, height:12})}
            </div>
        ))}
    </div>
}



function AlignTypeSelector({value}: {value: Atom<AlignType|null>}, {createElement}: RenderContext) {

    const options = new RxList<{label: string, value: AlignType}>([{
        label:'start',
        value: AlignType.START
    }, {
        label: 'center',
        value: AlignType.CENTER
    }, {
        label: 'end',
        value: AlignType.END
    }, {
        label: 'space-between',
        value: AlignType.SPACE_BETWEEN
    }, {
        label: 'space-around',
        value: AlignType.SPACE_AROUND
    }, {
        label: 'space-evenly',
        value: AlignType.SPACE_EVENLY
    }])

    const selectedAlignType = options.find(option => option.value === value())


    function Option({value: optionValue, selected}: {value: {label: string, value: AlignType}, selected: Atom<boolean>}, {createElement}: RenderContext) {
        return <div style={commonOptionStyle(selected)} onClick={() => value(optionValue.value)}>
            {optionValue.label}
        </div>
    }


    return <Select options={options} value={selectedAlignType} $option:_use={Option} $displayValue:_use={DisplayValue}/>
}



export function LayoutInfoEditor({node}: {node: RxCollection<any, any>}, {createElement}: RenderContext) {
 const valuesContainerStyle = {
    padding: [0, 12, 12],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
    gap: 10,
    '&>*': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        gap: 10,
        '&>*': {
            flexShrink:1,
            flexGrow:1,
            flexBasis: 0,
            maxWidth: '100%',
            minWidth: 0,
        }
    },
    maxWidth: '100%',
    minWidth: 0,
 }

    return (
        <div style={subPanelStyle}>
            <div as='name'>Layout</div>
            <div style={valuesContainerStyle}>
                <div>
                    <LayoutTypeSelector node={node} />
                </div>
                <div>
                    <RowGapInput value={node.layout.rowGap} />
                    <ColumnGapInput value={node.layout.columnGap} />
                </div>
                <div>
                    <AlignGridSelector node={node} />
                    
                </div>
                <div>
                    <AlignTypeSelector value={node.layout.alignItems.value} />
                    <AlignTypeSelector value={node.layout.justifyContent.value} />
                </div>
            </div>
        </div>
    )
}