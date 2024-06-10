import {
    atom,
    Component,
    FixedCompatiblePropsType,
    PropsType,
    PropTypes,
    RenderContext,
    createOnDragMove,
    onLeftMouseDown
} from "axii";

const SliderProptypes= {
    value: PropTypes.atom<number>().default(() => atom(0)),
}

export const Slider: Component = function Slider(props: FixedCompatiblePropsType<typeof SliderProptypes>, {createElement, createRxRef}: RenderContext) {
    const { value } = props as PropsType<typeof SliderProptypes>
    const containerRef = createRxRef()

    const rootStyle = {
        position: 'relative',
    }

    const containerStyle = {
        position: 'absolute',
        top: 0,
        left:0,
        right: 0
    }

    const barStyle = {
        display: 'flex',
        alignItems: 'stretch',
    }
    const barInnerStyle = () => ({
      width: `${value()}%`,
    })

    const mainStyle = () => {
        console.log(value(), containerRef.current?.clientWidth)
        return ({
            position: 'absolute',
            left: value()/100*(containerRef.current?.clientWidth||0),
            top: 0,
        })
    }

    const dragMoveRef = createOnDragMove()

    let lastStartValue = value()
    const onDragMove = (e: CustomEvent) => {
        console.log(e.detail)
        const { deltaX } = e.detail
        const totalWidth = containerRef.current.clientWidth
        const newValue = lastStartValue + deltaX / totalWidth * 100
        value(newValue > 100 ? 100 : newValue < 0 ? 0 : newValue)
    }

    return <div as={'root'} style={rootStyle}>
        <div as={'container'} style={containerStyle} ref={containerRef}>
            <span
                as={'main'}
                style={mainStyle}
                ref={dragMoveRef}
                onMouseDown={onLeftMouseDown(() => lastStartValue = value())}
                onDragMove={onDragMove}
            ></span>
        </div>
        <div as={'bar'} style={barStyle}>
            <div as={'barInner'} style={barInnerStyle}></div>
        </div>
    </div>
}

Slider.propTypes = SliderProptypes

