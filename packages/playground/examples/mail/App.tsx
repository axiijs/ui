import {atom, RenderContext} from "axii";
import {common} from '../../common.js'
import {ControlPanel} from "./ControlPanel.js";
import {BoxPanel} from "./BoxPanel.js";
import {DetailPanel} from "./DetailPanel.js";
import {MailData} from "./Mail.js";
import { faker } from '@faker-js/faker';

const data: MailData[] = Array(10).fill(0).map(() => {
    return {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        date: faker.date.recent().toDateString(),
        from: faker.internet.email(),
    } as MailData
})




export function App({}, {createElement}: RenderContext) {
    const selected = atom<MailData|null>(null)

    const containerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        '&>*': {
            borderRight: `1px solid ${common.colors.line.border.normal()}`,
            '&:last-child': {
                borderRight: 'none'
            }
        }
    }

    const controlPanelStyle = {
        flexBasis: 200,
        flexShrink:1,
        flexGrow: 0
    }

    const boxPanelStyle = {
        flexGrow: 1,
        flexShrink: 2,
    }

    const DetailPanelStyle = {
        flexShrink: 0,
        flexBasis: 400,
        width:400,
        flexGrow: 0
    }

    return <div style={containerStyle}>
        <div style={controlPanelStyle}>
            <ControlPanel/>
        </div>
        <div style={boxPanelStyle}>
            <BoxPanel data={data} selected={selected}/>
        </div>
        <div style={DetailPanelStyle}>
            <DetailPanel mail={selected}/>
        </div>
    </div>;
}
