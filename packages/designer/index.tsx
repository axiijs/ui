import {createRoot, createElement} from "axii";
import { App } from './src/App'
import { install} from "axii-ui-theme-inc";
import {canvasData as data} from './data/canvas-data'
// install()

createRoot(document.getElementById('root')!).render(<App data={[data]}/>)
