import {common} from '../../common.js'
import {RenderContext} from "axii";
import {Button} from 'axii-ui'

export type MailData = {
    title: string
    content: string
    date: string
    from: string

}

export type MailProps = {
    item: MailData
}

export function Mail({item}: MailProps, {createElement}: RenderContext) {
    const containerStyle = {
        ...common.enclosedContainer,
        ...common.panelPaddingContainer,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: common.colors.background.box.focus(),
        },
        ...common.layout.flexColumnStretched({gap: common.sizes.space.gap()}),
    }
    const headerStyle = {
        ...common.layout.twoSide(),
        ...common.layout.rowCenter(),
        flexGrow: 0,
    }

    const fromStyle = {
        fontSize: common.sizes.fontSize.title(),
        color: common.colors.text.normal(),
        fontWeight: common.sizes.fontWeight(4),
    }


    const dateStyle = {
        ...common.supportiveText
    }

    const titleStyle = {
        fontSize: common.sizes.fontSize.text(),
        color: common.colors.text.normal(),
        fontWeight: common.sizes.fontWeight(4),
    }

    const contentStyle = {
        ...common.supportiveText
    }

    const actionStyle = {

    }

    return <div as='root' style={containerStyle}>
        <div style={headerStyle}>
            <span style={fromStyle}>{item.from}</span>
            <span style={dateStyle}>{item.date}</span>
        </div>
        <div style={titleStyle}>{item.title}</div>
        <div style={contentStyle}>{item.content}</div>
        <div style={actionStyle}>
            <Button>Reply</Button>
        </div>
    </div>
}
