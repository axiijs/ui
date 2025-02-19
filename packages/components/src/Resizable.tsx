import {atom, Component, FixedCompatiblePropsType, RectObject, PropsType, PropTypes, RenderContext} from "axii";

export type alignType = {
    left?: 'left'|'right',
    right?: 'right'|'left',
    top?: 'top'|'bottom',
    bottom?: 'bottom'|'top',
    horizontalMiddle?: 'left'|'right'|'middle',
    verticalMiddle?: 'top'|'bottom'|'middle',
}

export const PopoverPropTypes = {
    visible: PropTypes.atom<boolean>().default(() => atom(false)),
    children: PropTypes.any,
    targetPosition: PropTypes.atom<RectObject|null>().default(() => atom(null)),
    align: PropTypes.atom<alignType>().default(() => atom({left: 'left', top: 'bottom'}))
}


export const Resizable: Component = function(props: FixedCompatiblePropsType<typeof PopoverPropTypes>, { createElement, createPortal, context, createRef}: RenderContext) {
    const { children } = props as PropsType<typeof PopoverPropTypes>



    return (
        <div>
            {children}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

Resizable.propTypes = PopoverPropTypes