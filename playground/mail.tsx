import {createRoot, createElement} from "axii";
import {App} from "./examples/mail/App.js";
import {install} from 'axii-ui/themes/inc.js'

install()
const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);
root.render(<App/>)