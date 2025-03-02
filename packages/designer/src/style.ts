import { Atom } from "axii"

export const subPanelStyle = {
    borderBottom: '1px solid rgb(68, 68, 68)',
    '&>[data-as="name"]' : {
        fontWeight: 500,
        padding: [12, 12],
        color: 'white', 
    }
}


export const controlContainerStyle = {
    minHeight:24,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(56,56,56)',
    color: 'white',
    '&:hover': {
        outline: '1px solid rgb(76,76,76)',
    }    ,
}

export const popoverContainerStyle = {
    borderRadius: 4,
    backgroundColor: 'rgb(17, 17, 17)',
}

export const commonOptionStyle = (selected: Atom<boolean>) => () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    color: selected() ? 'white' : 'rgb(128,128,128)',
    cursor: 'pointer',
    padding: [4, 8],
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.1)',
    }
})