
import { atom, RenderContext } from 'axii';
import { ColorPicker } from '../lib/ColorPicker';

export function FillEditor({node}: {node: Node}, {createElement}: RenderContext) {
    return <div>
        <ColorPicker value={atom('')} />
    </div>
}
