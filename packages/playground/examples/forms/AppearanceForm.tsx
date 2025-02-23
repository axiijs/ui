import {atom, RenderContext, RxList} from "axii";
import {styleSystem} from '../../styleSystem'
import {Button, Select} from 'axii-ui'
import {faker} from "@faker-js/faker";


type ThemeItemType = {
    name: string
    color: string
}

export function AppearanceForm({}, {createElement}: RenderContext) {

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


    const themes = new RxList<ThemeItemType>([
        {
            name: 'light',
            color: styleSystem.colors.background.item.normal()
        },
        {
            name: 'dark',
            color: styleSystem.colors.background.box.active()
        }
    ])
    const selectedTheme = atom<ThemeItemType>(themes.at(0)!)
    const themesWithSelected = themes.createSelection(selectedTheme)


    const fontSizes = ['small', 'medium', 'large', 'extra large']

    return (
        <div>
            <div>
                <div style={titleStyle}>Appearance</div>
                <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
            </div>
            <div style={{...styleSystem.separator(false, 2)}}></div>
            <div>
                <div style={itemListContainerStyle}>
                    <div>
                        <div>Font</div>
                        <div>
                            <Select options={fontSizes} placeholder={'Choose'}/>
                        </div>
                        <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Theme</div>
                        <div style={{...styleSystem.layout.row({gap:styleSystem.sizes.space.gap()})}}>
                            {themesWithSelected.map(([item, selected]) => {
                                const {name, color} = item
                                const style=() =>({
                                    borderRadius: styleSystem.sizes.radius.box(),
                                    border: `1px solid ${selected() ? styleSystem.colors.line.border.focused() : styleSystem.colors.line.border.normal()}`,
                                    padding: styleSystem.sizes.space.gap(),
                                    cursor: 'pointer',
                                })

                                const contentStyle = () => ({
                                    borderRadius: styleSystem.sizes.radius.box(),
                                    width: styleSystem.sizes.thing.box(4),
                                    height: styleSystem.sizes.thing.box(3),
                                    backgroundColor: color,
                                })

                                const containerStyle= {
                                    ...styleSystem.layout.column({gap: styleSystem.sizes.space.gap()}),
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
                        <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>

                </div>
                <div>
                    <Button $root:style={styleSystem.textBox({inverted:true})}>Save</Button>
                </div>
            </div>
        </div>
    )
}