import { VariableData } from "../src/RxVariable";
import { UnitType } from "./types";

export const sampleVars: VariableData<any>[] = [
    {
        id: 'common-height',
        name: 'common-height',
        value: [32, UnitType.PX],
        type: 'size',
    }
]