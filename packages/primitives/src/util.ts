export function parseChildren(children: any, format:  any) {

    return {
        get(type: any) {
            return children.find((child: any) => child.type === type)
        }
    }
}

export const ensureArray = (value: any) => {
    return Array.isArray(value) ? value : [value]
}

export function assert(condition: boolean, message: string ) {
    if (!condition) {
        throw new Error(message)
    }
}