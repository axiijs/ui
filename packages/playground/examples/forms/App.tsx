import {atom, Atom, RenderContext, RxList} from "axii";
import {styleSystem} from '../../styleSystem'
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
        ...styleSystem.panelPaddingContainer,
        boxSizing: 'border-box',
        ...styleSystem.layout.flexColumnStretched({gap: 0}),
        height: '100%',
    }

    const menuContainerStyle = {
        width: 200,
        ...styleSystem.layout.flexColumnStretched({gap:styleSystem.sizes.space.gap()}),
        '&>*': {
            ...styleSystem.textBox,
        },
    }

    const descriptionStyle = {
        ...styleSystem.supportiveText
    }

    return <div style={containerStyle}>
        <div>
            <h1>Settings</h1>
            <div style={descriptionStyle}>{() => routeData[currentForm()].description}</div>
        </div>
        <div style={styleSystem.separator(false, 2)}></div>
        <div style={{...styleSystem.layout.middleGrow(), gap: styleSystem.sizes.space.gap(2), alignItems:'stretch'}}>
            <div style={menuContainerStyle}>
                {menuWithSelected.map(([key, selected]) => {
                    const style = () => {

                        return ({
                            ...styleSystem.textBox({borderWidth:0}),
                            ...styleSystem.layout.twoSide(),
                            color: selected() ? styleSystem.colors.text.active(true) : styleSystem.colors.text.normal(),
                            backgroundColor: selected() ? styleSystem.colors.background.box.active() : styleSystem.colors.background.box.normal(),
                            borderRadius: styleSystem.sizes.radius.box(),
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: selected() ? styleSystem.colors.background.box.active() : styleSystem.colors.background.box.focus(),
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
            <div style={{overflow:'auto', height: '100%',}}>
                {() => {
                    const { Form } = routeData[currentForm() as keyof typeof routeData]
                    return <Form />
                }}
            </div>
        </div>
    </div>
}
