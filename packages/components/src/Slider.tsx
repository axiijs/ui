import {
    atom,
    autorun,
    Component,
    DragPosition,
    FixedCompatiblePropsType,
    PropsType,
    PropTypes,
    RenderContext,
    RxDOMDragPosition
} from "axii";

const SliderProptypes= {
    value: PropTypes.atom<number>().default(() => atom(0)),
}

export const Slider: Component = function Slider(props: FixedCompatiblePropsType<typeof SliderProptypes>, {createElement, createRxRef, useLayoutEffect}: RenderContext) {
    const { value } = props as PropsType<typeof SliderProptypes>
    const containerRef = createRxRef()

    const rootStyle = {
        position: 'relative',
    }

    const containerStyle = {
        position: 'absolute',
        top: 0,
        left:0,
        right: 0,
        userSelect: 'none',
    }

    const barStyle = {
        display: 'flex',
        alignItems: 'stretch',
    }
    const barInnerStyle = () => ({
      width: `${value()}%`,
    })

    const mainStyle = () => {
        return ({
            position: 'absolute',
            left: value()/100*(containerRef.current?.clientWidth||0),
            top: 0,
        })
    }


    const rxDragPosition = new RxDOMDragPosition(atom<DragPosition>(null), containerRef)

    autorun(() => {
        const position = rxDragPosition.value()
        if(position) {
            const newValue = (position.clientX-position.startX-position.containerRect!.left)/position.containerRect!.width*100
            value(newValue > 100 ? 100 : newValue < 0 ? 0 : newValue)
        }
    })

    return <div as={'root'} style={rootStyle}>
        <div as={'container'} style={containerStyle} ref={containerRef}>
            <span
                as={'main'}
                style={mainStyle}
                ref={rxDragPosition.ref}
            ></span>
        </div>
        <div as={'bar'} style={barStyle}>
            <div as={'barInner'} style={barInnerStyle}></div>
        </div>
    </div>
}

Slider.propTypes = SliderProptypes

