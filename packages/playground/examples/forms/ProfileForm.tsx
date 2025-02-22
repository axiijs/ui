/* @jsx createElement */
import {RenderContext} from "axii";
import {common} from '../../common.js'
import {Button, Input, Select, Textarea} from 'axii-ui'
import {faker} from "@faker-js/faker";

export function ProfileForm({}, {createElement}: RenderContext) {

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

    const names = ['light', 'dark']

    return (
        <div>
            <div>
                <div style={titleStyle}>Profile</div>
                <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
            </div>
            <div style={{...common.separator(false, 3)}}></div>
            <div>
                <div style={itemListContainerStyle}>
                    <div>
                        <div>Username</div>
                        <div>
                            <Input/>
                        </div>
                        <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Username</div>
                        <div>
                            <Select options={names} placeholder={'Choose'}/>
                        </div>
                        <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Username</div>
                        <div>
                            <Textarea/>
                        </div>
                        <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                </div>
                <div>
                    <Button $root:style={common.textBox({inverted:true})}>Save</Button>
                </div>
            </div>
        </div>
    )
}