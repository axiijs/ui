export const originMenuContainerStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflow: 'visible',
    '&>*' : {
        position: 'relative',
        overflow: 'visible',
        whiteSpace: 'nowrap',
    },
    '&>*>*:nth-child(2) ' : {
        display: 'none',
        position: 'absolute',
        top: 0,
        left:0,
        marginLeft: '100%',
    },
    '&>*:hover>*:nth-child(2)': {
        display: 'block',
    },
}