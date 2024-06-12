import {atom, Component, FixedCompatiblePropsType, ModalContext, PropsType, PropTypes, RenderContext} from "axii";

export const DialogPropTypes = {
    visible: PropTypes.atom<boolean>().default(() => atom(false)),
    children: PropTypes.any
}

export const Dialog: Component = function(props: FixedCompatiblePropsType<typeof DialogPropTypes>, { createElement, createPortal, context}: RenderContext) {
    const { visible, children } = props as PropsType<typeof DialogPropTypes>
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