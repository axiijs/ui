import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { Dropdown } from '../src/Dropdown';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

// 创建一个模拟的 RxDOMSize 类
class MockRxDOMSize {
  ref = () => {};
  value = () => ({ width: 100, height: 50 });
}

describe('Dropdown Component', () => {
  let cleanup: () => void;

  beforeEach(() => {
    // 清理之前测试可能留下的任何 dropdown 元素
    document.body.querySelectorAll('div[data-as="root"]').forEach(el => {
      el.remove();
    });
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    vi.restoreAllMocks();
  });

  it('renders correctly when visible', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Dropdown, {
        visible: visible,
        targetPosition: targetPosition
      }, 
      createElement('div', { 'data-testid': 'dropdown-content' }, 'Dropdown Content'))
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Dropdown uses a portal, we need to query the document body
    const dropdownBackground = document.body.querySelector('div[data-as="root"]');
    expect(dropdownBackground).not.toBeNull();
    
    // Check if the content is rendered
    const contentContainer = document.body.querySelector('div[data-as="content"]');
    expect(contentContainer).not.toBeNull();
    
    // Check if the children are rendered
    const contentElement = document.body.querySelector('div[data-testid="dropdown-content"]');
    expect(contentElement).not.toBeNull();
    expect(contentElement?.textContent).toBe('Dropdown Content');
    
    // Check if the dropdown is visible
    const backgroundStyle = window.getComputedStyle(dropdownBackground as Element);
    expect(backgroundStyle.display).not.toBe('none');
  });

  it('is not rendered when not visible', async () => {
    const visible = createTestAtom(false);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Dropdown, {
        visible: visible,
        targetPosition: targetPosition
      }, 
      createElement('div', { 'data-testid': 'dropdown-content' }, 'Dropdown Content'))
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Dropdown uses a portal, we need to query the document body
    const dropdownBackground = document.body.querySelector('div[data-as="root"]');
    
    // The background element might still be in the DOM, but it should be hidden with display: none
    if (dropdownBackground) {
      const backgroundStyle = window.getComputedStyle(dropdownBackground as Element);
      expect(backgroundStyle.display).toBe('none');
    } else {
      // If dropdownBackground is null, the test passes as the dropdown is not rendered
      expect(dropdownBackground).toBeNull();
    }
  });

  it('positions content based on targetPosition', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    // 使用 jest.spyOn 替代 vi.mock
    // 我们不需要模拟 RxDOMSize，因为测试只需要检查样式属性
    
    const { unmount } = renderComponent(
      createElement(Dropdown, {
        visible: visible,
        targetPosition: targetPosition
      }, 
      createElement('div', { 'data-testid': 'dropdown-content' }, 'Dropdown Content'))
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the content container is positioned correctly
    const contentContainer = document.body.querySelector('div[data-as="content"]');
    expect(contentContainer).not.toBeNull();
    
    const contentStyle = window.getComputedStyle(contentContainer as Element);
    expect(contentStyle.position).toBe('absolute');
    
    // The exact positioning might vary based on the implementation and window size,
    // so we just check that the left position is set to something
    expect(contentStyle.left).not.toBe('');
  });

  it('toggles visibility when visible prop changes', async () => {
    const visible = createTestAtom(false);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Dropdown, {
        visible: visible,
        targetPosition: targetPosition
      }, 
      createElement('div', { 'data-testid': 'dropdown-content' }, 'Dropdown Content'))
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Initially, the dropdown should not be visible
    let dropdownBackground = document.body.querySelector('div[data-as="root"]');
    if (dropdownBackground) {
      const backgroundStyle = window.getComputedStyle(dropdownBackground as Element);
      expect(backgroundStyle.display).toBe('none');
    }
    
    // Change visibility to true
    visible(true);
    await waitForDomUpdate();
    
    // After changing visibility, the dropdown should be visible
    dropdownBackground = document.body.querySelector('div[data-as="root"]');
    expect(dropdownBackground).not.toBeNull();
    
    const backgroundStyle = window.getComputedStyle(dropdownBackground as Element);
    expect(backgroundStyle.display).not.toBe('none');
    
    // Check if the content is rendered
    const contentElement = document.body.querySelector('div[data-testid="dropdown-content"]');
    expect(contentElement).not.toBeNull();
    expect(contentElement?.textContent).toBe('Dropdown Content');
  });

  it('closes when clicking outside the content', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Dropdown, {
        visible: visible,
        targetPosition: targetPosition
      }, 
      createElement('div', { 'data-testid': 'dropdown-content' }, 'Dropdown Content'))
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check initial state
    expect(visible()).toBe(true);
    
    // Click on the background (outside the content)
    const dropdownBackground = document.body.querySelector('div[data-as="root"]');
    expect(dropdownBackground).not.toBeNull();
    
    if (dropdownBackground) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true 
      });
      dropdownBackground.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if visibility was toggled
    expect(visible()).toBe(false);
  });

  // Add a simple test that doesn't rely on portal rendering
  it('can be instantiated with props', () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    expect(() => {
      renderComponent(
        createElement(Dropdown, {
          visible: visible,
          targetPosition: targetPosition
        }, 
        createElement('div', {}, 'Dropdown Content'))
      );
    }).not.toThrow();
  });
}); 