import {
    atom,
    Component,
    FixedCompatiblePropsType,
    ModalContext,
    PropsType,
    PropTypes,
    RenderContext,
    RxDOMSize,
    withPreventDefault
} from "axii";

export const ContextmenuPropTypes = {
    position:PropTypes.atom<{x:number, y:number}|null>().default(() => atom(null)),
    children: PropTypes.any,
}

export const Contextmenu: Component = function(props: FixedCompatiblePropsType<typeof ContextmenuPropTypes>, { createElement, context, createPortal}: RenderContext) {
    const rxContentSize = new RxDOMSize()
    const { position, children } = props as PropsType<typeof ContextmenuPropTypes>
    const container = context.get(ModalContext)?.container || document.body

    return createPortal(() => {
        const backgroundStyle = [
            () => ({
                position: 'fixed',
                display: position() ? 'block' : 'none',
                top:0,
                left:0,
                width: '100vw',
                height: '100vh',
            }),
        ]

        const contentContainerStyle = () => {
            // 默认显示在右下角
            //  如果下方空间不够，并且 position 是在屏幕下半部分，就显示在上方
            //  如果右方空间不够，并且 position 是在屏幕右半部分，就显示在左方
            const positionObj: any = {}
            if (position() && rxContentSize.value()){
                const { x, y } = position()!
                const { width, height } = rxContentSize.value()!
                const { innerWidth, innerHeight } = window
                if (y + height > innerHeight && y > height/2) {
                    positionObj.bottom = innerHeight - y
                } else {
                    positionObj.top = y
                }
                if (x + width > innerWidth && x > width/2) {
                    positionObj.right = innerWidth - x
                } else {
                    positionObj.left = x
                }
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
            onClick={withPreventDefault(() => position(null))}
            oncontextmenu={withPreventDefault(() => position(null))}
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
    }, container)
}

Contextmenu.propTypes = ContextmenuPropTypes