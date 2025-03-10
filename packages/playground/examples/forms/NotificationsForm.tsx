import {atom, RenderContext, RxList} from "axii";
import {styleSystem} from '../../styleSystem'

import {Button, Checkbox, RadioGroup, Switch} from 'axii-ui'
import {faker} from "@faker-js/faker";

type NotifyOptionType = {
    value: string
    label: string

}

export function NotificationsForm({}, {createElement}: RenderContext) {

    const itemListContainerStyle = {
        ...styleSystem.layout.column(({gap: styleSystem.sizes.space.panel(3)})),
        '&>*': {
            ...styleSystem.layout.column({gap: styleSystem.sizes.space.panel(1)})
        },
        marginBottom: styleSystem.sizes.space.panel(3)

    }

    const titleStyle = {
        fontSize: styleSystem.sizes.fontSize.title()
    }

    const notifyOptions = new RxList<NotifyOptionType>([{
        value: 'all',
        label: 'All'
    }, {
        value: 'mentions',
        label: 'Mentions'
    }, {
        value: 'none',
        label: 'None'
    }])

    const currentOption = atom<NotifyOptionType|null>(null)

    const notifyStyle = {
        ...styleSystem.layout.column({gap: styleSystem.sizes.space.panel(1)})
    }

    const notificationPanelContainerStyle = {
        ...styleSystem.layout.column(({gap: styleSystem.sizes.space.panel()})),
    }

    const notificationPanelTitleStyle = {
        ...styleSystem.layout.column({gap: styleSystem.sizes.space.itemGap()}),
        '&>*:first-child': {
            ...styleSystem.mainText
        },
        '&>*:last-child': {
            ...styleSystem.supportiveText,
        }
    }

    const notificationPanelStyle = {
        ...styleSystem.layout.row(),
        ...styleSystem.layout.twoSide(),
        ...styleSystem.enclosedContainer,
        padding: styleSystem.sizes.space.panel(),
        '&>*:first-child': notificationPanelTitleStyle
    }

    return (
        <div>
            <div>
                <div style={titleStyle}>Notification</div>
                <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
            </div>
            <div style={{...styleSystem.separator(false, 2)}}></div>
            <div>
                <div style={itemListContainerStyle}>
                    <div>
                        <div>Notify me about...</div>
                        <div>
                            <RadioGroup $root:style={notifyStyle} options={notifyOptions} value={currentOption}/>
                        </div>
                    </div>
                    <div>
                        <div>Email Notifications</div>
                        <div style={notificationPanelContainerStyle}>
                            <div style={notificationPanelStyle}>
                                <div style={notificationPanelTitleStyle}>
                                    <div>Communication emails</div>
                                    <div>Receive emails about your account activity.</div>
                                </div>
                                <div>
                                    <Switch/>
                                </div>
                            </div>
                            <div style={notificationPanelStyle}>
                                <div>
                                    <div>Marketing emails</div>
                                    <div>Receive emails about new products, features, and more.</div>
                                </div>
                                <div>
                                    <Switch/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    ...styleSystem.layout.row({gap: styleSystem.sizes.space.gap()}),
                    marginBottom: styleSystem.sizes.space.panel(3)
                }}>
                    <div>
                        <Checkbox />
                    </div>
                    <div>
                        <div style={styleSystem.mainText}>Use different settings for my mobile devices</div>
                        <div style={styleSystem.supportiveText}>You can manage your mobile notifications in the mobile settings page.</div>
                    </div>
                </div>
                <div>
                    <Button $root:style={styleSystem.textBox({inverted:true})}>Save</Button>
                </div>
            </div>
        </div>
    )
}