import { Atom, JSXElement, RenderContext, RxList } from "axii";
import { RxCanvas, RxCollection, RxGroup, RxIconNode, RxPage, RxTextNode } from "./RxPage";

export type LayersPanelProps = {
    canvas: RxCanvas
}

const childrenWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
}



function commonNameStyle(selected: Atom<boolean>, level: number, selectedNode?: Atom<any>) {
    return () => {
        const currentSelected = selected() && (!selectedNode || !selectedNode())

        return {
            height: 28,
            display: 'flex',
            alignItems: 'center',
            gap:4,
            minHeight: 0,
            paddingLeft: level * 10,
            color: 'white',
            backgroundColor: currentSelected? '#517361' : 'transparent',
            '&:hover': {
                backgroundColor: currentSelected ? '#517361' : '#383838',
            }
        }
    }
}


export function LayersPanel({ canvas}: LayersPanelProps, {createElement}: RenderContext) {
    return (
        <div as={'root'}>
            <div as={'name'}>Layers</div>
            {canvas.childrenWithSelection.map(([page, selected]) => (
                <PageLayer page={page} selected={selected} level={1} />
            ))}
        </div>
    )
}


export function TextLayer({text, selected, level}: {text: RxTextNode, selected: Atom<boolean>, level: number}, {createElement}: RenderContext) {
    return (
        <div>
            <div as='nameContainer'>
                <div as='name' onClick={() => text.select()}>{text.data.name}</div>
            </div>
        </div>
    )
}

export function IconLayer({icon, selected, level}: {icon: RxIconNode, selected: Atom<boolean>, level: number}, {createElement}: RenderContext) {
    return (
        <div>
            <div as='nameContainer'>
                <div as='name' onClick={() => icon.select()}>{icon.data.name}</div>
            </div>
        </div>
    )
}



export function PageLayer({page, selected, level}: {page: RxPage, selected: Atom<boolean>, level: number}, {createElement}: RenderContext) {

    return (
        <div style={childrenWrapperStyle}>
            <div as='nameContainer'>
                <div as='name' onClick={() => page.select()}>{page.data.name}</div>
            </div>
            <div as='childrenContainer'>
                { page.childrenWithSelection.map(([child, selected]) => renderLayer(child, selected, level + 1, createElement))}
            </div>
        </div>
    )
}



export function GroupLayer({group, selected, level}: {group: RxGroup, selected: Atom<boolean>, level:number}, {createElement}: RenderContext) {

    return (
        <div style={childrenWrapperStyle}>
            <div as='nameContainer'>
                <div style={{width:10}} onClick={() => group.folded(!group.folded())}>{() => group.folded() ? '+' : '-'}</div>
                <div as='name' onClick={() => group.select()}>{group.data.name}</div>
            </div>
            <div as='childrenContainer'>
                { group.childrenWithSelection.map(([child, selected]) => renderLayer(child, selected, level + 1, createElement))}
            </div>
        </div>
    )
}


const commonChildrenContainerStyle = (layer: RxGroup|RxTextNode|RxIconNode) => ()=>({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: (layer as any).folded?.() ? 0 : 10000,
    overflow: 'hidden',
})


function renderLayer(layer:RxGroup|RxTextNode|RxIconNode, selected: Atom<boolean>, level: number, createElement:RenderContext['createElement']) {
    const nameStyle = commonNameStyle(selected, level, (layer as any).selectedNode)
    const childrenContainerStyle = commonChildrenContainerStyle(layer)
    
    if (layer instanceof RxGroup) {
        return <GroupLayer group={layer} selected={selected} level={level} $name:ref={(el:HTMLElement) => layer.root.saveNavNode(el, layer)} $nameContainer:style={nameStyle} $childrenContainer:style={childrenContainerStyle}/>
    } else if (layer instanceof RxTextNode) {
        return <TextLayer text={layer} selected={selected} level={level} $name:ref={(el:HTMLElement) => layer.root.saveNavNode(el, layer)} $nameContainer:style={nameStyle} $childrenContainer:style={childrenContainerStyle}/>
    } else if (layer instanceof RxIconNode) {
        return <IconLayer icon={layer} selected={selected} level={level} $name:ref={(el:HTMLElement) => layer.root.saveNavNode(el, layer)} $nameContainer:style={nameStyle} $childrenContainer:style={childrenContainerStyle}/>
    }
}
