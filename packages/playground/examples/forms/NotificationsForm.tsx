import {atom, RenderContext, RxList} from "axii";
import {common} from '../../common.js'

import {Button, Checkbox, RadioGroup, Switch} from 'axii-ui'
import {faker} from "@faker-js/faker";

type NotifyOptionType = {
    value: string
    label: string

}

export function NotificationsForm({}, {createElement}: RenderContext) {

    const itemListContainerStyle = {
        ...common.layout.flexColumnStretched(({gap: common.sizes.space.panel(3)})),
        '&>*': {
            ...common.layout.flexColumnStretched({gap: common.sizes.space.panel(1)})
        },
        marginBottom: common.sizes.space.panel(3)

    }

    const titleStyle = {
        fontSize: common.sizes.fontSize.title()
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
        ...common.layout.flexColumn({gap: common.sizes.space.panel(1)})
    }

    const notificationPanelContainerStyle = {
        ...common.layout.flexColumnStretched(({gap: common.sizes.space.panel()})),
    }

    const notificationPanelTitleStyle = {
        ...common.layout.flexColumn({gap: common.sizes.space.itemGap()}),
        '&>*:first-child': {
            ...common.mainText
        },
        '&>*:last-child': {
            ...common.supportiveText,
        }
    }

    const notificationPanelStyle = {
        ...common.enclosedContainer,
        padding: common.sizes.space.panel(),
        ...common.layout.twoSide(),
        ...common.layout.rowCenter(),
        '&>*:first-child': notificationPanelTitleStyle
    }

    return (
        <div>
            <div>
                <div style={titleStyle}>Notification</div>
                <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
            </div>
            <div style={{...common.separator(false, 2)}}></div>
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
                    ...common.layout.flexRow({gap: common.sizes.space.gap()}),
                    marginBottom: common.sizes.space.panel(3)
                }}>
                    <div>
                        <Checkbox />
                    </div>
                    <div>
                        <div style={common.mainText}>Use different settings for my mobile devices</div>
                        <div style={common.supportiveText}>You can manage your mobile notifications in the mobile settings page.</div>
                    </div>
                </div>
                <div>
                    <Button $root:style={common.textBox({inverted:true})}>Save</Button>
                </div>
            </div>
        </div>
    )
}