import {RenderContext, RxList} from "axii";
import {Button, Column} from "axii-ui";
import {common} from "../common.js";



export function Demo({}, {createElement}: RenderContext) {

    const items = new RxList(Array(10).fill(1).map((_, i) => ({id:i, value:`item ${i}`})))

    const staticItemsWithOrder = items.map((item, index) => [item, index]).toMap().entries()

    const swap1To3 = () => {
        items.swap(1, 3)
    }

    const reposition3To5 = () => {
        items.reposition(3, 5, 2)
    }

    const sort = () => {
        items.sortSelf((a, b) => a.id - b.id)
    }

    const random = () => {
        items.sortSelf(() => Math.random() - 0.5)
    }

    const insert = () => {
        items.splice(5, 0, {id: 10, value: 'inserted item'})
    }

    const columnStyle = {
        '&>*': {
            transition: 'transform 0.3s ease'
        }
    }

    return (<div style={common.layout.column({gap:10})}>
        <div style={common.layout.row({gap:10, flexWrap:'wrap'})}>
            <Button $root:onClick={swap1To3}>swap 1 to 3</Button>
            <Button $root:onClick={reposition3To5}>reposition</Button>
            <Button $root:onClick={sort}>sort</Button>
            <Button $root:onClick={random}>random</Button>
            <Button $root:onClick={insert}>insert</Button>
        </div>
        <Column gap={10} $root:style={columnStyle}>
            {staticItemsWithOrder.map(([item, index]) => {
                const style = {borderWidth:1,...common.textBox({color:'black',colorBox:true })}
                return (
                    <div style={style} data-order={index}>
                        <span>{item.value}</span>
                        <span>{() => `order:${index()}`}</span>
                    </div>
                )
            })}
        </Column>
    </div>)
}