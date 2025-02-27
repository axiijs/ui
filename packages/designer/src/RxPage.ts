import { Atom, atom, RxList } from "axii";
import { GroupNode, IconNode, NodeType, PageNode, TextNode } from "../data/types";

export class RxTextNode {
    constructor(public data: TextNode) {
    }
}

export class RxIconNode {
    constructor(public data: IconNode) {
    }
}


export class RxGroup {
    public children: RxList<[RxGroup|RxTextNode|RxIconNode, Atom<boolean>]>
    public selectedNode = atom<RxGroup|RxTextNode|RxIconNode>(null)
    constructor(public data: GroupNode) {
        this.children = new RxList(data.children.map(item => 
            item.type===NodeType.GROUP ? new RxGroup(item) : (item.type===NodeType.TEXT ? new RxTextNode(item) : new RxIconNode(item))
        )).createSelection(this.selectedNode)
    }
    
    
}


export class RxPage{
    public children: RxList<[RxGroup|RxTextNode|RxIconNode, Atom<boolean>]>
    public selectedNode = atom<RxGroup|RxTextNode|RxIconNode>(null)
    constructor(public data: PageNode) {
        this.children = (new RxList(data.children.map(item => 
            item.type===NodeType.GROUP ? new RxGroup(item) : (item.type===NodeType.TEXT ? new RxTextNode(item) : new RxIconNode(item))
        ))).createSelection(this.selectedNode)
        console.log(this.children)
    }
}

export class RxCanvas {
    public children: RxList<[RxPage, Atom<boolean>]>
    public selectedNode = atom<RxPage>(null)
    constructor(public data: PageNode[]) {
        this.children = (new RxList(data.map(item => new RxPage(item)))).createSelection(this.selectedNode)
    }
}