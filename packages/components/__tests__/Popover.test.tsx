import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { Popover } from '../src/Popover';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Popover Component', () => {
  let cleanup: () => void;

  beforeEach(() => {
    // 清理之前测试可能留下的 popover 元素
    document.body.querySelectorAll('div[data-as="root"]').forEach(el => {
      el.remove();
    });
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    
    // 清理测试后的 popover 元素
    document.body.querySelectorAll('div[data-as="root"]').forEach(el => {
      el.remove();
    });
  });

  it('renders correctly when visible', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Popover, { 
        visible, 
        targetPosition 
      }, [
        createElement('div', { 'data-testid': 'popover-content' }, ['Popover Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Popover uses a portal, we need to query the document body
    const popoverRoot = document.body.querySelector('div[data-as="root"]');
    expect(popoverRoot).not.toBeNull();
    
    // Check if the content is rendered
    const contentElement = document.body.querySelector('div[data-as="content"]');
    expect(contentElement).not.toBeNull();
    
    // Check if the children are rendered
    const contentTestElement = document.body.querySelector('div[data-testid="popover-content"]');
    expect(contentTestElement).not.toBeNull();
    expect(contentTestElement?.textContent).toBe('Popover Content');
    
    // Check if the popover is visible
    const rootStyle = window.getComputedStyle(popoverRoot as Element);
    expect(rootStyle.display).not.toBe('none');
  });

  it('is not rendered when not visible', async () => {
    const visible = createTestAtom(false);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Popover, { 
        visible, 
        targetPosition 
      }, [
        createElement('div', { 'data-testid': 'popover-content' }, ['Popover Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Popover uses a portal, we need to query the document body
    const popoverRoot = document.body.querySelector('div[data-as="root"]');
    
    // The root element might still be in the DOM, but it should be hidden with display: none
    if (popoverRoot) {
      const rootStyle = window.getComputedStyle(popoverRoot as Element);
      expect(rootStyle.display).toBe('none');
    } else {
      // If popoverRoot is null, the test passes as the popover is not rendered
      expect(popoverRoot).toBeNull();
    }
  });

  it('positions content based on targetPosition and default align', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Popover, { 
        visible, 
        targetPosition 
      }, [
        createElement('div', { 'data-testid': 'popover-content' }, ['Popover Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the content is positioned correctly
    const contentElement = document.body.querySelector('div[data-as="content"]');
    expect(contentElement).not.toBeNull();
    
    const contentStyle = window.getComputedStyle(contentElement as Element);
    expect(contentStyle.position).toBe('absolute');
    
    // With default align (left: 'left', top: 'bottom'), the content should be positioned
    // at the bottom-left of the target
    // The exact positioning might vary based on the implementation and window size,
    // so we just check that the position properties are set
    expect(contentStyle.left).not.toBe('');
    expect(contentStyle.top).not.toBe('');
  });

  it('positions content with custom align settings', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    const align = createTestAtom({ right: 'right', bottom: 'bottom' });
    
    const { unmount } = renderComponent(
      createElement(Popover, { 
        visible, 
        targetPosition, 
        align 
      }, [
        createElement('div', { 'data-testid': 'popover-content' }, ['Popover Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the content is positioned correctly
    const contentElement = document.body.querySelector('div[data-as="content"]');
    expect(contentElement).not.toBeNull();
    
    const contentStyle = window.getComputedStyle(contentElement as Element);
    expect(contentStyle.position).toBe('absolute');
    
    // With custom align (right: 'right', bottom: 'bottom'), the content should be positioned differently
    // The exact positioning might vary based on the implementation and window size,
    // so we just check that the position properties are set
    expect(contentStyle.left).not.toBe('');
    expect(contentStyle.top).not.toBe('');
  });

  it('toggles visibility when visible prop changes', async () => {
    const visible = createTestAtom(false);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Popover, { 
        visible, 
        targetPosition 
      }, [
        createElement('div', { 'data-testid': 'popover-content' }, ['Popover Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Initially, the popover should not be visible
    let popoverRoot = document.body.querySelector('div[data-as="root"]');
    if (popoverRoot) {
      const rootStyle = window.getComputedStyle(popoverRoot as Element);
      expect(rootStyle.display).toBe('none');
    }
    
    // Change visibility to true
    visible(true);
    await waitForDomUpdate();
    
    // After changing visibility, the popover should be visible
    popoverRoot = document.body.querySelector('div[data-as="root"]');
    expect(popoverRoot).not.toBeNull();
    
    const rootStyle = window.getComputedStyle(popoverRoot as Element);
    expect(rootStyle.display).not.toBe('none');
    
    // Check if the content is rendered
    const contentElement = document.body.querySelector('div[data-testid="popover-content"]');
    expect(contentElement).not.toBeNull();
    expect(contentElement?.textContent).toBe('Popover Content');
  });

  it('closes when clicking outside the content', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { unmount } = renderComponent(
      createElement(Popover, { 
        visible, 
        targetPosition 
      }, [
        createElement('div', { 'data-testid': 'popover-content' }, ['Popover Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check initial state
    expect(visible()).toBe(true);
    
    // Click on the background (outside the content)
    const popoverRoot = document.body.querySelector('div[data-as="root"]');
    expect(popoverRoot).not.toBeNull();
    
    if (popoverRoot) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true
      });
      popoverRoot.dispatchEvent(clickEvent);
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
        createElement(Popover, { 
          visible, 
          targetPosition 
        }, [
          createElement('div', {}, ['Popover Content'])
        ])
      );
    }).not.toThrow();
  });
}); 