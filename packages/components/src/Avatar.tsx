import {atom, Component, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";

const AvatarPropTypes = {
    src: PropTypes.atom<string>(),
    alt: PropTypes.atom<string>().default(() => atom('avatar')),
}

export const Avatar: Component = function Avatar(props: FixedCompatiblePropsType<typeof AvatarPropTypes>, {createElement, useLayoutEffect}: RenderContext) {
    const { src, alt} = props as PropsType<typeof AvatarPropTypes>
    const loadStatus = atom<'initial'|'loading'|'failed'|'success'>('initial')
    // 使用 Image 对象异步加载图片，加载失败则用 alt 的文字显式。
    useLayoutEffect(() => {
        if (!src?.()) return
        const img = new Image()
        loadStatus('loading')
        img.src = src()
        img.onload = () => {
            // do something
            loadStatus('success')
        }
        img.onerror = () => {
            // do something
            loadStatus('failed')
        }
    })

    return <div as='root'>
        {() => loadStatus() === 'success' ? (
            <img as='image' src={src} alt={alt} />
        ) : (
            <div as='alt'>{() => alt().slice(0,2).toUpperCase()}</div>
        )}
    </div>
}

Avatar.propTypes = AvatarPropTypes
