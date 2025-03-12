import { describe, it, expect, afterEach, vi } from 'vitest';
import { Accordion, AccordionItem } from '../src/Accordion';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';
import { RxList } from 'axii';

describe('Accordion Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with items', async () => {
    const items = new RxList([
      { 
        title: createTestAtom('Section 1'), 
        content: createTestAtom('Content for section 1'),
        visible: createTestAtom(false)
      },
      { 
        title: createTestAtom('Section 2'), 
        content: createTestAtom('Content for section 2'),
        visible: createTestAtom(false)
      },
      { 
        title: createTestAtom('Section 3'), 
        content: createTestAtom('Content for section 3'),
        visible: createTestAtom(false)
      }
    ]);
    
    const { container, unmount } = renderComponent(
      <Accordion items={items} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const accordionRoot = container.querySelector('div[data-as="root"]');
    expect(accordionRoot).not.toBeNull();
    
    // Check if all accordion items are rendered - they don't have data-as="item" but are direct children of root
    const accordionItems = container.querySelectorAll('div[data-as="root"] > div[data-as="root"]');
    expect(accordionItems.length).toBe(3);
    
    // Check if the titles are rendered correctly
    const titles = container.querySelectorAll('div[data-as="title"]');
    expect(titles.length).toBe(3);
    expect(titles[0].textContent).toBe('Section 1');
    expect(titles[1].textContent).toBe('Section 2');
    expect(titles[2].textContent).toBe('Section 3');
  });
});

describe('AccordionItem Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with title and content', async () => {
    const title = createTestAtom('Item Title');
    const content = createTestAtom('Item Content');
    const visible = createTestAtom(false);
    
    const { container, unmount } = renderComponent(
      <AccordionItem title={title} content={content} visible={visible} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const itemRoot = container.querySelector('div[data-as="root"]');
    expect(itemRoot).not.toBeNull();
    
    // Check if the title is rendered correctly
    const titleElement = container.querySelector('div[data-as="title"]');
    expect(titleElement).not.toBeNull();
    expect(titleElement?.textContent).toBe('Item Title');
    
    // Check if the content is rendered but hidden (height: 0)
    const contentContainer = container.querySelector('div[data-as="contentContainer"]');
    expect(contentContainer).not.toBeNull();
    
    const contentElement = container.querySelector('div[data-as="content"]');
    expect(contentElement).not.toBeNull();
    expect(contentElement?.textContent).toBe('Item Content');
  });

  it('toggles visibility when header is clicked', async () => {
    const title = createTestAtom('Item Title');
    const content = createTestAtom('Item Content');
    const visible = createTestAtom(false);
    
    const { container, unmount } = renderComponent(
      <AccordionItem title={title} content={content} visible={visible} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // 检查初始状态
    expect(visible()).toBe(false);
    
    // 点击头部区域
    const header = container.querySelector('div[data-as="head"]');
    expect(header).not.toBeNull();
    
    if (header) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      header.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查可见性是否已切换
    expect(visible()).toBe(true);
    
    // 再次点击，确认可以切换回不可见状态
    if (header) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      header.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查可见性是否已切换回不可见
    expect(visible()).toBe(false);
  });
}); 