import {RenderContext, PropsType, PropTypes, atom, FixedCompatiblePropsType} from "axii";

const ColumnPropTypes = {
    children: PropTypes.any,
    gap: PropTypes.atom<number>().default(() => atom(0)),
}

// TODO 为了支持更复杂的动画，用 abslute 布局更好？
function updateElementsPosition(container: HTMLElement, gap: number) {
    const items = Array.from(container.children) as HTMLElement[];

    // Get initial positions based on current order
    const initialPositions = new Map<HTMLElement, number>();
    let currentPosition = 0;
    items.forEach(item => {
        initialPositions.set(item, currentPosition);
        currentPosition += item.offsetHeight + gap;
    });

    // Sort items based on data-order attribute
    const sortedItems = items.slice().sort((a, b) => {
        const aOrder = parseInt(a.getAttribute('data-order') as string);
        const bOrder = parseInt(b.getAttribute('data-order') as string);
        return aOrder - bOrder;
    });

    // Calculate translateY offsets
    let currentY = 0;
    sortedItems.forEach((item, index) => {
        const initialY = initialPositions.get(item)!;
        const translateY = currentY - initialY;
        item.style.transform = `translateY(${translateY}px)`;
        currentY += item.offsetHeight + gap;
    });
}

export function Column(props:FixedCompatiblePropsType<typeof ColumnPropTypes>, {createRef,createElement, useLayoutEffect}: RenderContext) {
    const {gap, children} = props as PropsType<typeof ColumnPropTypes>

    const rootRef = createRef()

    useLayoutEffect(() => {

        const orderObserver = new MutationObserver(() => {
            updateElementsPosition(rootRef.current, gap());
        });

        const listObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    // If new children are added, observe their attributes
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            orderObserver.observe(node, { attributes: true, attributeFilter: ['data-order'] });
                        }
                    });
                }
            });
        })

        Array.from(rootRef.current.children).forEach((item) => {
            orderObserver.observe(item as HTMLElement, { attributes: true, attributeFilter: ['data-order'] });
        });
        listObserver.observe(rootRef.current, { childList: true });
        // 立刻执行一次
        updateElementsPosition(rootRef.current, gap())
    })

    const style = () => ({
        display:'flex',
        flexDirection:'column',
        gap: gap()
    })
    return <div ref={rootRef} as={"root"} style={style}>{children}</div>
}


Column.propTypes = ColumnPropTypes
