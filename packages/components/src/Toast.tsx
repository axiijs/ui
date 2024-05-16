import {
    atom,
    Atom, autorun,
    Component,
    FixedCompatiblePropsType,
    PropsType,
    PropTypes,
    RenderContext,
    RxList,
    RxTime
} from "axii";

export const ToastPropTypes = {
    stack: PropTypes.rxList<any>().default(() => new RxList([])),
    children: PropTypes.any,
    container: PropTypes.any,
    expireTime: PropTypes.atom<number>().default(() => atom(3000)),
}


export const Toast: Component = function(props: FixedCompatiblePropsType<typeof ToastPropTypes>, { createElement, createPortal}: RenderContext) {
    const { stack, container, expireTime } = props as PropsType<typeof ToastPropTypes>

    // 手动 remove 就是用户点击 toast 上的关闭按钮。
    // FIXME 因为我们同时支持手动 remove 和超时 remove。
    //  index 在已经被 remove 之后会失去响应，会不会对这里的逻辑造成什么影响？？？
    const scheduleToRemove = (index: Atom<number>) => {
        console.log('remove', index.raw)
        stack.splice(index.raw,1)
    }

    const itemsWithExpired = stack.map((item, index, {onCleanup}) => {
        const origin = index()

        const time = new RxTime()
        const createAt = Date.now()
        const expired = time.sub(createAt).gt(expireTime)

        autorun(() => {
            if (expired()) {
                scheduleToRemove(index)
            }
        })

        onCleanup(() => {
            console.log('destroy', index.raw, origin, item)
            time.destroy()
        })

        return {
            item,
            index,
            expired
        }
    })


    return createPortal(() => {
        return (<div
            as='root'
        >
            {itemsWithExpired.map(({item, expired, index}:any) => {
                return (
                    <div as='content' prop:item={item} prop:index={index} prop:expired={expired} >
                        {item}
                    </div>
                )
            })}
        </div>)
    }, container || document.body)
}

Toast.propTypes = ToastPropTypes