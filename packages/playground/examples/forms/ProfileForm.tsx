/* @jsx createElement */
import {RenderContext} from "axii";
import {styleSystem} from '../../styleSystem'
import {Button, Input, Select, Textarea} from 'axii-ui'
import {faker} from "@faker-js/faker";

export function ProfileForm({}, {createElement}: RenderContext) {

    const itemListContainerStyle = {
        ...styleSystem.layout.flexColumnStretched(({gap: styleSystem.sizes.space.panel(3)})),
        '&>*': {
            ...styleSystem.layout.flexColumnStretched({gap: styleSystem.sizes.space.panel(1)})
        },
        marginBottom: styleSystem.sizes.space.panel(3)

    }

    const titleStyle = {
        fontSize: styleSystem.sizes.fontSize.title()
    }

    const names = ['light', 'dark']

    return (
        <div>
            <div>
                <div style={titleStyle}>Profile</div>
                <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
            </div>
            <div style={{...styleSystem.separator(false, 3)}}></div>
            <div>
                <div style={itemListContainerStyle}>
                    <div>
                        <div>Username</div>
                        <div>
                            <Input/>
                        </div>
                        <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Username</div>
                        <div>
                            <Select options={names} placeholder={'Choose'}/>
                        </div>
                        <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Username</div>
                        <div>
                            <Textarea/>
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