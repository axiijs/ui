import {Atom, RenderContext} from "axii";
import {common} from 'axii-ui/themes/inc.js'
import {Input} from 'axii-ui'
import {Mail, MailData} from "./Mail.js";

type MailListPanelProps = {
    data: MailData[],
    selected: Atom<MailData|null>
}

export function MailListPanel({data, selected}: MailListPanelProps, {createElement}: RenderContext) {

    const containerStyle = {
        height: '100%',
        ...common.layout.middleGrow(true),
    }

    const headerStyle = {
        flexGrow: 0,
        flexShrink: 0,
        ...common.panelPaddingContainer,
    }

    const listStyle = {
        ...common.panelPaddingContainer,
        ...common.layout.flexColumnStretched({gap: common.sizes.space.gap()}),
        paddingTop: 0,
        overflowY: 'auto',
    }

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <Input />
            </div>
            <div style={listStyle}>
                {data.map((item, index) => {
                    return <Mail item={item} $root:onClick={() => selected(item)}/>
                })}
            </div>
        </div>
    )
}
