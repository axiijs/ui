//@jsx createElement
import {Component, createElement, createRoot, atom} from 'axii'
import {install as installInc} from 'axii-ui-theme-inc'
import {install as installFallout} from "axii-ui-theme-fallout";
import {styleSystem} from "./styleSystem.js";
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prism-themes/themes/prism-vsc-dark-plus.css'
import {Header} from "./examples/Header.js";
import {Drawer, Button} from "axii-ui";


const themeToInstall: {[k:string]:any} = {
    inc: installInc,
    fallout: installFallout
}

// 从 query 中获取 theme，默认是 inc
const search = new URLSearchParams(location.search)
const theme: keyof typeof themeToInstall = (search.get('theme') || 'inc').toLowerCase()
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
    padding: 20,
    border: '1px solid rgb(228,228,228)',
    borderRadius: 4,
    position: 'relative',
    '&>*:last-child' : {
        display: 'none'
    },
    '&:hover>*:last-child' : {
        display: 'block'
    }
}

const codeToShow = atom('')

const drawerStyle = {
    minHeight: '50vh',
    height: 0,
    backgroundColor: '#000',
    '@starting-style': {
        minHeight: 0,
        height:0,
    },
    transition: 'all .3s',
    overflow: 'auto'
}

const codeContainerStyle = {
    padding: 24,
    backgroundColor: '#000',
    color: '#fff',
    lineHeight: 1.6,
    fontSize:14
}
function App() {
    return (
        <div>
            <Header />
            <div style={gridStyle}>
                <Drawer visible={codeToShow} $content:style={drawerStyle}>
                    {() => (
                        <div style={styleSystem.layout.column({gap: 10})}>
                <pre style={codeContainerStyle}>
                    <code
                        dangerouslySetInnerHTML={() => codeToShow() ? Prism.highlight(codeToShow(), Prism.languages.tsx, 'tsx') : ''}></code>
                </pre>
                        </div>
                    )}
                </Drawer>
                {demos.map(({name, Demo, code}) => (<div style={itemStyle}>
                    <h1>{getComponentName(name)}</h1>
                    <Demo/>
                    {/*<pre style={{maxHeight:'300px', overflow:'auto'}}>*/}
                    {/*    <code>{code}</code>*/}
                    {/*</pre>*/}
                    <Button $root:style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10, ...styleSystem.textBox({colorBox: true})
                    }}
                            $root:onClick={() => codeToShow(code)}>Code</Button>
                </div>))}

            </div>
        </div>

    )
}

root.render(<App/>)
