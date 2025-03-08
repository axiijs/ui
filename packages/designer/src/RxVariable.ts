import { atom, Atom, AutoCleanup, autorun, computed, destroyComputed, RxList, RxMap } from "axii"
import { SizeValue } from "../data/types"

export type VariableType = 'number' | 'size' | 'boolean' | 'string' | 'color' | 'gradient' | 'image'

// Define a type that maps VariableType to its corresponding value type
export type VariableValueType<T extends VariableType> = 
    T extends 'number' ? number :
    T extends 'boolean' ? boolean :
    T extends 'string' | 'color' ? string :
    T extends 'size' ? SizeValue :
    T extends 'gradient' ? string :
    T extends 'image' ? string :
    never;

export type VariableData<T extends VariableType> = {
    id: string
    name: string
    value: VariableValueType<T>
    type: T
}

export type AtomVariable<T extends VariableType> = Omit<VariableData<T>, 'value'> & {
    value: Atom<VariableValueType<T>>
}


export type VariableItem = {id: string, name: Atom<string>, type: Atom<VariableType>, value: Atom<VariableValueType<any>>, refCount: Atom<number>}

// TODO 之后支持 mode/group
export class RxVariable<T extends VariableType> {
    variables: RxList<VariableItem>
    varsById: RxMap<string, VariableItem>
    constructor(public data: VariableData<T>[]) {
        this.variables = new RxList(data.map(item => ({
            id: item.id,
            name: atom(item.name),
            type: atom(item.type),
            value: atom(item.value),
            refCount: atom(0)
        })))
        this.varsById = this.variables.indexBy('id')
    }

    get(id: string) {
        return this.varsById.get(id)||null
    }

    add(variable: Omit<VariableData<any>, 'id'>) {
        this.variables.push({
            // 生成 id
            id: crypto.randomUUID(),
            name: atom(variable.name),
            type: atom(variable.type),
            value: atom(variable.value),
            refCount: atom(0)
        })
    }
}

export class RxVariableRef<T extends VariableType> {
    public id: Atom<string>
    public source: Atom<VariableItem|null>
    stopAutorun: () => void;
    constructor(public root: RxVariable<T>, id: string) {
        this.id = atom(id)
        this.source = atom(this.root.get(id))
        let lastSource = this.source()
        this.stopAutorun = autorun(() => {
            if (lastSource) {
                lastSource.refCount(lastSource.refCount.raw - 1)
            }
            const item = this.root.get(this.id())
            if (item) {
                this.source(item)
                item.refCount(item.refCount.raw + 1)
            }
            lastSource = item
        })
    }
    destroy() {
        this.stopAutorun()
    }
}
