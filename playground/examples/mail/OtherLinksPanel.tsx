import {JSXElement, RenderContext, RxList} from "axii";

import {common} from 'axii-ui/themes/inc.js'
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
        ...common.boxPaddingContainer,
        ...common.layout.flexColumnStretched({gap: common.sizes.space.itemGap()}),
        flexBasis: 200,
    }

    return <div style={boxesPanelStyle}>
        {boxes.map((box) => {
            const style = () => ({
                ...common.textPaddingContainer,
                ...common.layout.twoSide(),
                color: common.colors.text.normal(),
                backgroundColor: common.colors.background.box.normal(),
                borderRadius: common.sizes.radius.box(),
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: common.colors.background.box.focus(),
                }
            })

            const labelContainerStyle = {
                ...common.layout.rowCenter(),
                gap: common.sizes.space.gap(),
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