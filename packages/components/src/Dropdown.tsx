import {
    atom,
    Component,
    FixedCompatiblePropsType,
    ModalContext,
    PropsType,
    PropTypes,
    RenderContext,
    RxDOMSize,
    RectObject
} from "axii";

export const DropdownPropTypes = {
    visible: PropTypes.atom<boolean>().default(() => atom(false)),
    children: PropTypes.any,
    targetPosition: PropTypes.atom<RectObject|null>().default(() => atom(null)),
}

export const Dropdown: Component = function(props: FixedCompatiblePropsType<typeof DropdownPropTypes>, { createElement, createPortal, context}: RenderContext) {
    const rxContentSize = new RxDOMSize()

    const { visible, children, targetPosition } = props as PropsType<typeof DropdownPropTypes>
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

        const contentContainerStyle = () => {
            // 默认显示正下方
            //  如果下方空间不够，并且 position 是在屏幕下半部分，就显示在上方
            //  如果右方空间不够，并且 position 是在屏幕右半部分，就显示在左方
            const positionObj: any = {}
            if (visible() && targetPosition() && rxContentSize.value()){
                const { left, top: y, bottom } = targetPosition()!
                const { height } = rxContentSize.value()!
                const { innerHeight } = window
                if (y + height > innerHeight && y > height/2) {
                    // 显式在上面
                    positionObj.bottom = top
                } else {
                    // 显示到下面
                    positionObj.top = bottom
                }

                positionObj.left = left
            }

            return {
                position: 'absolute',
                ...positionObj,
                // 不换行. 一行显示
                whiteSpace: 'nowrap',
            }
        }

        return (<div
            as='root'
            onscroll={(e:Event)=>e.stopPropagation()}
            style={ backgroundStyle}
            onClick={() => visible(false)}
        >
            <div
                ref={rxContentSize.ref}
                as={'content'}
                style={contentContainerStyle}
                onClick={(e:Event) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>)
    }, container || document.body)
}

Dropdown.propTypes = DropdownPropTypes