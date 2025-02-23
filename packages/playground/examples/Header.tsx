import {atom, autorun, createElement} from "axii";
import {styleSystem} from "../styleSystem.js";

function updateSearchParam(key: string, value: string) {
    const search = new URLSearchParams(location.search)
    search.set(key, value)
    window.location.search = search.toString()
}

function getSearchParam(key: string) {
    const search = new URLSearchParams(location.search)
    return search.get(key)
}


function capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1)
}

export function Header() {
    const theme = atom(capitalize(getSearchParam('theme')||'Inc'))

    autorun(() => {
        if (theme().toLowerCase() !== getSearchParam('theme')) {
            updateSearchParam('theme', theme().toLowerCase())
        }
    })

    const themes = ['Inc', 'Fallout']

    const containerStyle = {
        ...styleSystem.layout.row({gap: 10}),
        ...styleSystem.layout.center(),
        ...styleSystem.panelPaddingContainer,
        background:'#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&>*': {
            cursor: 'pointer',
            '&:hover': {
                ...styleSystem.textBox({colorBox:true}),
            }
        }
    }

    return (<div style={containerStyle}>
        {themes.map(themeName =>(
            <span
                style={styleSystem.textBox({colorBox:themeName === theme()})}
                onClick={() => updateSearchParam('theme', themeName.toLowerCase())}
            >{themeName}</span>
        ))}
    </div>)
}