//@jsx createElement
import {createElement, createRoot} from 'axii'
import {install as installInc} from 'axii-ui-theme-inc'
import {install as installFallout} from "axii-ui-theme-fallout";
import {getDemos} from "./files.macro.js" with {type: "macro"};


const themeToInstall: {[k:string]:any} = {
    inc: installInc,
    fallout: installFallout
}

// 从 query 中获取 theme，默认是 inc
const search = new URLSearchParams(location.search)
const theme: keyof typeof themeToInstall = search.get('theme') || 'inc'
themeToInstall[theme]()

const demoFiles = getDemos()
// const demoFiles = [
//     // 'accordion.tsx',
//     // 'alert.tsx',
//     // 'button.tsx',
//     // 'calendar.tsx',
//     // 'checkbox.tsx',
//     // 'combobox.tsx',
//     // 'contextmenu.tsx',
//     // 'datePicker.tsx',
//     // 'dialog.tsx',
//     // 'drawer.tsx',
//     // 'dropdown.tsx',
//     'input.tsx',
//     // 'menu.tsx',
//     // 'menubar.tsx',
//     // 'popover.tsx',
//     // 'radioGroup.tsx',
//     // 'resizable.tsx',
//     // 'select.tsx',
//     'slider.tsx',
// ]
const demos = await Promise.all(demoFiles.map( async(d) => {
    const componentName = d.replace('.tsx', '')

    return {
        name: componentName[0].toUpperCase() + componentName.slice(1),
        Demo: (await import(`./demo/${componentName}`)).Demo
    }
}))


const root = createRoot(document.getElementById('root')!)

root.render(<div style={{display: 'flex', gap: 32, flexDirection: 'column'}}>
    {demos.map(({name, Demo}) => (<div>
        <h1>{name}</h1>
        <Demo/>
    </div>))}

</div>)
