import { atom, Atom, RxMap } from "axii"
import { UnitType } from "../data/types"

export type VariableType = 'number' | 'size' | 'boolean' | 'string' | 'color'

// Define a type that maps VariableType to its corresponding value type
type VariableValueType<T extends VariableType> = 
    T extends 'number' ? number :
    T extends 'boolean' ? boolean :
    T extends 'string' | 'color' ? string :
    T extends 'size' ? [number, UnitType] :
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

// TODO 之后支持 mode/group
export class RxVariable {
    varsById: RxMap<string, AtomVariable<any>>
    constructor(public data: VariableData<any>[]) {
        this.varsById = new RxMap(Object.fromEntries(data.map(d => [d.id, {...d, value: atom(d.value)}])))
    }

    get(id: string) {
        return this.varsById.get(id)?.value
    }

    set(id: string, value: any) {
        this.varsById.get(id)?.value(value)
    }
}
