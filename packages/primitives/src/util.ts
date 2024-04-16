export function parseChildren(children: any, format:  any) {

    return {
        get(type: any) {
            return children.find((child: any) => child.type === type)
        }
    }
}