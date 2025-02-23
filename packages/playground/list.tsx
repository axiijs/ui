//@jsx createElement
import {Component, createElement, createRoot} from 'axii'
import {install as installInc} from 'axii-ui-theme-inc'
import {install as installFallout} from "axii-ui-theme-fallout";


const themeToInstall: {[k:string]:any} = {
    inc: installInc,
    fallout: installFallout
}

// 从 query 中获取 theme，默认是 inc
const search = new URLSearchParams(location.search)
const theme: keyof typeof themeToInstall = search.get('theme') || 'inc'
themeToInstall[theme]()

// const demoFiles = getDemos()
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
//     // 'input.tsx',
//     // 'menu.tsx',
//     // 'menubar.tsx',
//     // 'popover.tsx',
//     // 'radioGroup.tsx',
//     // 'resizable.tsx',
//     'select.tsx',
//     // 'slider.tsx',
//     // 'switch.tsx',
//     // 'tabs.tsx',
// ]
// const demos = await Promise.all(demoFiles.map( async(d) => {
//     const componentName = d.replace('.tsx', '')
//
//     return {
//         name: componentName[0].toUpperCase() + componentName.slice(1),
//         Demo: (await import(`./demo/${componentName}`)).Demo
//     }
// }))

// @ts-ignore
const demoComponents = import.meta.glob('./demo/*.tsx', {eager:true, import: 'Demo'}) as {[k:string]: Component}
// @ts-ignore
const demoStrings = import.meta.glob('./demo/*.tsx', {eager:true, import:'default',query:'?raw'}) as {[k:string]: string}
function getComponentName(fileName:string) {
    const name = fileName.split('/').pop()!.replace('.tsx', '')
    return name[0].toUpperCase() + name.slice(1)
}

const demos = Object.entries(demoComponents).map(([fileName, Demo]) => {
    return {
        name: getComponentName(fileName),
        Demo,
        code: demoStrings[fileName]
    }
})

const root = createRoot(document.getElementById('root')!)

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(23rem, 1fr))',
    gap: 32,
    padding: 32,
}

const itemStyle = {
    padding: 32,
    border: '1px solid rgb(228,228,228)',
    borderRadius: 4,
}

root.render(<div style={gridStyle}>
    {demos.map(({name, Demo, code}) => (<div style={itemStyle}>
        <h1>{getComponentName(name)}</h1>
        <Demo/>
        {/*<pre style={{maxHeight:'300px', overflow:'auto'}}>*/}
        {/*    <code>{code}</code>*/}
        {/*</pre>*/}
    </div>))}

</div>)
