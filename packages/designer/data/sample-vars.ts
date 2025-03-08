import { VariableData } from "../src/RxVariable";
import { UnitType } from "./types";

export const sampleVars: VariableData<any>[] = [
    {
        id: 'common-height',
        name: 'common-height',
        value: [32, UnitType.PX],
        type: 'size',
    },
    {
        id: 'primary-color',
        name: 'primary-color',
        value: 'rgba(45, 115, 158, 0.8)',
        type: 'color',
    },
    {
        id: 'font-size-base',
        name: 'font-size-base',
        value: [14, UnitType.PX],
        type: 'size',
    },
    {
        id: 'border-radius',
        name: 'border-radius',
        value: [4, UnitType.PX],
        type: 'size',
    },
    {
        id: 'is-dark-mode',
        name: 'is-dark-mode',
        value: true,
        type: 'boolean',
    },
    {
        id: 'max-width',
        name: 'max-width',
        value: [1200, UnitType.PX],
        type: 'size',
    },
    {
        id: 'font-family',
        name: 'font-family',
        value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        type: 'string',
    },
    {
        id: 'z-index-base',
        name: 'z-index-base',
        value: 1000,
        type: 'number',
    },
    {
        id: 'container-padding',
        name: 'container-padding',
        value: [24, UnitType.PX],
        type: 'size',
    },
    {
        id: 'success-color',
        name: 'success-color',
        value: '#52c41a',
        type: 'color',
    }
]