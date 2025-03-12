import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { Switch } from '../src/Switch';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Switch Component', () => {
  let cleanup: () => void;
  let originalAddEventListener: typeof Element.prototype.addEventListener;
  let clickHandlers: Map<Element, (e: MouseEvent) => void>;

  beforeEach(() => {
    // 保存原始的 addEventListener 方法
    originalAddEventListener = Element.prototype.addEventListener;
    clickHandlers = new Map();

    // 模拟 addEventListener 方法，捕获 click 事件处理器
    Element.prototype.addEventListener = function(
      this: Element,
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      if (type === 'click' && typeof listener === 'function') {
        clickHandlers.set(this, listener as (e: MouseEvent) => void);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    // 恢复原始的 addEventListener 方法
    Element.prototype.addEventListener = originalAddEventListener;
  });

  it('renders correctly with initial value state', async () => {
    const value = createTestAtom(true);
    const { container, unmount } = renderComponent(
      createElement(Switch, { value: value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const switchRoot = container.querySelector('div[data-as="root"]');
    expect(switchRoot).not.toBeNull();
    
    const switchMain = container.querySelector('div[data-as="main"]');
    expect(switchMain).not.toBeNull();
  });

  it('updates value state when clicked', async () => {
    const value = createTestAtom(false);
    const { container, unmount } = renderComponent(
      createElement(Switch, { value: value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const switchRoot = container.querySelector('div[data-as="root"]');
    expect(switchRoot).not.toBeNull();
    
    // 模拟点击事件
    if (switchRoot) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true 
      });
      switchRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查 atom 值是否更新
    expect(value()).toBe(true);
  });

  it('can be disabled', async () => {
    const value = createTestAtom(false);
    const disabled = createTestAtom(true);
    
    const { container, unmount } = renderComponent(
      createElement(Switch, { 
        value: value, 
        disabled: disabled 
      })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const switchRoot = container.querySelector('div[data-as="root"]');
    expect(switchRoot).not.toBeNull();
    
    // 检查是否有 disabled 属性
    expect(switchRoot?.getAttribute('data-disabled')).toBe('true');
    
    // 尝试点击禁用的开关
    if (switchRoot) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true 
      });
      switchRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查值是否保持不变
    expect(value()).toBe(false);
  });

  
}); 