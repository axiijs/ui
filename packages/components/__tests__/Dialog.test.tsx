import { describe, it, expect, afterEach, vi } from 'vitest';
import { Dialog } from '../src/Dialog';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Dialog Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    
    // 清理可能残留的对话框元素
    document.body.querySelectorAll('div[data-as="root"]').forEach(el => {
      el.remove();
    });
  });

  it('renders correctly when visible', async () => {
    const visible = createTestAtom(true);
    
    const { unmount } = renderComponent(
      createElement(Dialog, { visible }, [
        createElement('div', { 'data-testid': 'dialog-content' }, ['Dialog Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Dialog uses a portal, we need to query the document body
    const dialogRoot = document.body.querySelector('div[data-as="root"]');
    expect(dialogRoot).not.toBeNull();
    
    // Check if the content is rendered
    const dialogContent = document.body.querySelector('div[data-as="content"]');
    expect(dialogContent).not.toBeNull();
    
    // Check if the children are rendered
    const contentElement = document.body.querySelector('div[data-testid="dialog-content"]');
    expect(contentElement).not.toBeNull();
    expect(contentElement?.textContent).toBe('Dialog Content');
    
    // Check if the dialog is visible
    const rootStyle = window.getComputedStyle(dialogRoot as Element);
    expect(rootStyle.display).not.toBe('none');
  });

  it('is not rendered when not visible', async () => {
    const visible = createTestAtom(false);
    
    const { unmount } = renderComponent(
      createElement(Dialog, { visible }, [
        createElement('div', { 'data-testid': 'dialog-content' }, ['Dialog Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Since Dialog uses a portal, we need to query the document body
    const dialogRoot = document.body.querySelector('div[data-as="root"]');
    
    // The root element might still be in the DOM, but it should be hidden with display: none
    if (dialogRoot) {
      const rootStyle = window.getComputedStyle(dialogRoot as Element);
      expect(rootStyle.display).toBe('none');
    } else {
      // If dialogRoot is null, the test passes as the dialog is not rendered
      expect(dialogRoot).toBeNull();
    }
  });

  it('closes when clicking on the background', async () => {
    const visible = createTestAtom(true);
    
    const { unmount } = renderComponent(
      createElement(Dialog, { visible }, [
        createElement('div', { 'data-testid': 'dialog-content' }, ['Dialog Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check initial state
    expect(visible()).toBe(true);
    
    // Click on the background (root element)
    const dialogRoot = document.body.querySelector('div[data-as="root"]');
    expect(dialogRoot).not.toBeNull();
    
    if (dialogRoot) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true
      });
      dialogRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if visibility was toggled
    expect(visible()).toBe(false);
  });

  it('does not close when clicking on the content', async () => {
    const visible = createTestAtom(true);
    
    const { unmount } = renderComponent(
      createElement(Dialog, { visible }, [
        createElement('div', { 'data-testid': 'dialog-content' }, ['Dialog Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check initial state
    expect(visible()).toBe(true);
    
    // Click on the content
    const dialogContent = document.body.querySelector('div[data-as="content"]');
    expect(dialogContent).not.toBeNull();
    
    if (dialogContent) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true
      });
      dialogContent.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if visibility remains true
    expect(visible()).toBe(true);
  });
}); 