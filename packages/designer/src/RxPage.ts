import { Atom, atom, JSXElement, RxList } from "axii";
import { AlignType, BoxInfo, FillInfo, FontInfo, GroupNode, IconNode, LayoutInfo, LayoutType, Node, NodeType, PageNode, TextLayoutInfo, TextNode, UnitType } from "../data/types";

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
  rowGap: Atom<[number, UnitType] | null>;
  columnGap: Atom<[number, UnitType] | null>;
  justifyContent: Atom<AlignType | null>;
  alignItems: Atom<AlignType | null>;
  flexWrap: Atom<'nowrap' | 'wrap' | 'wrap-reverse' | null>;
  // Grid 特有属性
  gridTemplateColumns: Atom<string | null>;
  gridTemplateRows: Atom<string | null>;
  gridAutoFlow: Atom<'row' | 'column' | 'dense' | null>;
}

// FontInfo 的 Atom 版本，所有值都用 Atom 包装
export interface AtomFontInfo {
  fontSize: Atom<[number, UnitType] | null>;
  fontFamily: Atom<string | null>;
  fontWeight: Atom<number | null>;
  fontStyle: Atom<'normal' | 'italic' | null>;
  textDecoration: Atom<'none' | 'underline' | 'line-through' | null>;
  textAlign: Atom<'left' | 'center' | 'right' | 'justify' | null>;
  color: Atom<string | null>;
  lineHeight: Atom<[number, UnitType] | null>;
  letterSpacing: Atom<[number, UnitType] | null>;
  wordSpacing: Atom<[number, UnitType] | null>;
  textTransform: Atom<'none' | 'capitalize' | 'uppercase' | 'lowercase' | null>;
  fontVariant: Atom<'normal' | 'small-caps' | null>;
  fontStretch: Atom<'normal' | 'condensed' | 'expanded' | null>;
}

// TextLayoutInfo 的 Atom 版本，所有值都用 Atom 包装
export interface AtomTextLayoutInfo {
  whiteSpace: Atom<'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | null>;
  textOverflow: Atom<'clip' | 'ellipsis' | null>;
  wordBreak: Atom<'normal' | 'break-all' | 'keep-all' | 'break-word' | null>;
  overflowWrap: Atom<'normal' | 'break-word' | null>;
  hyphens: Atom<'none' | 'manual' | 'auto' | null>;
  direction: Atom<'ltr' | 'rtl' | null>;
  textIndent: Atom<[number, UnitType] | null>;
}

// 基类，所有节点类型都继承自 RxNode
export abstract class RxNode {
    public box: AtomBoxInfo;
    
    constructor(public data: Node, public root: RxCanvas) {
        // 初始化 box 属性，将 data.box 中的值转换为 Atom
        this.box = {
            width: atom(data.box?.width || null),
            height: atom(data?.box?.height || null),
            minWidth: atom(data?.box?.minWidth || null),
            maxWidth: atom(data?.box?.maxWidth || null),
            minHeight: atom(data?.box?.minHeight || null),
            maxHeight: atom(data?.box?.maxHeight || null),
            padding: atom(data?.box?.padding || null),
            margin: atom(data?.box?.margin || null),
            overflow: atom(data?.box?.overflow || null),
            flexGrow: atom(data?.box?.flexGrow || null),
            flexShrink: atom(data?.box?.flexShrink || null),
            flexBasis: atom(data?.box?.flexBasis || null)
        };
        
        
    }
}

// 基类，用于 RxCanvas、RxPage 和 RxGroup
export abstract class RxCollection<T, C extends RxNode> extends RxNode {
    public children!: RxList<[C, Atom<boolean>]>;
    public selectedNode = atom<C | null>(null);
    public folded = atom<boolean>(true);
    public layout: AtomLayoutInfo;
    public fills: RxList<FillInfo>;
    
    constructor( data: PageNode|GroupNode, root: RxCanvas) {
        super(data, root);
        // 初始化 layout 属性，将 data.layout 中的值转换为 Atom
        this.layout = {
            type: atom(data?.layout?.type || LayoutType.COLUMN),
            rowGap: atom(data?.layout?.rowGap || null),
            columnGap: atom(data?.layout?.columnGap || null),
            justifyContent: atom(data?.layout?.justifyContent || null),
            alignItems: atom(data?.layout?.alignItems || null),
            flexWrap: atom(data?.layout?.flexWrap || null),
            gridTemplateColumns: atom(data?.layout?.gridTemplateColumns || null),
            gridTemplateRows: atom(data?.layout?.gridTemplateRows || null),
            gridAutoFlow: atom(data?.layout?.gridAutoFlow || null)
        };
        // 初始化 fills 属性，使用 data.fills 或空数组
        this.fills = new RxList(data?.fills || []);
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
    public font: AtomFontInfo;
    public textLayout: AtomTextLayoutInfo;
    
    constructor(public data: TextNode, public parent: RxGroup | RxPage, root: any) {
        super(data, root);
        
        // 初始化 font 属性，将 data.font 中的值转换为 Atom
        this.font = {
            fontSize: atom(data?.font?.fontSize || null),
            fontFamily: atom(data?.font?.fontFamily || null),
            fontWeight: atom(data?.font?.fontWeight || null),
            fontStyle: atom(data?.font?.fontStyle || null),
            textDecoration: atom(data?.font?.textDecoration || null),
            textAlign: atom(data?.font?.textAlign || null),
            color: atom(data?.font?.color || null),
            lineHeight: atom(data?.font?.lineHeight || null),
            letterSpacing: atom(data?.font?.letterSpacing || null),
            wordSpacing: atom(data?.font?.wordSpacing || null),
            textTransform: atom(data?.font?.textTransform || null),
            fontVariant: atom(data?.font?.fontVariant || null),
            fontStretch: atom(data?.font?.fontStretch || null)
        };
        
        // 初始化 textLayout 属性，将 data.textLayout 中的值转换为 Atom
        this.textLayout = {
            whiteSpace: atom(data?.textLayout?.whiteSpace || null),
            textOverflow: atom(data?.textLayout?.textOverflow || null),
            wordBreak: atom(data?.textLayout?.wordBreak || null),
            overflowWrap: atom(data?.textLayout?.overflowWrap || null),
            hyphens: atom(data?.textLayout?.hyphens || null),
            direction: atom(data?.textLayout?.direction || null),
            textIndent: atom(data?.textLayout?.textIndent || null)
        };
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
            new RxIconNode(item as IconNode, this, root))
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
            new RxIconNode(item as IconNode, this, this.root))
        ))).createSelection(this.selectedNode);
    }
}

// 定义 RxNodeType 类型，包含所有节点类型
export type RxNodeType = RxPage | RxGroup | RxTextNode | RxIconNode;

export class RxCanvas {
    public folded = atom<boolean>(false);
    static canvasNodeToRxNodeMap = new WeakMap<HTMLElement, RxNodeType>();
    static rxNodeToCanvasNodeMap = new WeakMap<RxNodeType, HTMLElement>();
    static NavNodeToRxNodeMap = new WeakMap<HTMLElement, RxNodeType>();
    static rxNodeToNavNodeMap = new WeakMap<RxNodeType, HTMLElement>();
    public children: RxList<[RxPage, Atom<boolean>]>;
    public selectedNode = atom<RxPage | null>(null);
    constructor(public data: PageNode[]) {
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
        navNode?.scrollIntoView({behavior: 'instant', block: 'center'})
    }
    
    scrollIntoCanvasView() {
        
    }
    // 切换选中节点的方法
    switchSelectedNode(child: RxPage | null): void {
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
    selectFirstInPath(rxNodePath: RxNodeType[]) {
        let parentRxNode: RxCollection<any, any>|RxCanvas = this

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