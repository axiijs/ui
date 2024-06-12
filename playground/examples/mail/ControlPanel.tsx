import {Atom, N_ATTR, RenderContext} from "axii";
import {common} from 'axii-ui/themes/inc'
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
            borderBottom: `1px solid ${common.colors.line.border.normal()}`,
            '&:last-child': {
                borderRight: 'none'
            }
        }
    }

    const headerStyle = {
        ...common.boxPaddingContainer,
        flexGrow: 0,
    }


    const otherLinkPanelStyle = {
        flexGrow: 1,
    }

    const options = [{
        value: '1',
        label: '1'
    }, {
        value: '2',
        label: '2'
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
        return <div onClick={() => optionVisible(true)}>{() => value()?.label ?? 'choose account'}</div>
    }

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <Select
                    placeholder='choose account'
                    options={options}
                    $option={{
                        '$displayOption:_use': DisplayOption,
                    }}
                    $displayValue:_use={DisplayValue}
                />
            </div>
            <BoxesPanel />
            <OtherLinksPanel $root:style={otherLinkPanelStyle}/>
        </div>
    )
}
