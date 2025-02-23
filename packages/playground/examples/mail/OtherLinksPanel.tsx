import {JSXElement, RenderContext, RxList} from "axii";

import {styleSystem} from '../../styleSystem'
import UserIcon from 'axii-icon-park/AddUser.js'
import TipsIcon from 'axii-icon-park/TipsOne.js'
import CommentIcon from 'axii-icon-park/CommentOne.js'
import ShoppingIcon from 'axii-icon-park/Shopping.js'
import Ticket from 'axii-icon-park/TicketOne.js'


type BoxItem = {
    label: string,
    icon?: JSXElement,
    unreadCount: number,
}

export function OtherLinksPanel({}, {createElement}: RenderContext) {
    const boxes = new RxList<BoxItem>([{
        label: 'Social',
        icon: <UserIcon size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Updates',
        icon: <TipsIcon size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Forums',
        icon: <CommentIcon size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Shopping',
        icon: <ShoppingIcon size={16}/>,
        unreadCount: 0,
    }, {
        label: 'Promotions',
        icon: <Ticket size={16}/>,
        unreadCount: 0,
    }])

    const boxesPanelStyle = {
        ...styleSystem.boxPaddingContainer,
        ...styleSystem.layout.column({gap: styleSystem.sizes.space.itemGap()}),
        flexBasis: 200,
    }

    return <div style={boxesPanelStyle}>
        {boxes.map((box) => {
            const style = () => ({
                ...styleSystem.textPaddingContainer,
                ...styleSystem.layout.twoSide(),
                color: styleSystem.colors.text.normal(),
                backgroundColor: styleSystem.colors.background.box.normal(),
                borderRadius: styleSystem.sizes.radius.box(),
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: styleSystem.colors.background.box.focus(),
                }
            })

            const labelContainerStyle = {
                ...styleSystem.layout.row(),
                gap: styleSystem.sizes.space.gap(),
            }
            return <div as='root' style={style}>
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