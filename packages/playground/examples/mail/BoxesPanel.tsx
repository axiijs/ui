import {atom, JSXElement, RenderContext, RxList} from "axii";

import {styleSystem} from '../../styleSystem'

import InboxIcon from 'axii-icon-park/Inbox.js'
import FileEditingOne from 'axii-icon-park/FileEditingOne.js'
import SendOne from 'axii-icon-park/SendOne.js'
import JunkOne from 'axii-icon-park/DeleteOne.js'
import TrashOne from 'axii-icon-park/Delete.js'
import Folder from 'axii-icon-park/FolderOne.js'



type BoxItem = {
    label: string,
    icon?: JSXElement,
    unreadCount: number,
}

export function BoxesPanel({}, {createElement}: RenderContext) {
    const boxes = new RxList<BoxItem>([{
        label: 'Inbox',
        icon: <InboxIcon size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Drafts',
        icon: <FileEditingOne size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Sent',
        icon: <SendOne size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Junk',
        icon: <JunkOne size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Trash',
        icon: <TrashOne size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Archive',
        icon: <Folder size={16}/>,
        unreadCount: 0,
    }])

    const boxesPanelStyle = {
        ...styleSystem.boxPaddingContainer,
        ...styleSystem.layout.column({gap: styleSystem.sizes.space.itemGap()}),
        flexBasis: 200,
    }

    const selectedBox = atom<null | BoxItem>(boxes.at(0)!)
    const boxesWithSelected = boxes.createSelection(selectedBox)
    return <div style={boxesPanelStyle}>
        {boxesWithSelected.map(([box, selected]) => {
            const style = () => ({
                ...styleSystem.textPaddingContainer,
                ...styleSystem.layout.twoSide(),
                color: selected() ? styleSystem.colors.text.active(true) : styleSystem.colors.text.normal(),
                backgroundColor: selected() ? styleSystem.colors.background.box.active() : styleSystem.colors.background.box.normal(),
                borderRadius: styleSystem.sizes.radius.box(),
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: selected() ? styleSystem.colors.background.box.active() : styleSystem.colors.background.box.focus(),
                }
            })

            const labelContainerStyle = {
                ...styleSystem.layout.row(),
                gap: styleSystem.sizes.space.gap(),
            }
            return <div style={style}>
                <div style={labelContainerStyle}>
                    {box.icon}
                    <span>
                                {box.label}
                            </span>
                </div>
                <span>{box.unreadCount}</span>
            </div>
        })}
    </div>
}