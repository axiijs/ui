import {
    atom,
    Component,
    FixedCompatiblePropsType,
    PropsType,
    PositionObject,
    PropTypes,
    RenderContext,
    ModalContext, SizeObject, reactiveSize
} from "axii";

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
    targetPosition: PropTypes.atom<PositionObject|null>().default(() => atom(null)),
    align: PropTypes.atom<alignType>().default(() => atom({left: 'left', top: 'bottom'}))
}


export const Popover: Component = function(props: FixedCompatiblePropsType<typeof PopoverPropTypes>, { createElement, createPortal, context, createRef, createStateFromRef}: RenderContext) {
    const contentSize = createStateFromRef<SizeObject>(reactiveSize)
    const bgRef = createRef()

    const {
        visible,
        children,
        targetPosition,
        align,
    } = props as PropsType<typeof PopoverPropTypes>
    const container = context.get(ModalContext)?.container || document.body

    return createPortal(() => {
        const backgroundStyle = [
            () => ({
                position: 'fixed',
                top:0,
                left:0,
                width: '100vw',
                height: '100vh',
                display: visible() ? 'flex' : 'none',
            }),
        ]

        // 外部来决定位置，要动态变化的话也由外部计算。
        const contentContainerStyle = () => {
            // 默认显示正下方
            //  如果下方空间不够，并且 position 是在屏幕下半部分，就显示在上方
            //  如果右方空间不够，并且 position 是在屏幕右半部分，就显示在左方
            const positionObj: any = {}
            if (targetPosition() && contentSize()){
                const { left, top, bottom, right } = targetPosition()!
                const {
                    left: alignLeft,
                    right: alignRight,
                    top: alignTop,
                    bottom: alignBottom,
                    horizontalMiddle,
                    verticalMiddle
                } = align()

                const transforms:string[] = []

                if (alignLeft === 'left') {
                    positionObj.left = left
                } else if(alignLeft === 'right') {
                    positionObj.left = right
                } else if(alignLeft === 'middle') {
                    positionObj.left = (left + right) / 2
                }else if(alignRight === 'left') {
                    positionObj.left = left - contentSize()!.width
                    // transforms.push('translateX(-100%)')
                } else if(alignRight === 'right') {
                    positionObj.left = right - contentSize()!.width
                    // transforms.push('translateX(-100%)')
                } else if(alignRight === 'middle') {
                    positionObj.left = (left + right) / 2 - contentSize()!.width
                    // transforms.push('translateX(-100%)')
                } else if(horizontalMiddle === 'left') {
                    positionObj.left = left - contentSize()!.width/2
                    // transforms.push('translateX(-50%)')
                } else if(horizontalMiddle === 'right') {
                    positionObj.left = right - contentSize()!.width/2
                    // transforms.push('translateX(-50%)')
                } else if(horizontalMiddle === 'middle') {
                    positionObj.left = (left + right) / 2 - contentSize()!.width/2
                    // transforms.push('translateX(-50%)')
                }

                if (alignTop === 'top') {
                    positionObj.top = top
                } else if(alignTop === 'bottom') {
                    positionObj.top = bottom
                } else if(alignTop === 'middle') {
                    positionObj.top = (top + bottom) / 2
                } else if(alignBottom === 'top') {
                    positionObj.top = top - contentSize()!.height
                    // transforms.push('translateY(-100%)')
                } else if(alignBottom === 'bottom') {
                    positionObj.top = bottom
                } else if(alignBottom === 'middle') {
                    positionObj.top = (top + bottom) / 2 - contentSize()!.height
                    // transforms.push('translateY(-100%)')
                } else if (verticalMiddle === 'top') {
                    positionObj.top = top - contentSize()!.height/2
                    // transforms.push('translateY(-50%)')
                } else if(verticalMiddle === 'bottom') {
                    positionObj.top = bottom - contentSize()!.height/2
                    // transforms.push('translateY(-50%)')
                } else if(verticalMiddle === 'middle') {
                    positionObj.top = (top + bottom) / 2 - contentSize()!.height/2
                    // transforms.push('translateY(-50%)')
                }

                const bgRect = bgRef.current.getBoundingClientRect()
                // 智能调整超出屏幕的部分
                // 1. 如果是左右两侧，上下超出屏幕，那么应该滑动到边缘
                if(alignLeft === 'right' || alignRight === 'left') {
                    if (positionObj.top < 0) positionObj.top = 0
                    if (positionObj.top + contentSize()!.height > bgRect.height) positionObj.top = bgRect.height - contentSize()!.height
                }

                // 2. 如果是上下两侧，左右超出屏幕，那么应该滑动到边缘
                if (alignTop === 'bottom' || alignBottom === 'top') {
                    if (positionObj.left < 0) positionObj.left = 0
                    if (positionObj.left + contentSize()!.width > bgRect.width) positionObj.left = bgRect.width - contentSize()!.width
                }

                // 3. TODO 如果是在左右两侧，左右超出屏幕，那么应该尝试翻转
                // 4. TODO 如果是上下两侧，上下超出屏幕，那么应该尝试翻转

                if (transforms.length > 0) {
                    positionObj.transform = transforms.join(' ')
                }
            }


            return {
                position: 'absolute',
                ...positionObj,
                // 不换行. 一行显示
                whiteSpace: 'nowrap',
            }
        }

        return (
            <div
                as='root'
                onscroll={(e:Event)=>e.stopPropagation()}
                style={ backgroundStyle}
                onClick={() => visible(false)}
                ref={bgRef}
            >
                <div
                    ref={contentSize.ref}
                    as={'content'}
                    style={contentContainerStyle}
                    onClick={(e:Event) => e.stopPropagation()}
            >
                {children}
                </div>
            </div>
        )
    }, container || document.body)
}

Popover.propTypes = PopoverPropTypes