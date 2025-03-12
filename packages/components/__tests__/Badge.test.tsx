import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { Badge } from '../src/Badge';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Badge Component', () => {
  let cleanup: () => void;

  beforeEach(() => {
    // 清理之前测试可能留下的任何元素
    document.body.querySelectorAll('div[data-as="root"]').forEach(el => {
      el.remove();
    });
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with content', async () => {
    const content = createTestAtom('5');
    
    const { container, unmount } = renderComponent(
      createElement(Badge, { content: content }, 
        createElement('div', { 'data-testid': 'badge-child' }, 'Content')
      )
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const badgeRoot = container.querySelector('div[data-as="root"]');
    expect(badgeRoot).not.toBeNull();
    
    // Check if the badge indicator is rendered
    const badgeIndicator = container.querySelector('div[data-as="indicator"]');
    expect(badgeIndicator).not.toBeNull();
    expect(badgeIndicator?.textContent).toBe('5');
    
    // Check if the children are rendered
    const badgeChild = container.querySelector('div[data-testid="badge-child"]');
    expect(badgeChild).not.toBeNull();
    expect(badgeChild?.textContent).toBe('Content');
  });

  it('renders with dot style when dot prop is true', async () => {
    const dot = createTestAtom(true);
    
    const { container, unmount } = renderComponent(
      createElement(Badge, { dot: dot }, 
        createElement('div', { 'data-testid': 'badge-child' }, 'Content')
      )
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the badge indicator is rendered as a dot
    const badgeIndicator = container.querySelector('div[data-as="indicator"]');
    expect(badgeIndicator).not.toBeNull();
    
    const indicatorStyle = window.getComputedStyle(badgeIndicator as Element);
    expect(indicatorStyle.borderRadius).toBe('50%');
    expect(indicatorStyle.width).toBe('8px');
    expect(indicatorStyle.height).toBe('8px');
    expect(indicatorStyle.padding).toBe('0px');
  });

  it('renders with custom color', async () => {
    const content = createTestAtom('5');
    const color = createTestAtom('green');
    
    const { container, unmount } = renderComponent(
      createElement(Badge, { content: content, color: color }, 
        createElement('div', { 'data-testid': 'badge-child' }, 'Content')
      )
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the badge indicator has the custom color
    const badgeIndicator = container.querySelector('div[data-as="indicator"]');
    expect(badgeIndicator).not.toBeNull();
    
    const indicatorStyle = window.getComputedStyle(badgeIndicator as Element);
    expect(indicatorStyle.backgroundColor).toBe('green');
  });

  it('renders with custom position', async () => {
    const content = createTestAtom('5');
    const position = createTestAtom({ top: '-5px', right: '-5px' });
    
    const { container, unmount } = renderComponent(
      createElement(Badge, { content: content, position: position }, 
        createElement('div', { 'data-testid': 'badge-child' }, 'Content')
      )
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the badge indicator has the custom position
    const badgeIndicator = container.querySelector('div[data-as="indicator"]');
    expect(badgeIndicator).not.toBeNull();
    
    const indicatorStyle = window.getComputedStyle(badgeIndicator as Element);
    expect(indicatorStyle.top).toBe('-5px');
    expect(indicatorStyle.right).toBe('-5px');
  });
}); 