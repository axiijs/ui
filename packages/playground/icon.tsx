import {createRoot, createElement} from 'axii'
import AcceptEmail from 'axii-icon-park/AcceptEmail.js'
// import AcceptEmail from './AcceptEmail.js'

const root = createRoot(document.getElementById('root')!)

root.render(<div style={{display: 'flex', gap: 32, flexDirection: 'column'}}>
    <i><AcceptEmail size={32} strokeWidth={4}/></i>
</div>)
