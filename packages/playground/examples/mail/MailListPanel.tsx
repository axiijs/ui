import {Atom, RenderContext} from "axii";
import {styleSystem} from '../../styleSystem.js'
import {Input} from 'axii-ui'
import {Mail, MailData} from "./Mail.js";

type MailListPanelProps = {
    data: MailData[],
    selected: Atom<MailData|null>
}

export function MailListPanel({data, selected}: MailListPanelProps, {createElement}: RenderContext) {

    const containerStyle = {
        height: '100%',
        ...styleSystem.layout.middleGrow(true),
    }

    const headerStyle = {
        flexGrow: 0,
        flexShrink: 0,
        ...styleSystem.panelPaddingContainer,
    }

    const listStyle = {
        ...styleSystem.panelPaddingContainer,
        ...styleSystem.layout.column({gap: styleSystem.sizes.space.gap()}),
        paddingTop: 0,
        overflowY: 'auto',
        '&>*': {
            flexShrink: 0
        }
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
