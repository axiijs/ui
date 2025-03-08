
import { atom, RenderContext } from 'axii';
import { ColorInput } from '../lib/ColorInput';

export function FillEditor({node}: {node: Node}, {createElement}: RenderContext) {
    return <div>
        <ColorInput value={atom('')} />
    </div>
}
