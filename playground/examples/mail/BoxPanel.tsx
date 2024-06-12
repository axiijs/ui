import {Atom, atom, RenderContext} from "axii";
import {common} from 'axii-ui/themes/inc'
import {Tabs} from 'axii-ui'
import {MailListPanel} from "./MailListPanel.js";
import {MailData} from "./Mail.js";

type BoxPanelProps = {
    data: MailData[],
    selected: Atom<MailData|null>
}

export function BoxPanel({data, selected}: BoxPanelProps, {createElement}: RenderContext) {
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
        ...common.layout.twoSide(),
        ...common.layout.rowCenter(),
        flexGrow: 0,
    }


    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <div>
                    Inbox
                </div>
                <div>
                    <Tabs options={["All Mails", "Unread"]} current={atom('All Mails')}/>
                </div>
            </div>
            <MailListPanel data={data} selected={selected}/>
        </div>
    )
}
