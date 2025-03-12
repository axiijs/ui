import { describe, it, expect, afterEach } from 'vitest';
import { Checkbox } from '../src/Checkbox';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Checkbox Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with initial value state', async () => {
    const value = createTestAtom(true);
    const { container, unmount } = renderComponent(<Checkbox value={value}></Checkbox>);
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const checkboxRoot = container.querySelector('div[data-as="root"]');
    expect(checkboxRoot).not.toBeNull();
    
    // Check if the main element exists
    const checkboxMain = container.querySelector('div[data-as="main"]');
    expect(checkboxMain).not.toBeNull();
  });

  it('updates value state when clicked', async () => {
    const value = createTestAtom(false);
    const { container, unmount } = renderComponent(<Checkbox value={value}></Checkbox>);
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const checkboxRoot = container.querySelector('div[data-as="root"]');
    expect(checkboxRoot).not.toBeNull();
    
    // Simulate click
    if (checkboxRoot) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      checkboxRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if atom value was updated
    expect(value()).toBe(true);
  });

  it('can be disabled', async () => {
    const value = createTestAtom(false);
    const disabled = createTestAtom(true);
    
    const { container, unmount } = renderComponent(
      <Checkbox value={value} disabled={disabled}></Checkbox>
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const checkboxRoot = container.querySelector('div[data-as="root"]');
    expect(checkboxRoot).not.toBeNull();
    
    // Check if it has the disabled attribute
    expect(checkboxRoot?.getAttribute('data-disabled')).toBe('true');
    
    // Try to click the disabled checkbox
    if (checkboxRoot) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      checkboxRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check that the value didn't change
    expect(value()).toBe(false);
  });
}); 