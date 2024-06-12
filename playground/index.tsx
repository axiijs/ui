//@jsx createElement
import {createElement, createRoot} from 'axii'
import {install} from 'axii-ui/themes/inc.js'
import {getDemos} from "./files.macro.js" with {type: "macro"};


console.log(1111, getDemos())
const demos = await Promise.all(getDemos().map( async(d) => {
    const componentName = d.replace('.tsx', '')

    return {
        name: componentName[0].toUpperCase() + componentName.slice(1),
        Demo: (await import(`./demo/${componentName}`)).Demo
    }
}))

install()

const root = createRoot(document.getElementById('root')!)

root.render(<div style={{display: 'flex', gap: 32, flexDirection: 'column'}}>
    {demos.map(({name, Demo}) => (<div>
        <h1>{name}</h1>
        <Demo/>
    </div>))}

</div>)
