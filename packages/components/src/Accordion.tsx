import {atom, Component, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";
import Left from 'axii-icon-park/Left.js'

const AccordionItemProptypes = {
    title: PropTypes.atom<any>().isRequired,
    content: PropTypes.atom<any>().isRequired,
    visible: PropTypes.atom<boolean>().default(() => atom(false)),
}


export const AccordionItem: Component = function(props: FixedCompatiblePropsType<typeof AccordionItemProptypes>, {createElement, createRxRef}: RenderContext) {
    const { title, content, visible } = props as PropsType<typeof AccordionItemProptypes>
    const contentRef = createRxRef()


    const contentContainerStyle= () => ({
        height: visible() ?  contentRef.current.getBoundingClientRect().height : 0,
        overflow: 'hidden',
    })

    const headStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    }

    return (
        <div as={'root'}>
            <div as={'head'} style={headStyle} onClick={() => visible(!visible())}>
                <div as={'title'}>{title}</div>
                <div as={'handle'} ><Left/></div>
            </div>
            <div as={'contentContainer'} style={contentContainerStyle}>
                <div as={'content'} ref={contentRef}>{content}</div>
            </div>
        </div>
    )
}

AccordionItem.propTypes = AccordionItemProptypes

type ItemType = {
    title: any,
    content: any,
    visible?: any
}

const AccordionProptypes = {
    items: PropTypes.rxList<ItemType>().isRequired,
}
export const Accordion: Component = function(props: FixedCompatiblePropsType<typeof AccordionProptypes>, {createElement}: RenderContext) {
    const { items } = props as PropsType<typeof AccordionProptypes>

    return <div as='root'>{items.map(item => (
        <AccordionItem as='item' title={item.title} content={item.content} visible={item.visible}/>
    ))}</div>
}
