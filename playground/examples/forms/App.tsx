import {atom, Atom, RenderContext, RxList} from "axii";
import {common} from 'axii-ui/themes/inc'
import {ProfileForm} from "./ProfileForm.js";
import {AccountForm} from "./AccountForm.js";
import {NotificationsForm} from "./NotificationsForm.js";
import {AppearanceForm} from "./AppearanceForm.js";
import {faker} from "@faker-js/faker";

export function App({}, {createElement}: RenderContext) {

    const routeData = {
        profile: {
            description: faker.lorem.paragraph(),
            Form: ProfileForm
        },
        account: {
            description: faker.lorem.paragraph(),
            Form: AccountForm
        },
        appearance: {
            description: faker.lorem.paragraph(),
            Form: AppearanceForm
        },
        notifications: {
            description: faker.lorem.paragraph(),
            Form: NotificationsForm
        },

    }

    const currentForm: Atom<keyof typeof routeData> = atom('profile')
    const menuWithSelected = (new RxList(Object.keys(routeData))).createSelection(currentForm)

    const containerStyle = {
        ...common.panelPaddingContainer
    }

    const menuContainerStyle = {
        width: 200,
        ...common.layout.flexColumnStretched({gap:common.sizes.space.gap()}),
        '&>*': {
            ...common.textBox,
        },
    }

    const descriptionStyle = {
        ...common.supportiveText
    }

    return <div style={containerStyle}>
        <div>
            <h1>Settings</h1>
            <div style={descriptionStyle}>{() => routeData[currentForm()].description}</div>
        </div>
        <div style={common.separator(false, 2)}></div>
        <div style={{...common.layout.middleGrow(), gap: common.sizes.space.gap(2)}}>
            <div style={menuContainerStyle}>
                {menuWithSelected.map(([key, selected]) => {
                    const style = () => {

                        return ({
                            ...common.textBox,
                            ...common.layout.twoSide(),
                            color: selected() ? common.colors.text.active(true) : common.colors.text.normal(),
                            backgroundColor: selected() ? common.colors.background.box.active() : common.colors.background.box.normal(),
                            borderRadius: common.sizes.radius.box(),
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: selected() ? common.colors.background.box.active() : common.colors.background.box.focus(),
                            }
                        })
                    }

                    return (
                        <div style={style} onClick={() => {
                            currentForm(key)
                        }}>
                            {key[0].toUpperCase()+key.slice(1)}
                        </div>
                    )
                })}
            </div>
            <div>
                {() => {
                    const { Form } = routeData[currentForm() as keyof typeof routeData]
                    return <Form />
                }}
            </div>
        </div>
    </div>
}
