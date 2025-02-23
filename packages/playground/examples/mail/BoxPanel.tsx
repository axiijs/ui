import {Atom, atom, RenderContext} from "axii";
import {styleSystem} from '../../styleSystem'

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
            borderBottom: `1px solid ${styleSystem.colors.line.border.normal()}`,
            '&:last-child': {
                borderRight: 'none'
            }
        }
    }

    const headerStyle = {
        ...styleSystem.boxPaddingContainer,
        ...styleSystem.layout.row(),
        ...styleSystem.layout.twoSide(),
        flexGrow: 0,
    }


    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <div style={styleSystem.heading()}>
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
