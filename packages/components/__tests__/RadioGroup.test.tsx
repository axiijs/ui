import { describe, it, expect, afterEach } from 'vitest';
import { RadioGroup } from '../src/RadioGroup';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';
import { RxList } from 'axii';

describe('RadioGroup Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with options', async () => {
    const options = new RxList([
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ]);
    const value = createTestAtom(1);
    
    const { container, unmount } = renderComponent(
      createElement(RadioGroup, { options, value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const radioGroupRoot = container.querySelector('div[data-as="root"]');
    expect(radioGroupRoot).not.toBeNull();
    
    // Check if all radio options are rendered - they don't have data-as="option" but are direct children of root
    const radioOptions = container.querySelectorAll('div[data-as="root"] > div[data-as="root"]');
    expect(radioOptions.length).toBe(3);
    
    // Check if the option text is rendered correctly
    const optionTexts = Array.from(radioOptions).map(option => 
      option.querySelector('div:nth-child(2)')?.textContent
    );
    expect(optionTexts).toContain('Option 1');
    expect(optionTexts).toContain('Option 2');
    expect(optionTexts).toContain('Option 3');
  });

  it('updates selected value when an option is clicked', async () => {
    const options = new RxList([
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ]);
    const value = createTestAtom(1);
    
    const { container, unmount } = renderComponent(
      createElement(RadioGroup, { options, value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const radioOptions = container.querySelectorAll('div[data-as="root"] > div[data-as="root"]');
    expect(radioOptions.length).toBe(3);
    
    // Click on the second option
    if (radioOptions[1]) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      radioOptions[1].dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if the value was updated
    // RadioGroup 组件设置的是整个选项对象，而不仅仅是值
    expect(value()).toEqual({ label: 'Option 2', value: 2 });
  });

  it('renders with simple string options', async () => {
    const options = new RxList(['Option A', 'Option B', 'Option C']);
    const value = createTestAtom('Option A');
    
    const { container, unmount } = renderComponent(
      createElement(RadioGroup, { options, value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if all radio options are rendered
    const radioOptions = container.querySelectorAll('div[data-as="root"] > div[data-as="root"]');
    expect(radioOptions.length).toBe(3);
    
    // Check if the option text is rendered correctly
    const optionTexts = Array.from(radioOptions).map(option => 
      option.querySelector('div:nth-child(2)')?.textContent
    );
    expect(optionTexts).toContain('Option A');
    expect(optionTexts).toContain('Option B');
    expect(optionTexts).toContain('Option C');
  });
}); 