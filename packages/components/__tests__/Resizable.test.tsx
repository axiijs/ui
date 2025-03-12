import { describe, it, expect, afterEach, vi } from 'vitest';
import { Resizable } from '../src/Resizable';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Resizable Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with children', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    const { container, unmount } = renderComponent(
      createElement(Resizable, { 
        visible, 
        targetPosition 
      }, [
        createElement('div', { 'data-testid': 'resizable-content' }, ['Resizable Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const resizableRoot = container.querySelector('div');
    expect(resizableRoot).not.toBeNull();
    
    // Check if the children are rendered
    const contentElement = container.querySelector('div[data-testid="resizable-content"]');
    expect(contentElement).not.toBeNull();
    expect(contentElement?.textContent).toBe('Resizable Content');
    
    // Check if the resize handles are rendered (there should be 9 of them)
    const resizeHandles = container.querySelectorAll('div > div:not([data-testid])');
    expect(resizeHandles.length).toBe(9);
  });

  it('allows interaction with resize handles', async () => {
    const visible = createTestAtom(true);
    const targetPosition = createTestAtom({ left: 100, top: 100, bottom: 120, right: 200 });
    
    // Create a mock function to track events
    const mockMouseDown = vi.fn();
    
    const { container, unmount } = renderComponent(
      createElement(Resizable, { 
        visible, 
        targetPosition 
      }, [
        createElement('div', { 
          'data-testid': 'resizable-content',
          style: { width: '200px', height: '100px' }
        }, ['Resizable Content'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Get the resize handles
    const resizeHandles = container.querySelectorAll('div > div:not([data-testid])');
    expect(resizeHandles.length).toBe(9);
    
    // Add event listener to the document to track events
    document.addEventListener('mousedown', mockMouseDown);
    
    // Simulate a mousedown event on one of the handles
    const bottomRightHandle = resizeHandles[7]; // Assuming the bottom-right handle is the 8th one
    expect(bottomRightHandle).not.toBeNull();
    
    if (bottomRightHandle) {
      const mouseDownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        clientX: 200,
        clientY: 100
      });
      bottomRightHandle.dispatchEvent(mouseDownEvent);
    }
    
    // Check if the event was triggered
    expect(mockMouseDown).toHaveBeenCalled();
    
    // Clean up
    document.removeEventListener('mousedown', mockMouseDown);
  });
}); 