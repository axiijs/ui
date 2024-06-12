import {atom, JSXElement, RenderContext, RxList} from "axii";

import {common} from 'axii-ui/themes/inc.js'
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
        ...common.boxPaddingContainer,
        ...common.layout.flexColumnStretched({gap: common.sizes.space.itemGap()}),
        flexBasis: 200,
    }

    const selectedBox = atom<null | BoxItem>(boxes.at(0)!)
    const boxesWithSelected = boxes.createSelection(selectedBox)
    return <div style={boxesPanelStyle}>
        {boxesWithSelected.map(([box, selected]) => {
            const style = () => ({
                ...common.textPaddingContainer,
                ...common.layout.twoSide(),
                color: selected() ? common.colors.text.active(true) : common.colors.text.normal(),
                backgroundColor: selected() ? common.colors.background.box.active() : common.colors.background.box.normal(),
                borderRadius: common.sizes.radius.box(),
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: selected() ? common.colors.background.box.active() : common.colors.background.box.focus(),
                }
            })

            const labelContainerStyle = {
                ...common.layout.rowCenter(),
                gap: common.sizes.space.gap(),
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