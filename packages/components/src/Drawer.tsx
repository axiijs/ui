import {atom, Component, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";

export const DrawerPropTypes = {
    visible: PropTypes.atom<boolean>().default(() => atom(false)),
    children: PropTypes.any,
    container: PropTypes.any
}

export const Drawer: Component = function(props: FixedCompatiblePropsType<typeof DrawerPropTypes>, { createElement, createPortal}: RenderContext) {
    const { visible, children, container } = props as PropsType<typeof DrawerPropTypes>
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