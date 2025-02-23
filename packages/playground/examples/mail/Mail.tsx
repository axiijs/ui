import {styleSystem} from '../../styleSystem'
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
        ...styleSystem.enclosedContainer,
        ...styleSystem.panelPaddingContainer,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: styleSystem.colors.background.box.focus(),
        },
        ...styleSystem.layout.column({gap: styleSystem.sizes.space.gap()}),
    }
    const headerStyle = {
        ...styleSystem.layout.row(),
        ...styleSystem.layout.twoSide(),
        flexGrow: 0,
    }

    const fromStyle = {
        fontSize: styleSystem.sizes.fontSize.title(),
        color: styleSystem.colors.text.normal(),
        fontWeight: styleSystem.sizes.fontWeight(4),
    }


    const dateStyle = {
        ...styleSystem.supportiveText
    }

    const titleStyle = {
        fontSize: styleSystem.sizes.fontSize.text(),
        color: styleSystem.colors.text.normal(),
        fontWeight: styleSystem.sizes.fontWeight(4),
    }

    const contentStyle = {
        ...styleSystem.supportiveText
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
