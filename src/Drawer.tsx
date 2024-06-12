import {atom, Component, FixedCompatiblePropsType, ModalContext, PropsType, PropTypes, RenderContext} from "axii";

export const DrawerPropTypes = {
    visible: PropTypes.atom<boolean>().default(() => atom(false)),
    children: PropTypes.any,
}

export const Drawer: Component = function(props: FixedCompatiblePropsType<typeof DrawerPropTypes>, { createElement, context,createPortal}: RenderContext) {
    const { visible, children } = props as PropsType<typeof DrawerPropTypes>
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
                justifyContent: 'center',
                alignItems: 'flex-end',
            }),
        ]

        const contentContainerStyle = {
            width: '100vw',
        }

        return (<div
            as='root'
            onscroll={(e:Event)=>e.stopPropagation()}
            style={ backgroundStyle}
            onClick={() => visible(false)}
        >
            <div
                as={'content'}
                style={contentContainerStyle}
                onClick={(e:Event) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>)
    }, container || document.body)
}

Drawer.propTypes = DrawerPropTypes