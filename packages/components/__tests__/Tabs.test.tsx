import { describe, it, expect, afterEach, vi } from 'vitest';
import { Tabs } from '../src/Tabs';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';
import { RxList } from 'axii';

describe('Tabs Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with options', async () => {
    const options = new RxList(['Tab 1', 'Tab 2', 'Tab 3']);
    const current = createTestAtom('Tab 1');
    
    const { container, unmount } = renderComponent(
      createElement(Tabs, { options, current })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const tabsRoot = container.querySelector('div[data-as="root"]');
    expect(tabsRoot).not.toBeNull();
    
    const tabsContainer = container.querySelector('div[data-as="tabs"]');
    expect(tabsContainer).not.toBeNull();
    
    // Check if all tabs are rendered
    const tabs = container.querySelectorAll('div[data-as="tab"]');
    expect(tabs.length).toBe(3);
    
    // Check tab content
    expect(tabs[0].textContent).toBe('Tab 1');
    expect(tabs[1].textContent).toBe('Tab 2');
    expect(tabs[2].textContent).toBe('Tab 3');
  });

  it('updates current tab when clicked', async () => {
    const options = new RxList(['Tab 1', 'Tab 2', 'Tab 3']);
    const current = createTestAtom('Tab 1');
    
    const { container, unmount } = renderComponent(
      createElement(Tabs, { options, current })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const tabs = container.querySelectorAll('div[data-as="tab"]');
    expect(tabs.length).toBe(3);
    
    // 确保初始值为 Tab 1
    expect(current()).toBe('Tab 1');
    
    // 点击第二个标签
    if (tabs[1]) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      tabs[1].dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查当前值是否更新为 Tab 2
    expect(current()).toBe('Tab 2');
    
    // 点击第三个标签
    if (tabs[2]) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      tabs[2].dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查当前值是否更新为 Tab 3
    expect(current()).toBe('Tab 3');
  });
}); 