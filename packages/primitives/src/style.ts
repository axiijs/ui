export const colors = {
    primaryBlue: '#2F51FF',
    inputBg: '#15181F',
    innerBorder: '#2A2C33',
    panelBorder: '#C5C5C5',
    panelBg: '#1E1F24',
    itemBg: '#34394E',
    description: '#C5C5C5',
    line: '#A6A6A6'
}

export const gaps = {
    small: 8,
    medium: 12,
    large: 16,
    extra: 24,
    ultra: 32,
}

export const styles = {
    gradientBg: {
        background: 'linear-gradient(to bottom right, #7A04F0, #1F43FE)'
    },
    formItem: {
        '$labelContainer:style': {
            fontSize: 14,
            marginBottom: gaps.medium,
        },
        '$labelRequired:style': {
            color: 'red',
            marginLeft: 4,
        }
    }
}

