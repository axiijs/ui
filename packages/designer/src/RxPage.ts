import { Atom, atom, JSXElement, RxList } from "axii";
import { AlignType, BoxInfo, GroupNode, IconNode, LayoutInfo, LayoutType, NodeType, PageNode, TextNode, UnitType } from "../data/types";

// BoxInfo 的 Atom 版本，所有值都用 Atom 包装
export interface AtomBoxInfo {
  width: Atom<[number, UnitType] | null>;
  height: Atom<[number, UnitType] | null>;
  minWidth: Atom<[number, UnitType] | null>;
  maxWidth: Atom<[number, UnitType] | null>;
  minHeight: Atom<[number, UnitType] | null>;
  maxHeight: Atom<[number, UnitType] | null>;
  padding: Atom<[[number, UnitType], [number, UnitType], [number, UnitType], [number, UnitType]] | null>;
  margin: Atom<[[number, UnitType], [number, UnitType], [number, UnitType], [number, UnitType]] | null>;
  overflow: Atom<'visible' | 'hidden' | 'scroll' | 'auto' | null>;
  flexGrow: Atom<number | null>;
  flexShrink: Atom<number | null>;
  flexBasis: Atom<[number, UnitType] | null>;
}

// LayoutInfo 的 Atom 版本，所有值都用 Atom 包装
export interface AtomLayoutInfo {
  type: Atom<LayoutType>;
  gap: Atom<[number, UnitType] | undefined>;
  rowGap: Atom<[number, UnitType] | undefined>;
  columnGap: Atom<[number, UnitType] | undefined>;
  justifyContent: Atom<AlignType | undefined>;
  alignItems: Atom<AlignType | undefined>;
  flexWrap: Atom<'nowrap' | 'wrap' | 'wrap-reverse' | undefined>;
  // Grid 特有属性
  gridTemplateColumns: Atom<string | undefined>;
  gridTemplateRows: Atom<string | undefined>;
  gridAutoFlow: Atom<'row' | 'column' | 'dense' | undefined>;
}

// 基类，所有节点类型都继承自 RxNode
export abstract class RxNode {
    public box: AtomBoxInfo;
    
    constructor(public data: any = null, public root: RxCanvas|null = null) {
        // 初始化 box 属性，将 data.box 中的值转换为 Atom
        this.box = {
            width: atom(data?.box?.width ),
            height: atom(data?.box?.height ),
            minWidth: atom(data?.box?.minWidth),
            maxWidth: atom(data?.box?.maxWidth),
            minHeight: atom(data?.box?.minHeight),
            maxHeight: atom(data?.box?.maxHeight),
            padding: atom(data?.box?.padding),
            margin: atom(data?.box?.margin),
            overflow: atom(data?.box?.overflow),
            flexGrow: atom(data?.box?.flexGrow),
            flexShrink: atom(data?.box?.flexShrink),
            flexBasis: atom(data?.box?.flexBasis)
        };
    }
}

// 基类，用于 RxCanvas、RxPage 和 RxGroup
export abstract class RxCollection<T, C extends RxNode> extends RxNode {
    public children!: RxList<[C, Atom<boolean>]>;
    public selectedNode = atom<C | null>(null);
    public folded = atom<boolean>(true);
    public layout: AtomLayoutInfo;
    
    constructor(data: any = null, root: RxCanvas|null = null) {
        super(data, root);
        // 初始化 layout 属性，将 data.layout 中的值转换为 Atom
        this.layout = {
            type: atom(data?.layout?.type || LayoutType.COLUMN),
            gap: atom(data?.layout?.gap),
            rowGap: atom(data?.layout?.rowGap),
            columnGap: atom(data?.layout?.columnGap),
            justifyContent: atom(data?.layout?.justifyContent),
            alignItems: atom(data?.layout?.alignItems),
            flexWrap: atom(data?.layout?.flexWrap),
            gridTemplateColumns: atom(data?.layout?.gridTemplateColumns),
            gridTemplateRows: atom(data?.layout?.gridTemplateRows),
            gridAutoFlow: atom(data?.layout?.gridAutoFlow)
        };
    }

    // 切换选中节点的方法
    switchSelectedNode(child: C | null): void {
        // 如果已有选中节点，先重置它及其子节点
        const previousSelected = this.selectedNode();
        if (previousSelected && previousSelected !== child) {
            // 如果之前选中的节点也是 RxCollection，递归重置其选中状态
            if (previousSelected instanceof RxCollection) {
                previousSelected.switchSelectedNode(null);
            }
        }
        
        // 设置新的选中节点
        this.selectedNode(child);
        this.folded(false);
    }
}

export class RxTextNode extends RxNode {
    constructor(public data: TextNode, public parent: RxGroup | RxPage, root: any) {
        super(data, root);
    }
}

export class RxIconNode extends RxNode {
    constructor(public data: IconNode, public parent: RxGroup | RxPage, root: any) {
        super(data, root);
    }
}

export class RxGroup extends RxCollection<GroupNode, RxTextNode | RxIconNode | RxGroup> {
    constructor(public data: GroupNode, public parent: RxGroup | RxPage | RxCanvas, root: any) {
        super(data, root);
        this.children = new RxList(data.children.map(item => 
            item.type===NodeType.GROUP ? new RxGroup(item, this, root) : 
            (item.type===NodeType.TEXT ? new RxTextNode(item, this, root) : 
            new RxIconNode(item, this, root))
        )).createSelection(this.selectedNode);
    }
}

export class RxPage extends RxCollection<PageNode, RxTextNode | RxIconNode | RxGroup> {
    public folded = atom<boolean>(false);
    
    constructor(public data: PageNode, public parent: RxCanvas) {
        super(data, parent);
        this.children = (new RxList(data.children.map(item => 
            item.type===NodeType.GROUP ? new RxGroup(item, this, this.root) : 
            (item.type===NodeType.TEXT ? new RxTextNode(item, this, this.root) : 
            new RxIconNode(item, this, this.root))
        ))).createSelection(this.selectedNode);
    }
}

// 定义 RxNodeType 类型，包含所有节点类型
export type RxNodeType = RxPage | RxGroup | RxTextNode | RxIconNode;

export class RxCanvas extends RxCollection<PageNode[], RxPage> {
    public folded = atom<boolean>(false);
    static canvasNodeToRxNodeMap = new WeakMap<HTMLElement, RxNodeType>();
    static rxNodeToCanvasNodeMap = new WeakMap<RxNodeType, HTMLElement>();
    static NavNodeToRxNodeMap = new WeakMap<HTMLElement, RxNodeType>();
    static rxNodeToNavNodeMap = new WeakMap<RxNodeType, HTMLElement>();
    
    constructor(public data: PageNode[]) {
        super(null, null);
        this.children = (new RxList(data.map(item => new RxPage(item, this)))).createSelection(this.selectedNode);
    }
    
    saveCanvasNode(canvasNode: HTMLElement, rxNode: RxNodeType) {
        RxCanvas.canvasNodeToRxNodeMap.set(canvasNode, rxNode);
        RxCanvas.rxNodeToCanvasNodeMap.set(rxNode, canvasNode);
    }
    
    getRxNodeFromCanvasNode(canvasNode: HTMLElement) {
        return RxCanvas.canvasNodeToRxNodeMap.get(canvasNode)
    }
    
    getCanvasNodeFromRxNode(rxNode: RxNodeType) {
        return RxCanvas.rxNodeToCanvasNodeMap.get(rxNode)
    }
    
    saveNavNode(navNode: HTMLElement, rxNode: RxNodeType) {
        RxCanvas.NavNodeToRxNodeMap.set(navNode, rxNode);
        RxCanvas.rxNodeToNavNodeMap.set(rxNode, navNode);
    }
    
    getRxNodeFromNavNode(navNode: HTMLElement) {
        return RxCanvas.NavNodeToRxNodeMap.get(navNode)
    }
    
    getNavNodeFromRxNode(rxNode: RxNodeType) {
        return RxCanvas.rxNodeToNavNodeMap.get(rxNode)
    }
    
    scrollIntoNavigatorView(rxNode: RxNodeType) {
        const navNode = RxCanvas.rxNodeToNavNodeMap.get(rxNode)
        console.log(navNode, rxNode)
        navNode?.scrollIntoView({behavior: 'instant', block: 'center'})
    }
    
    scrollIntoCanvasView() {
        
    }
    
    selectFirstInPath(rxNodePath: RxNodeType[]) {
        let parentRxNode: RxCollection<any, any> = this

        for (const rxNode of rxNodePath) {
            if (parentRxNode!.selectedNode() === rxNode) {
                if (rxNode instanceof RxCollection) {
                    parentRxNode = rxNode
                } else {
                    break
                }
            } else {
                if (parentRxNode instanceof RxCanvas) {
                    parentRxNode.switchSelectedNode(rxNode as RxPage);
                } else if (parentRxNode instanceof RxPage) {
                    parentRxNode.switchSelectedNode(rxNode as RxTextNode | RxIconNode | RxGroup);
                } else if (parentRxNode instanceof RxGroup) {
                    parentRxNode.switchSelectedNode(rxNode as RxTextNode | RxIconNode | RxGroup);
                }
                break
            }
        }

        return parentRxNode!.selectedNode()
    }
}