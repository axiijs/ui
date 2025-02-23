import {Atom, N_ATTR, RenderContext} from "axii";
import {styleSystem} from '../../styleSystem.js'
import {Select} from 'axii-ui'
import {BoxesPanel} from "./BoxesPanel.js";
import {OtherLinksPanel} from "./OtherLinksPanel.js";


export function ControlPanel({}, {createElement}: RenderContext) {
    const containerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&>*': {
            borderBottom: `1px solid ${styleSystem.colors.line.border.normal()}`,
            '&:last-child': {
                borderRight: 'none'
            }
        }
    }

    const headerStyle = {
        ...styleSystem.boxPaddingContainer,
        flexGrow: 0,
    }


    const otherLinkPanelStyle = {
        flexGrow: 1,
    }

    const options = [{
        value: 'James@axii.org',
        label: 'James@axii.org'
    }, {
        value: 'Tom@axii.org',
        label: 'Tom@axii.org'
    }]

    type SelectItemProps = {
        value: any,
        onSelect: (value: any) => void,
        selected: Atom<boolean>
        children?: any,
        [N_ATTR]: any
    }

    function DisplayOption(props: SelectItemProps, {createElement}: RenderContext) {
        const {value} = props
        const nativeAttrs = props[N_ATTR]
        return <div {...nativeAttrs}>
            {value.label}
        </div>
    }

    type DisplayValueProps = {
        value: () => Atom<any>,
        optionVisible: Atom<boolean>
        placeholder: () => string
    }
    function DisplayValue({value, optionVisible}: DisplayValueProps, {createElement}: RenderContext) {
        return <div onClick={() => optionVisible(true)}>{() => value()?.label ?? 'Switch Account'}</div>
    }

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <Select
                    placeholder='Switch Account'
                    options={options}
                    $displayOption:_use={DisplayOption}
                    $displayValue:_use={DisplayValue}
                />
            </div>
            <BoxesPanel />
            <OtherLinksPanel $root:style={otherLinkPanelStyle}/>
        </div>
    )
}
