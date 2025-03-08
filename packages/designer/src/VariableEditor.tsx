import { atom, Atom, autorun, autoUnit, computed, RenderContext } from "axii";
import { RxCanvas } from "./RxPage";
import { RxVariable, VariableType, VariableValueType } from "./RxVariable";
import { Draft } from "./lib/Draft";
import { Select} from './lib/Select'
import { SizeInput } from "./lib/SizeInput";
import { UnitType } from "../data/types";
import { Checkbox } from "./lib/Checkbox";
import { ColorInput } from "./lib/ColorInput";
import { GradientEditor } from "./lib/GradientEditor";

export type VariableEditorProps = {
    rxCanvas: RxCanvas
    rxVariable: RxVariable<any>

}
export function VariableEditor({rxCanvas, rxVariable}: VariableEditorProps, {createElement}: RenderContext) {
    const containerStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        color: 'black',
        overflow: 'auto',
        boxSizing: 'border-box',
        padding: [0, 100],
    }


    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid black',
        borderWidth: 1,
        '& th,td': {
            padding: [4, 8],
            border: '1px solid black',
        }
    }

    return <div style={containerStyle}>
        <h1>Variable Editor</h1>
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Ref Count</th>
                </tr>
            </thead>
            <tbody>
                {rxVariable.variables.map(variable => {
                    const nameDraft = new Draft<string>(variable.name)
                    const nameValid = computed(() => {
                        return nameDraft.value() && (nameDraft.value() == nameDraft.source() || !rxVariable.variables.find(v => v.name() === nameDraft.value())())
                    })


                    const onNameBlur = () => {
                        if (nameValid()) {
                            nameDraft.commit()
                        }
                    }

                    const inputStyle = () =>( {
                        border: 'none',
                        outline: nameValid() ? '1px solid black' : '1px solid red',
                    })

                    return (
                        <tr >
                            <td>{variable.id}</td>
                            <td>
                                <div>
                                    <div>
                                    <input 
                                        type="text" 
                                        value={nameDraft.value} 
                                        onChange={(e: InputEvent) => nameDraft.value((e.target as HTMLInputElement).value)} 
                                        onBlur={onNameBlur}
                                        style={inputStyle}
                                    />
                                    </div>
                                </div>
                            </td>
                            <td>{variable.type}</td>
                            <td>{
                            () => {
                                if (variable.type.raw == 'size') {
                                    return <SizeInput value={variable.value as Atom<[number, UnitType] | null>}/>
                                } else if (variable.type.raw == 'number') {
                                    return <input type="number" value={variable.value} onChange={(e: InputEvent) => variable.value((e.target as HTMLInputElement).value)}/>
                                } else if(variable.type.raw == 'string') {
                                    const valueDraft = new Draft<VariableValueType<any>>(variable.value)
                                    return <input type="text" value={valueDraft.value} onChange={(e: InputEvent) => valueDraft.value((e.target as HTMLInputElement).value)}/>
                                } else if(variable.type.raw == 'boolean') {
                                    return <Checkbox value={variable.value} $root:onClick={() => variable.value(!variable.value())}/>
                                } else if(variable.type.raw === 'color') {
                                    return <ColorInput value={variable.value as Atom<string>} />
                                }
                            }}
                            </td>
                            <td>{variable.refCount}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <GradientEditor value={atom('linear-gradient(to right, #000000, #ffffff)') as Atom<string>}/>
    </div>
}