import {createRoot, createElement} from "axii";
import { App } from './src/App'
import { install} from "axii-ui-theme-inc";
import {canvasData as data} from './data/canvas-data'
// import {samplePage as data} from './data/sample-page'
// import {screenshotDescription as data} from './data/screenshot-description'
createRoot(document.getElementById('root')!).render(<App data={[data]}/>)
