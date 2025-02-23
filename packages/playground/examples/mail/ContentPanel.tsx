import {atom, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";
import {styleSystem} from '../../styleSystem'

import {Avatar, Button, Switch, Textarea} from 'axii-ui'
import { MailData} from "./Mail.js";


const ContentPropTypes = {
    mail: PropTypes.atom<MailData|null>().default(() => atom(null))
}

export function ContentPanel(props: FixedCompatiblePropsType<typeof ContentPropTypes>, {createElement}: RenderContext) {
    const {mail} = props as PropsType<typeof ContentPropTypes>
    const containerStyle = {
        ...styleSystem.layout.middleGrow(true),
        ...styleSystem.separatedList(true)
    }

    const headerStyle = {
        ...styleSystem.panelPaddingContainer,
        ...styleSystem.layout.twoSide()
    }

    const bodyStyle = {
        ...styleSystem.panelPaddingContainer
    }

    const operationContainerStyle = {
        ...styleSystem.panelPaddingContainer,
        ...styleSystem.layout.column({gap: styleSystem.sizes.space.gap()})
    }

    const nameAndAvatarStyle = {
        ...styleSystem.layout.row({gap: styleSystem.sizes.space.gap()}),
        overflow: 'hidden',
        '& *': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    }

    const nameAndTitleStyle = {
        ...styleSystem.layout.column({gap: styleSystem.sizes.space.gap()}),
    }

    const fromStyle = {
        fontSize: styleSystem.sizes.fontSize.title(),
        color: styleSystem.colors.text.normal(),
        fontWeight: styleSystem.sizes.fontWeight(4),
    }

    const avatarStyle = {
        height: styleSystem.sizes.thing.box(1.5),
        width: styleSystem.sizes.thing.box(1.5),
        fontSize: styleSystem.sizes.fontSize.title(),
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
                <div style={{color: styleSystem.colors.text.normal(false, 'supportive')}}>
                    {() => mail()?.date}
                </div>
            </div>
            <div style={bodyStyle}>
                {() => mail()?.content}
            </div>
            <div style={operationContainerStyle}>
                <Textarea placeholder="Type your message here" />
                <div style={{...styleSystem.layout.twoSide()}}>
                    <div style={{...styleSystem.layout.row(), gap: styleSystem.sizes.space.itemGap()}}>
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