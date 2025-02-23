import {RenderContext} from "axii";
import {styleSystem} from '../../styleSystem'
import {Button, DatePicker, Input, Select} from 'axii-ui'
import {faker} from "@faker-js/faker";


export function AccountForm({}, {createElement}: RenderContext) {

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

    const languages = ['English', 'Spanish', 'French', 'German']


    return (
        <div>
            <div>
                <div style={titleStyle}>Account</div>
                <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
            </div>
            <div style={{...styleSystem.separator(false, 2)}}></div>
            <div>
                <div style={itemListContainerStyle}>
                    <div>
                        <div>Name</div>
                        <div>
                            <Input/>
                        </div>
                        <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Date of birth</div>
                        <div>
                            <DatePicker />
                        </div>
                        <div style={styleSystem.supportiveText}>{faker.lorem.paragraph()}</div>
                    </div>
                    <div>
                        <div>Language</div>
                        <div>
                            <Select options={languages} placeholder={'Choose'}/>
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