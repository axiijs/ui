import {RenderContext} from "axii";
import {common} from '../../common.js'
import {Button, DatePicker, Input, Select} from 'axii-ui'
import {faker} from "@faker-js/faker";


export function AccountForm({}, {createElement}: RenderContext) {

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

    const languages = ['English', 'Spanish', 'French', 'German']


    return (
        <div>
            <div>
                <div style={titleStyle}>Account</div>
                <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
            </div>
            <div style={{...common.separator(false, 2)}}></div>
            <div>
                <div style={itemListContainerStyle}>
                    <div>
                        <div>Name</div>
                        <div>
                            <Input/>
                        </div>
                        <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Date of birth</div>
                        <div>
                            <DatePicker />
                        </div>
                        <div style={common.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Language</div>
                        <div>
                            <Select options={languages} placeholder={'Choose'}/>
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