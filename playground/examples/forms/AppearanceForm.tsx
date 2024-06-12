import {atom, RenderContext, RxList} from "axii";
import {common, variants} from 'axii-ui/themes/inc'
import {Button, Select} from 'axii-ui'
import {faker} from "@faker-js/faker";


type ThemeItemType = {
    name: string
    color: string
}

export function AppearanceForm({}, {createElement}: RenderContext) {

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


    const themes = new RxList<ThemeItemType>([
        {
            name: 'light',
            color: common.colors.background.item.normal()
        },
        {
            name: 'dark',
            color: common.colors.background.box.active()
        }
    ])
    const selectedTheme = atom<ThemeItemType>(themes.at(0)!)
    const themesWithSelected = themes.createSelection(selectedTheme)


    return (
        <div>
            <div>
                <div style={titleStyle}>Appearance</div>
                <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
            </div>
            <div style={{...common.separator(false, 2)}}></div>
            <div>
                <div style={itemListContainerStyle}>
                    <div>
                        <div>Font</div>
                        <div>
                            <Select options={[1, 2, 3, 4]} placeholder={'click to choose'}/>
                        </div>
                        <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Theme</div>
                        <div style={{...common.layout.flexRow({gap:common.sizes.space.gap()})}}>
                            {themesWithSelected.map(([item, selected]) => {
                                const {name, color} = item
                                const style=() =>({
                                    borderRadius: common.sizes.radius.box(),
                                    border: `1px solid ${selected() ? common.colors.line.border.focused() : common.colors.line.border.normal()}`,
                                    padding: common.sizes.space.gap(),
                                    cursor: 'pointer',
                                })

                                const contentStyle = () => ({
                                    borderRadius: common.sizes.radius.box(),
                                    width: common.sizes.thing.box(4),
                                    height: common.sizes.thing.box(3),
                                    backgroundColor: color,
                                })

                                const containerStyle= {
                                    ...common.layout.columnCenter({gap: common.sizes.space.gap()}),
                                }
                                return (
                                    <div style={containerStyle}>
                                        <div style={style} onClick={() => selectedTheme(item)}>
                                            <div style={contentStyle}></div>
                                        </div>
                                        <div>{name}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>

                </div>
                <div>
                    <Button {...variants.Button.primary} type={'primary'}>Save</Button>
                </div>
            </div>
        </div>
    )
}