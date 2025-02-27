import { Atom, RenderContext, RxList } from "axii";
import { RxCanvas, RxGroup, RxIconNode, RxPage, RxTextNode } from "./RxPage";
import { panelNameStyle } from "./style";

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
            <div as={'title'} style={panelNameStyle}>Layers</div>
            {canvas.children.map(([page, selected]) => (
                <PageLayer page={page} selected={selected} level={1} />
            ))}
        </div>
    )
}

export function PageLayer({page, selected, level}: {page: RxPage, selected: Atom<boolean>, level: number}, {createElement}: RenderContext) {
    const nameStyle = commonNameStyle(selected, level, page.selectedNode)

    return (
        <div style={childrenWrapperStyle}>
            <div style={nameStyle}>{page.data.name}</div>
            <div style={childrenWrapperStyle}>
                { page.children.map(([child, selected]) => renderLayer(child, selected, level + 1, createElement))}
            </div>
        </div>
    )
}



export function GroupLayer({group, selected, level}: {group: RxGroup, selected: Atom<boolean>, level:number}, {createElement}: RenderContext) {
    const nameStyle = commonNameStyle(selected, level, group.selectedNode)

    console.log(selected()  )
    return (
        <div style={childrenWrapperStyle}>
            <div style={nameStyle}>{group.data.name}</div>
            <div style={childrenWrapperStyle}>
                { group.children.map(([child, selected]) => renderLayer(child, selected, level + 1, createElement))}
            </div>
            
        </div>
    )
}

function renderLayer(layer:RxGroup|RxTextNode|RxIconNode, selected: Atom<boolean>, level: number, createElement:RenderContext['createElement']) {
    if (layer instanceof RxGroup) {
        return <GroupLayer group={layer} selected={selected} level={level} />
    } else if (layer instanceof RxTextNode) {
        return <TextLayer text={layer} selected={selected} level={level} />
    } else if (layer instanceof RxIconNode) {
        return <IconLayer icon={layer} selected={selected} level={level} />
    }
}

export function TextLayer({text, selected, level}: {text: RxTextNode, selected: Atom<boolean>, level: number}, {createElement}: RenderContext) {
    const nameStyle = commonNameStyle(selected, level)
    return (
        <div>
            <div style={nameStyle}>{text.data.name}</div>
        </div>
    )
}

export function IconLayer({icon, selected, level}: {icon: RxIconNode, selected: Atom<boolean>, level: number}, {createElement}: RenderContext) {
    const nameStyle = commonNameStyle(selected, level)
    return (
        <div>
            <div style={nameStyle}>{icon.data.name}</div>
        </div>
    )
}