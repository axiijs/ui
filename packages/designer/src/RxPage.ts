import { Atom, atom, JSXElement, RxList } from "axii";
import { AlignType, BoxInfo, FillInfo, FontInfo, GroupNode, IconNode, LayoutInfo, LayoutType, Node, NodeType, PageNode, TextLayoutInfo, TextNode, UnitType, VariableValue } from "../data/types";

// 支持变量的 Atom 值类型
export interface AtomVariableValue<T> {
  value: Atom<T | null>;
  variable: Atom<string | undefined>;
}

// BoxInfo 的 Atom 版本，所有值都用 AtomVariableValue 包装
export interface AtomBoxInfo {
  width: AtomVariableValue<[number, UnitType]>;
  height: AtomVariableValue<[number, UnitType]>;
  minWidth: AtomVariableValue<[number, UnitType]>;
  maxWidth: AtomVariableValue<[number, UnitType]>;
  minHeight: AtomVariableValue<[number, UnitType]>;
  maxHeight: AtomVariableValue<[number, UnitType]>;
  padding: AtomVariableValue<[[number, UnitType], [number, UnitType], [number, UnitType], [number, UnitType]]>;
  margin: AtomVariableValue<[[number, UnitType], [number, UnitType], [number, UnitType], [number, UnitType]]>;
  overflow: AtomVariableValue<'visible' | 'hidden' | 'scroll' | 'auto'>;
  flexGrow: AtomVariableValue<number>;
  flexShrink: AtomVariableValue<number>;
  flexBasis: AtomVariableValue<[number, UnitType]>;
}

// LayoutInfo 的 Atom 版本，所有值都用 AtomVariableValue 包装
export interface AtomLayoutInfo {
  type: AtomVariableValue<LayoutType>;
  rowGap: AtomVariableValue<[number, UnitType]>;
  columnGap: AtomVariableValue<[number, UnitType]>;
  justifyContent: AtomVariableValue<AlignType>;
  alignItems: AtomVariableValue<AlignType>;
  flexWrap: AtomVariableValue<'nowrap' | 'wrap' | 'wrap-reverse'>;
  // Grid 特有属性
  gridTemplateColumns: AtomVariableValue<string>;
  gridTemplateRows: AtomVariableValue<string>;
  gridAutoFlow: AtomVariableValue<'row' | 'column' | 'dense'>;
}

// FontInfo 的 Atom 版本，所有值都用 AtomVariableValue 包装
export interface AtomFontInfo {
  fontSize: AtomVariableValue<[number, UnitType]>;
  fontFamily: AtomVariableValue<string>;
  fontWeight: AtomVariableValue<number>;
  fontStyle: AtomVariableValue<'normal' | 'italic'>;
  textDecoration: AtomVariableValue<'none' | 'underline' | 'line-through'>;
  textAlign: AtomVariableValue<'left' | 'center' | 'right' | 'justify'>;
  color: AtomVariableValue<string>;
  lineHeight: AtomVariableValue<[number, UnitType]>;
  letterSpacing: AtomVariableValue<[number, UnitType]>;
  wordSpacing: AtomVariableValue<[number, UnitType]>;
  textTransform: AtomVariableValue<'none' | 'capitalize' | 'uppercase' | 'lowercase'>;
  fontVariant: AtomVariableValue<'normal' | 'small-caps'>;
  fontStretch: AtomVariableValue<'normal' | 'condensed' | 'expanded'>;
}

// TextLayoutInfo 的 Atom 版本，所有值都用 AtomVariableValue 包装
export interface AtomTextLayoutInfo {
  whiteSpace: AtomVariableValue<'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'>;
  textOverflow: AtomVariableValue<'clip' | 'ellipsis'>;
  wordBreak: AtomVariableValue<'normal' | 'break-all' | 'keep-all' | 'break-word'>;
  overflowWrap: AtomVariableValue<'normal' | 'break-word'>;
  hyphens: AtomVariableValue<'none' | 'manual' | 'auto'>;
  direction: AtomVariableValue<'ltr' | 'rtl'>;
  textIndent: AtomVariableValue<[number, UnitType]>;
}

// 基类，所有节点类型都继承自 RxNode
export abstract class RxNode {
    public box: AtomBoxInfo;
    
    constructor(public data: Node, public root: RxCanvas) {
        // 初始化 box 属性，将 data.box 中的值转换为 AtomVariableValue
        this.box = {
            width: {
                value: atom(data.box?.width?.value || null),
                variable: atom(data.box?.width?.variable)
            },
            height: {
                value: atom(data?.box?.height?.value || null),
                variable: atom(data?.box?.height?.variable)
            },
            minWidth: {
                value: atom(data?.box?.minWidth?.value || null),
                variable: atom(data?.box?.minWidth?.variable)
            },
            maxWidth: {
                value: atom(data?.box?.maxWidth?.value || null),
                variable: atom(data?.box?.maxWidth?.variable)
            },
            minHeight: {
                value: atom(data?.box?.minHeight?.value || null),
                variable: atom(data?.box?.minHeight?.variable)
            },
            maxHeight: {
                value: atom(data?.box?.maxHeight?.value || null),
                variable: atom(data?.box?.maxHeight?.variable)
            },
            padding: {
                value: atom(data?.box?.padding?.value || null),
                variable: atom(data?.box?.padding?.variable)
            },
            margin: {
                value: atom(data?.box?.margin?.value || null),
                variable: atom(data?.box?.margin?.variable)
            },
            overflow: {
                value: atom(data?.box?.overflow?.value || null),
                variable: atom(data?.box?.overflow?.variable)
            },
            flexGrow: {
                value: atom(data?.box?.flexGrow?.value || null),
                variable: atom(data?.box?.flexGrow?.variable)
            },
            flexShrink: {
                value: atom(data?.box?.flexShrink?.value || null),
                variable: atom(data?.box?.flexShrink?.variable)
            },
            flexBasis: {
                value: atom(data?.box?.flexBasis?.value || null),
                variable: atom(data?.box?.flexBasis?.variable)
            }
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
        // 初始化 layout 属性，将 data.layout 中的值转换为 AtomVariableValue
        this.layout = {
            type: {
                value: atom(data?.layout?.type?.value || LayoutType.COLUMN),
                variable: atom(data?.layout?.type?.variable)
            },
            rowGap: {
                value: atom(data?.layout?.rowGap?.value || null),
                variable: atom(data?.layout?.rowGap?.variable)
            },
            columnGap: {
                value: atom(data?.layout?.columnGap?.value || null),
                variable: atom(data?.layout?.columnGap?.variable)
            },
            justifyContent: {
                value: atom(data?.layout?.justifyContent?.value || null),
                variable: atom(data?.layout?.justifyContent?.variable)
            },
            alignItems: {
                value: atom(data?.layout?.alignItems?.value || null),
                variable: atom(data?.layout?.alignItems?.variable)
            },
            flexWrap: {
                value: atom(data?.layout?.flexWrap?.value || null),
                variable: atom(data?.layout?.flexWrap?.variable)
            },
            gridTemplateColumns: {
                value: atom(data?.layout?.gridTemplateColumns?.value || null),
                variable: atom(data?.layout?.gridTemplateColumns?.variable)
            },
            gridTemplateRows: {
                value: atom(data?.layout?.gridTemplateRows?.value || null),
                variable: atom(data?.layout?.gridTemplateRows?.variable)
            },
            gridAutoFlow: {
                value: atom(data?.layout?.gridAutoFlow?.value || null),
                variable: atom(data?.layout?.gridAutoFlow?.variable)
            }
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
    public content: AtomVariableValue<string>;
    
    constructor(public data: TextNode, public parent: RxGroup | RxPage, root: any) {
        super(data, root);
        
        // 初始化 content 属性，将 data.content 转换为 AtomVariableValue
        this.content = {
            value: atom(data?.content?.value || null),
            variable: atom(data?.content?.variable)
        };
        
        // 初始化 font 属性，将 data.font 中的值转换为 AtomVariableValue
        this.font = {
            fontSize: {
                value: atom(data?.font?.fontSize?.value || null),
                variable: atom(data?.font?.fontSize?.variable)
            },
            fontFamily: {
                value: atom(data?.font?.fontFamily?.value || null),
                variable: atom(data?.font?.fontFamily?.variable)
            },
            fontWeight: {
                value: atom(data?.font?.fontWeight?.value || null),
                variable: atom(data?.font?.fontWeight?.variable)
            },
            fontStyle: {
                value: atom(data?.font?.fontStyle?.value || null),
                variable: atom(data?.font?.fontStyle?.variable)
            },
            textDecoration: {
                value: atom(data?.font?.textDecoration?.value || null),
                variable: atom(data?.font?.textDecoration?.variable)
            },
            textAlign: {
                value: atom(data?.font?.textAlign?.value || null),
                variable: atom(data?.font?.textAlign?.variable)
            },
            color: {
                value: atom(data?.font?.color?.value || null),
                variable: atom(data?.font?.color?.variable)
            },
            lineHeight: {
                value: atom(data?.font?.lineHeight?.value || null),
                variable: atom(data?.font?.lineHeight?.variable)
            },
            letterSpacing: {
                value: atom(data?.font?.letterSpacing?.value || null),
                variable: atom(data?.font?.letterSpacing?.variable)
            },
            wordSpacing: {
                value: atom(data?.font?.wordSpacing?.value || null),
                variable: atom(data?.font?.wordSpacing?.variable)
            },
            textTransform: {
                value: atom(data?.font?.textTransform?.value || null),
                variable: atom(data?.font?.textTransform?.variable)
            },
            fontVariant: {
                value: atom(data?.font?.fontVariant?.value || null),
                variable: atom(data?.font?.fontVariant?.variable)
            },
            fontStretch: {
                value: atom(data?.font?.fontStretch?.value || null),
                variable: atom(data?.font?.fontStretch?.variable)
            }
        };
        
        // 初始化 textLayout 属性，将 data.textLayout 中的值转换为 AtomVariableValue
        this.textLayout = {
            whiteSpace: {
                value: atom(data?.textLayout?.whiteSpace?.value || null),
                variable: atom(data?.textLayout?.whiteSpace?.variable)
            },
            textOverflow: {
                value: atom(data?.textLayout?.textOverflow?.value || null),
                variable: atom(data?.textLayout?.textOverflow?.variable)
            },
            wordBreak: {
                value: atom(data?.textLayout?.wordBreak?.value || null),
                variable: atom(data?.textLayout?.wordBreak?.variable)
            },
            overflowWrap: {
                value: atom(data?.textLayout?.overflowWrap?.value || null),
                variable: atom(data?.textLayout?.overflowWrap?.variable)
            },
            hyphens: {
                value: atom(data?.textLayout?.hyphens?.value || null),
                variable: atom(data?.textLayout?.hyphens?.variable)
            },
            direction: {
                value: atom(data?.textLayout?.direction?.value || null),
                variable: atom(data?.textLayout?.direction?.variable)
            },
            textIndent: {
                value: atom(data?.textLayout?.textIndent?.value || null),
                variable: atom(data?.textLayout?.textIndent?.variable)
            }
        };
    }
}

export class RxIconNode extends RxNode {
    public size: AtomVariableValue<[number, UnitType]>;
    public color: AtomVariableValue<string>;
    
    constructor(public data: IconNode, public parent: RxGroup | RxPage, root: any) {
        super(data, root);
        
        // 初始化 size 和 color 属性，将 data 中的值转换为 AtomVariableValue
        this.size = {
            value: atom(data?.size?.value || null),
            variable: atom(data?.size?.variable)
        };
        
        this.color = {
            value: atom(data?.color?.value || null),
            variable: atom(data?.color?.variable)
        };
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