import {atom, Atom, FixedCompatiblePropsType, PropTypes, RenderContext, PropsType} from "axii";
import {colors, gaps} from "./style.js";


const RadioGroupPropTypes = {
    options: PropTypes.rxList<any>().isRequired,
    value: PropTypes.any.default(() => atom(null)),
}

export function RadioGroup(props: FixedCompatiblePropsType<typeof RadioGroupPropTypes>, {createElement}: RenderContext)  {
    const {options, value} = props as PropsType<typeof RadioGroupPropTypes>
    const radioWithSelected = options.createSelection( value)

    const containerStyle = {
        display: 'flex',
        gap: gaps.medium,
    }

    return <div as='root' style={containerStyle}>
        {radioWithSelected.map(([option, selected]) => {
            return <RadioOption as='option' selected={selected} option={option} $root:onClick={()=>value(option)}/>
        })}
    </div>
}

RadioGroup.propTypes = RadioGroupPropTypes

// TODO 上面的部分移到 primitive 里面去
type RadioOptionProps = {
    selected: Atom<boolean>,
    option: {
        label: any,
        value: any
    }
}

export function RadioOption({selected, option}:RadioOptionProps, {createElement}: RenderContext) {
    const containerStyle={
        display: 'flex',
        gap: gaps.small,
        alignItems: 'center',
        cursor: 'pointer',
    }

    return (<div as='root' style={containerStyle}>
        <div as='dotContainer'>
            {() => selected() ? <div as="dot"/> : null}
        </div>
        <div>{option.label || option}</div>
    </div>)
}

type BlockOptionProps = {
    selected: Atom<boolean>,
    option: {
        label: any,
        value: any
    }
}

export function BlockOption({selected, option}: BlockOptionProps, {createElement}: RenderContext) {
    const style = () => ({
        color: '#fff',
        borderRadius: 4,
        padding: `${gaps.small}px ${gaps.large}px`,
        cursor: 'pointer',
        background: selected() ? colors.primaryBlue : colors.itemBg,
        '&:hover': {
            background: colors.primaryBlue
        }
    })
    return <div as='root' props:selected={selected} props:option={option} style={style}>
        {option.label}
    </div>
}








