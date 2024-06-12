import {RenderContext} from "axii";
import {common, variants} from 'axii-ui/themes/inc.js'
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
                            <Select options={[1, 2, 3, 4]} placeholder={'click to choose'}/>
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