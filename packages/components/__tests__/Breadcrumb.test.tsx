import { describe, it, expect, afterEach, vi } from 'vitest';
import { Breadcrumb } from '../src/Breadcrumb';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';
import { RxList } from 'axii';

describe('Breadcrumb Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with items', async () => {
    const items = new RxList([
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Product', href: '/category/product' }
    ]);
    
    const { container, unmount } = renderComponent(
      <Breadcrumb items={items} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const breadcrumbRoot = container.querySelector('div[data-as="root"]');
    expect(breadcrumbRoot).not.toBeNull();
    
    // Check if all items are rendered
    const breadcrumbItems = container.querySelectorAll('div[data-as="item"]');
    expect(breadcrumbItems.length).toBe(3);
    
    // Check if the labels are correct
    expect(breadcrumbItems[0].textContent).toContain('Home');
    expect(breadcrumbItems[1].textContent).toContain('Category');
    expect(breadcrumbItems[2].textContent).toContain('Product');
    
    // Check if the separators are rendered
    const separators = container.querySelectorAll('div[data-as="separator"]');
    expect(separators.length).toBe(2);
  });

  it('renders with custom separator', async () => {
    const items = new RxList([
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Product', href: '/category/product' }
    ]);
    const separator = createTestAtom('>');
    
    const { container, unmount } = renderComponent(
      <Breadcrumb items={items} separator={separator} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the separators have the custom content
    const separators = container.querySelectorAll('div[data-as="separator"]');
    expect(separators.length).toBe(2);
    expect(separators[0].textContent).toBe('>');
    expect(separators[1].textContent).toBe('>');
  });

  it('renders with custom item renderer', async () => {
    const items = new RxList([
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Product', href: '/category/product' }
    ]);
    
    const itemRenderer = (item: any) => {
      return <a href={item.href} data-testid="custom-item">{item.label.toUpperCase()}</a>;
    };
    
    const { container, unmount } = renderComponent(
      <Breadcrumb items={items} itemRenderer={itemRenderer} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the custom renderer is used
    const customItems = container.querySelectorAll('a[data-testid="custom-item"]');
    expect(customItems.length).toBe(3);
    
    // Check if the labels are transformed to uppercase
    expect(customItems[0].textContent).toBe('HOME');
    expect(customItems[1].textContent).toBe('CATEGORY');
    expect(customItems[2].textContent).toBe('PRODUCT');
  });

  it('handles item click events', async () => {
    const items = new RxList([
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Product', href: '/category/product' }
    ]);
    
    const onItemClick = vi.fn();
    
    const { container, unmount } = renderComponent(
      <Breadcrumb items={items} onItemClick={onItemClick} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Click on the second item
    const breadcrumbItems = container.querySelectorAll('div[data-as="item"]');
    expect(breadcrumbItems.length).toBe(3);
    
    if (breadcrumbItems[1]) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      breadcrumbItems[1].dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if the click handler was called with the correct item
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith(items.data[1]);
  });
}); 