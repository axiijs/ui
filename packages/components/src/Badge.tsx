import {atom, Component, FixedCompatiblePropsType, PropsType, PropTypes, RenderContext} from "axii";

const BadgePropTypes = {
  content: PropTypes.atom<string|number>(),
  dot: PropTypes.atom<boolean>().default(() => atom(false)),
  color: PropTypes.atom<string>().default(() => atom('#ff4d4f')),
  position: PropTypes.atom<{top?: string, right?: string, bottom?: string, left?: string}>().default(() => atom({top: '-8px', right: '-8px'})),
  children: PropTypes.any,
}

export const Badge: Component = function(props: FixedCompatiblePropsType<typeof BadgePropTypes>, {createElement}: RenderContext) {
  const { content, dot, color, position, children } = props as PropsType<typeof BadgePropTypes>

  const rootStyle = {
    position: 'relative',
    display: 'inline-block',
  }

  const indicatorStyle = () => {
    const baseStyle = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color(),
      color: '#fff',
      fontSize: '12px',
      lineHeight: 1,
      zIndex: 10,
      ...position(),
    }

    if (dot()) {
      return {
        ...baseStyle,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        padding: '0px',
      }
    } else {
      return {
        ...baseStyle,
        minWidth: '20px',
        height: '20px',
        borderRadius: '10px',
        padding: '0 6px',
      }
    }
  }

  return (
    <div as='root' style={rootStyle}>
      {children}
      <div as='indicator' style={indicatorStyle}>
        {() => !dot() && content && content()}
      </div>
    </div>
  )
}

Badge.propTypes = BadgePropTypes
