import { describe, it, expect, afterEach } from 'vitest';
import { Textarea } from '../src/Textarea';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Textarea Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with initial value', async () => {
    const value = createTestAtom('initial value');
    const { container, unmount } = renderComponent(<Textarea value={value} />);
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBeNull();
    expect((textarea as HTMLTextAreaElement).value).toBe('initial value');
  });

  it('updates value when input changes', async () => {
    const value = createTestAtom('');
    const { container, unmount } = renderComponent(<Textarea value={value} />);
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).not.toBeNull();
    
    // Simulate input change
    textarea.value = 'new value';
    const event = new Event('input', { bubbles: true });
    textarea.dispatchEvent(event);
    
    await waitForDomUpdate();
    
    // Check if atom value was updated
    expect(value()).toBe('new value');
  });

  it('renders with placeholder', async () => {
    const value = createTestAtom('');
    const { container, unmount } = renderComponent(
      <Textarea value={value} placeholder="Enter text" />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).not.toBeNull();
    expect(textarea.placeholder).toBe('Enter text');
  });
}); 