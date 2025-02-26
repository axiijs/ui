import {RenderContext} from "axii";

export function RightPanel({}, {createElement}: RenderContext) {
    const containerStyle = {
        width: '320px',
        height: '100%',
        backgroundColor: '#2c2c2c',
        overflow: 'auto',
    }
    return (
        <div as={'root'} style={containerStyle}></div>
    )
}
