import {RenderContext} from "axii";
import {common, variants} from 'axii-ui/themes/inc'
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
                            <Select options={[1, 2, 3, 4]} placeholder={'click to choose'}/>
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
                    <Button {...variants.Button.primary} type={'primary'}>Save</Button>
                </div>
            </div>
        </div>
    )
}