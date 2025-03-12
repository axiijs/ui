import { describe, it, expect, afterEach } from 'vitest';
import { Input } from '../src/Input';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Input Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with initial value', async () => {
    const value = createTestAtom('initial value');
    const { container, unmount } = renderComponent(<Input value={value} />);
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    expect((input as HTMLInputElement).value).toBe('initial value');
  });

  it('updates value when input changes', async () => {
    const value = createTestAtom('');
    const { container, unmount } = renderComponent(<Input value={value} />);
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    
    // Simulate input change
    input.value = 'new value';
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
    
    await waitForDomUpdate();
    
    // Check if atom value was updated
    expect(value()).toBe('new value');
  });

  it('renders with placeholder', async () => {
    const value = createTestAtom('');
    const { container, unmount } = renderComponent(
      <Input value={value} placeholder="Enter text" />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe('Enter text');
  });

  it('renders with prefix and affix', async () => {
    const value = createTestAtom('');
    const prefix = createTestAtom('$');
    const affix = createTestAtom('.00');
    
    const { container, unmount } = renderComponent(
      <Input value={value} prefix={prefix} affix={affix} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const prefixElement = container.querySelector('div[data-as="prefix"]');
    const affixElement = container.querySelector('div[data-as="affix"]');
    
    expect(prefixElement).not.toBeNull();
    expect(affixElement).not.toBeNull();
    expect(prefixElement?.textContent).toBe('$');
    expect(affixElement?.textContent).toBe('.00');
  });
}); 