import {createRoot, createElement} from "axii";
import {App} from "./examples/forms/App.js";
import {install as installInc} from 'axii-ui-theme-inc'
import {install as installFallout} from "axii-ui-theme-fallout";


const themeToInstall: {[k:string]:any} = {
    inc: installInc,
    fallout: installFallout
}
const search = new URLSearchParams(location.search)
const theme: keyof typeof themeToInstall = search.get('theme') || 'inc'
themeToInstall[theme]()

const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);
root.render(<App/>)