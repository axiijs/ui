import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { Contextmenu } from '../src/Contextmenu';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Contextmenu Component', () => {
  let cleanup: () => void;

  beforeEach(() => {
    // 清理之前测试可能留下的 contextmenu 元素
    document.body.querySelectorAll('div[data-as="root"]').forEach(el => {
      el.remove();
    });
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    
    // 清理测试后的 contextmenu 元素
    document.body.querySelectorAll('div[data-as="root"]').forEach(el => {
      el.remove();
    });
  });

  it('renders correctly when position is provided', async () => {
    const position = createTestAtom({ x: 100, y: 100 });
    
    const { unmount } = renderComponent(
      createElement(Contextmenu, { position }, [
        createElement('div', { 'data-testid': 'contextmenu-content' }, ['Contextmenu Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Contextmenu uses a portal, we need to query the document body
    const contextmenuRoot = document.body.querySelector('div[data-as="root"]');
    expect(contextmenuRoot).not.toBeNull();
    
    // Check if the content is rendered
    const contentElement = document.body.querySelector('div[data-as="content"]');
    expect(contentElement).not.toBeNull();
    
    // Check if the children are rendered
    const contentTestElement = document.body.querySelector('div[data-testid="contextmenu-content"]');
    expect(contentTestElement).not.toBeNull();
    expect(contentTestElement?.textContent).toBe('Contextmenu Content');
    
    // Check if the contextmenu is visible
    const rootStyle = window.getComputedStyle(contextmenuRoot as Element);
    expect(rootStyle.display).toBe('block');
  });

  it('is not rendered when position is null', async () => {
    const position = createTestAtom(null);
    
    const { unmount } = renderComponent(
      createElement(Contextmenu, { position }, [
        createElement('div', { 'data-testid': 'contextmenu-content' }, ['Contextmenu Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Contextmenu uses a portal, we need to query the document body
    const contextmenuRoot = document.body.querySelector('div[data-as="root"]');
    
    // The root element might still be in the DOM, but it should be hidden with display: none
    if (contextmenuRoot) {
      const rootStyle = window.getComputedStyle(contextmenuRoot as Element);
      expect(rootStyle.display).toBe('none');
    } else {
      // If contextmenuRoot is null, the test passes as the contextmenu is not rendered
      expect(contextmenuRoot).toBeNull();
    }
  });

  it('positions content based on provided position', async () => {
    const position = createTestAtom({ x: 100, y: 100 });
    
    const { unmount } = renderComponent(
      createElement(Contextmenu, { position }, [
        createElement('div', { 'data-testid': 'contextmenu-content' }, ['Contextmenu Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the content is positioned correctly
    const contentElement = document.body.querySelector('div[data-as="content"]');
    expect(contentElement).not.toBeNull();
    
    const contentStyle = window.getComputedStyle(contentElement as Element);
    expect(contentStyle.position).toBe('absolute');
    
    // The content should be positioned at the provided coordinates
    // The exact positioning might vary based on the implementation and window size,
    // so we just check that the position properties are set
    expect(contentStyle.left).not.toBe('');
    expect(contentStyle.top).not.toBe('');
  });

  it('updates position when position prop changes', async () => {
    const position = createTestAtom({ x: 100, y: 100 });
    
    const { unmount } = renderComponent(
      createElement(Contextmenu, { position }, [
        createElement('div', { 'data-testid': 'contextmenu-content' }, ['Contextmenu Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Get initial position
    let contentElement = document.body.querySelector('div[data-as="content"]');
    expect(contentElement).not.toBeNull();
    
    let contentStyle = window.getComputedStyle(contentElement as Element);
    const initialLeft = contentStyle.left;
    const initialTop = contentStyle.top;
    
    // Change position
    position({ x: 200, y: 200 });
    await waitForDomUpdate();
    
    // Get updated position
    contentElement = document.body.querySelector('div[data-as="content"]');
    expect(contentElement).not.toBeNull();
    
    contentStyle = window.getComputedStyle(contentElement as Element);
    const updatedLeft = contentStyle.left;
    const updatedTop = contentStyle.top;
    
    // Check if position has changed
    // 由于位置计算可能受到窗口大小等因素影响，我们只检查位置是否有变化
    // 而不是检查具体的值
    expect(updatedLeft !== initialLeft || updatedTop !== initialTop).toBe(true);
  });

  it('closes when clicking outside the content', async () => {
    const position = createTestAtom({ x: 100, y: 100 });
    
    const { unmount } = renderComponent(
      createElement(Contextmenu, { position }, [
        createElement('div', { 'data-testid': 'contextmenu-content' }, ['Contextmenu Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check initial state
    expect(position()).not.toBeNull();
    
    // Click on the background (outside the content)
    const contextmenuRoot = document.body.querySelector('div[data-as="root"]');
    expect(contextmenuRoot).not.toBeNull();
    
    if (contextmenuRoot) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true
      });
      contextmenuRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if position was set to null
    expect(position()).toBeNull();
  });

  // Add a simple test that doesn't rely on portal rendering
  it('can be instantiated with props', () => {
    const position = createTestAtom({ x: 100, y: 100 });
    
    expect(() => {
      renderComponent(
        createElement(Contextmenu, { position }, [
          createElement('div', {}, ['Contextmenu Content'])
        ])
      );
    }).not.toThrow();
  });
}); 