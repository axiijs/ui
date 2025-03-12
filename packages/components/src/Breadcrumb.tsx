import {
  atom,
  Component,
  FixedCompatiblePropsType,
  PropsType,
  PropTypes,
  RenderContext,
  RxList
} from "axii";

type BreadcrumbItem = {
  label: string;
  href?: string;
  [key: string]: any;
};

const BreadcrumbPropTypes = {
  items: PropTypes.any, // 使用any类型暂时绕过类型检查问题
  separator: PropTypes.atom<string>().default(() => atom('/')),
  itemRenderer: PropTypes.function,
  onItemClick: PropTypes.function,
};

export const Breadcrumb: Component = function(props: FixedCompatiblePropsType<typeof BreadcrumbPropTypes>, { createElement }: RenderContext) {
  const { items, separator, itemRenderer, onItemClick } = props as PropsType<typeof BreadcrumbPropTypes>;

  const rootStyle = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: '#333',
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#666',
    transition: 'color 0.2s',
    ':hover': {
      color: '#1677ff',
    },
  };

  const lastItemStyle = {
    ...itemStyle,
    color: '#333',
    cursor: 'default',
    ':hover': {
      color: '#333',
    },
  };

  const separatorStyle = {
    margin: '0 8px',
    color: '#ccc',
  };

  // 默认的项目渲染器
  const defaultItemRenderer = (item: BreadcrumbItem, isLast: boolean) => {
    if (item.href && !isLast) {
      return <a href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>{item.label}</a>;
    }
    return <span>{item.label}</span>;
  };

  // 处理项目点击
  const handleItemClick = (item: BreadcrumbItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  // 渲染面包屑项
  const renderItems = () => {
    if (!items || !items.data || items.data.length === 0) {
      return null;
    }

    const result: any[] = [];
    
    items.data.forEach((item: BreadcrumbItem, index: number) => {
      const isLast = index === items.data.length - 1;
      const currentItemStyle = isLast ? lastItemStyle : itemStyle;

      // 添加面包屑项
      result.push(
        <div 
          key={`item-${index}`}
          as="item" 
          style={currentItemStyle} 
          onClick={() => !isLast && handleItemClick(item)}
        >
          {itemRenderer 
            ? itemRenderer(item) 
            : defaultItemRenderer(item, isLast)
          }
        </div>
      );

      // 如果不是最后一项，添加分隔符
      if (!isLast) {
        result.push(
          <div key={`separator-${index}`} as="separator" style={separatorStyle}>
            {separator()}
          </div>
        );
      }
    });

    return result;
  };

  return (
    <div as="root" style={rootStyle}>
      {renderItems()}
    </div>
  );
};

Breadcrumb.propTypes = BreadcrumbPropTypes;
