import { describe, it, expect, afterEach, vi } from 'vitest';
import { Card } from '../src/Card';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Card Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with initial value state', async () => {
    const value = createTestAtom(true);
    const { container, unmount } = renderComponent(<Card value={value} />);
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const cardRoot = container.querySelector('div[data-as="root"]');
    expect(cardRoot).not.toBeNull();
    
    // Check if the main element exists
    const cardMain = container.querySelector('div[data-as="main"]');
    expect(cardMain).not.toBeNull();
  });

  it('updates value state when clicked', async () => {
    const value = createTestAtom(false);
    const { container, unmount } = renderComponent(<Card value={value} />);
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const cardRoot = container.querySelector('div[data-as="root"]');
    expect(cardRoot).not.toBeNull();
    
    // 确保初始值为 false
    expect(value()).toBe(false);
    
    // 模拟点击
    if (cardRoot) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      cardRoot.dispatchEvent(clickEvent);
    }
    
    // 等待 DOM 更新
    await waitForDomUpdate();
    
    // 检查 atom 值是否更新为 true
    expect(value()).toBe(true);
    
    // 再次点击，确认值可以切换回 false
    if (cardRoot) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      cardRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查 atom 值是否更新为 false
    expect(value()).toBe(false);
  });
}); 