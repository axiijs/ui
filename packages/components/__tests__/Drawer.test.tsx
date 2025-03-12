import { describe, it, expect, afterEach, vi } from 'vitest';
import { Drawer } from '../src/Drawer';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Drawer Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    
    // 清理可能残留的抽屉元素
    document.body.querySelectorAll('div[data-as="root"]').forEach(el => {
      el.remove();
    });
  });

  it('renders correctly when visible', async () => {
    const visible = createTestAtom(true);
    
    const { unmount } = renderComponent(
      createElement(Drawer, { visible }, [
        createElement('div', { 'data-testid': 'drawer-content' }, ['Drawer Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Drawer uses a portal, we need to query the document body
    const drawerRoot = document.body.querySelector('div[data-as="root"]');
    expect(drawerRoot).not.toBeNull();
    
    // Check if the content is rendered
    const drawerContent = document.body.querySelector('div[data-as="content"]');
    expect(drawerContent).not.toBeNull();
    
    // Check if the children are rendered
    const contentElement = document.body.querySelector('div[data-testid="drawer-content"]');
    expect(contentElement).not.toBeNull();
    expect(contentElement?.textContent).toBe('Drawer Content');
    
    // Check if the drawer is visible
    const rootStyle = window.getComputedStyle(drawerRoot as Element);
    expect(rootStyle.display).not.toBe('none');
  });

  it('is not rendered when not visible', async () => {
    const visible = createTestAtom(false);
    
    const { unmount } = renderComponent(
      createElement(Drawer, { visible }, [
        createElement('div', { 'data-testid': 'drawer-content' }, ['Drawer Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Drawer uses a portal, we need to query the document body
    const drawerRoot = document.body.querySelector('div[data-as="root"]');
    
    // The root element might still be in the DOM, but it should be hidden with display: none
    if (drawerRoot) {
      const rootStyle = window.getComputedStyle(drawerRoot as Element);
      expect(rootStyle.display).toBe('none');
    } else {
      // If drawerRoot is null, the test passes as the drawer is not rendered
      expect(drawerRoot).toBeNull();
    }
  });

  it('closes when clicking on the background', async () => {
    const visible = createTestAtom(true);
    
    const { unmount } = renderComponent(
      createElement(Drawer, { visible }, [
        createElement('div', { 'data-testid': 'drawer-content' }, ['Drawer Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check initial state
    expect(visible()).toBe(true);
    
    // Click on the background (root element)
    const drawerRoot = document.body.querySelector('div[data-as="root"]');
    expect(drawerRoot).not.toBeNull();
    
    if (drawerRoot) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true
      });
      drawerRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if visibility was toggled
    expect(visible()).toBe(false);
  });

  it('does not close when clicking on the content', async () => {
    const visible = createTestAtom(true);
    
    const { unmount } = renderComponent(
      createElement(Drawer, { visible }, [
        createElement('div', { 'data-testid': 'drawer-content' }, ['Drawer Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check initial state
    expect(visible()).toBe(true);
    
    // Click on the content
    const drawerContent = document.body.querySelector('div[data-as="content"]');
    expect(drawerContent).not.toBeNull();
    
    if (drawerContent) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true
      });
      drawerContent.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if visibility remains true
    expect(visible()).toBe(true);
  });
}); 