import {atom, Component, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";

export const DialogPropTypes = {
    visible: PropTypes.atom<boolean>().default(() => atom(false)),
    children: PropTypes.any,
    container: PropTypes.any
}

export const Dialog: Component = function(props: FixedCompatiblePropsType<typeof DialogPropTypes>, { createElement, createPortal}: RenderContext) {
    const { visible, children, container } = props as PropsType<typeof DialogPropTypes>
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
                alignItems: 'center',
            }),
        ]

        return (<div
            as='root'
            onscroll={(e:Event)=>e.stopPropagation()}
            style={ backgroundStyle}
            onClick={() => visible(false)}
        >
            <div as={'content'}
                 onClick={(e:Event) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>)
    }, container || document.body)
}

Dialog.propTypes = DialogPropTypes