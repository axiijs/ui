import {RenderContext, RxList} from "axii";
import {Accordion} from "axii-ui";

const accoridonItems = new RxList([
    {title: 'test title 1', content: 'anyone knows'.repeat(50)},
    {title: 'test title 2', content: 'anyone knows'.repeat(50)},
    {title: 'test title 3', content: 'anyone knows'.repeat(50)},
])

export function Demo({}, {createElement}: RenderContext) {
    return <Accordion items={accoridonItems}/>
}