import { VariableData } from "../src/RxVariable";
import { UnitType, GradientValue } from "./types";

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
    },
    {
        id: 'primary-gradient',
        name: 'primary-gradient',
        value: {
            type: 'linear',
            attributes: {
                direction: 'to right',
                angle: 90
            },
            stops: [
                {
                    color: '#4158D0',
                    position: 0
                },
                {
                    color: '#C850C0',
                    position: 0.5
                },
                {
                    color: '#FFCC70',
                    position: 1
                }
            ]
        },
        type: 'gradient',
    },
    {
        id: 'button-gradient',
        name: 'button-gradient',
        value: {
            type: 'linear',
            attributes: {
                direction: 'to bottom',
                angle: 180
            },
            stops: [
                {
                    color: '#00c6ff',
                    position: 0
                },
                {
                    color: '#0072ff',
                    position: 1
                }
            ]
        },
        type: 'gradient',
    },
    {
        id: 'radial-gradient-example',
        name: 'radial-gradient-example',
        value: {
            type: 'radial',
            attributes: {
                shape: 'circle',
                position: 'center'
            },
            stops: [
                {
                    color: '#ffffff',
                    position: 0
                },
                {
                    color: '#383539',
                    position: 0.5
                },
                {
                    color: '#892357',
                    position: 1
                }
            ]
        },
        type: 'gradient',
    },
    {
        id: 'conic-gradient-example',
        name: 'conic-gradient-example',
        value: {
            type: 'conic',
            attributes: {
                angle: 0,
                position: 'center'
            },
            stops: [
                {
                    color: '#ff0000',
                    position: 0
                },
                {
                    color: '#ffff00',
                    position: 0.25
                },
                {
                    color: '#00ff00',
                    position: 0.5
                },
                {
                    color: '#00ffff',
                    position: 0.75
                },
                {
                    color: '#ff00ff',
                    position: 1
                }
            ]
        },
        type: 'gradient',
    }
]