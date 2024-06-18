import {atom, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";
import {common} from '../..//common.js'

import {Avatar, Button, Switch, Textarea} from 'axii-ui'
import { MailData} from "./Mail.js";


const ContentPropTypes = {
    mail: PropTypes.atom<MailData|null>().default(() => atom(null))
}

export function ContentPanel(props: FixedCompatiblePropsType<typeof ContentPropTypes>, {createElement}: RenderContext) {
    const {mail} = props as PropsType<typeof ContentPropTypes>
    const containerStyle = {
        ...common.layout.middleGrow(true),
        ...common.separatedList(true)
    }

    const headerStyle = {
        ...common.panelPaddingContainer,
        ...common.layout.twoSide()
    }

    const bodyStyle = {
        ...common.panelPaddingContainer
    }

    const operationContainerStyle = {
        ...common.panelPaddingContainer,
        ...common.layout.flexColumn({gap: common.sizes.space.gap()})
    }

    const nameAndAvatarStyle = {
        ...common.layout.flexRow({gap: common.sizes.space.gap()}),
        overflow: 'hidden',
        '& *': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    }

    const nameAndTitleStyle = {
        ...common.layout.flexColumn({gap: common.sizes.space.gap()}),
    }

    const fromStyle = {
        fontSize: common.sizes.fontSize.title(),
        color: common.colors.text.normal(),
        fontWeight: common.sizes.fontWeight(4),
    }

    const avatarStyle = {
        height: common.sizes.thing.box(1.5),
        width: common.sizes.thing.box(1.5),
        fontSize: common.sizes.fontSize.title(),
        flexShrink: 0
    }

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <div style={nameAndAvatarStyle}>
                    <Avatar alt={'AT'} $root:style={avatarStyle}/>
                    <div style={nameAndTitleStyle}>
                        <div style={fromStyle}>{() => mail()?.from}</div>
                        <div>{() => mail()?.title}</div>
                    </div>
                </div>
                <div style={{color: common.colors.text.normal(false, 'supportive')}}>
                    {() => mail()?.date}
                </div>
            </div>
            <div style={bodyStyle}>
                {() => mail()?.content}
            </div>
            <div style={operationContainerStyle}>
                <Textarea placeholder="Type your message here" />
                <div style={{...common.layout.twoSide()}}>
                    <div style={{...common.layout.rowCenter(), gap: common.sizes.space.itemGap()}}>
                        <Switch />
                        <span>Mute this thread</span>
                    </div>
                    <Button>Send</Button>
                </div>
            </div>
        </div>
    )
}

ContentPanel.prototype = ContentPropTypes