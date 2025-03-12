import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { InputOTP } from '../src/InputOTP';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('InputOTP Component', () => {
  let cleanup: () => void;
  let originalAddEventListener: typeof Element.prototype.addEventListener;
  let keyDownHandlers: Map<Element, (e: KeyboardEvent) => void>;

  beforeEach(() => {
    // 保存原始的 addEventListener 方法
    originalAddEventListener = Element.prototype.addEventListener;
    keyDownHandlers = new Map();

    // 模拟 addEventListener 方法，捕获 keydown 事件处理器
    Element.prototype.addEventListener = function(
      this: Element,
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      if (type === 'keydown' && typeof listener === 'function') {
        keyDownHandlers.set(this, listener as (e: KeyboardEvent) => void);
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

  it('renders correctly with default props', async () => {
    const value = createTestAtom('');
    
    const { container, unmount } = renderComponent(
      createElement(InputOTP, { value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const inputOTPRoot = container.querySelector('div[data-as="root"]');
    expect(inputOTPRoot).not.toBeNull();
    
    // Check if the cells are rendered (default length is 6)
    const cells = container.querySelectorAll('div[data-as="cell"]');
    expect(cells.length).toBe(6);
    
    // Check if all cells have the placeholder
    cells.forEach(cell => {
      expect(cell.textContent).toBe('-');
    });
  });

  it('renders with custom length', async () => {
    const value = createTestAtom('');
    const length = createTestAtom(4);
    
    const { container, unmount } = renderComponent(
      createElement(InputOTP, { value, length })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the cells are rendered with custom length
    const cells = container.querySelectorAll('div[data-as="cell"]');
    expect(cells.length).toBe(4);
  });

  it('renders with initial value', async () => {
    const value = createTestAtom('123');
    
    const { container, unmount } = renderComponent(
      createElement(InputOTP, { value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the cells display the initial value
    const cells = container.querySelectorAll('div[data-as="cell"]');
    expect(cells[0].textContent).toBe('1');
    expect(cells[1].textContent).toBe('2');
    expect(cells[2].textContent).toBe('3');
    expect(cells[3].textContent).toBe('-'); // Placeholder for empty cell
  });

  // 测试输入单个数字
  it('handles single digit input', async () => {
    const value = createTestAtom('');
    const onChange = vi.fn();
    
    const { container, unmount } = renderComponent(
      createElement(InputOTP, { value, onChange })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // 获取根元素和单元格
    const inputOTPRoot = container.querySelector('div[data-as="root"]');
    const cells = container.querySelectorAll('div[data-as="cell"]');
    expect(inputOTPRoot).not.toBeNull();
    expect(cells.length).toBe(6);
    
    // 点击第一个单元格来聚焦它
    if (cells[0]) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true 
      });
      cells[0].dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 模拟键盘输入数字 5
    if (inputOTPRoot && keyDownHandlers.has(inputOTPRoot)) {
      const keyDownHandler = keyDownHandlers.get(inputOTPRoot)!;
      const keyDownEvent = new KeyboardEvent('keydown', { 
        key: '5', 
        bubbles: true,
        cancelable: true
      });
      keyDownHandler(keyDownEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查值是否更新
    expect(value()).toBe('5');
    expect(onChange).toHaveBeenCalledWith('5');
  });
  
  // 测试输入多个数字
  it('handles multiple digit input', async () => {
    const value = createTestAtom('');
    const onChange = vi.fn();
    
    const { container, unmount } = renderComponent(
      createElement(InputOTP, { value, onChange })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // 获取根元素和单元格
    const inputOTPRoot = container.querySelector('div[data-as="root"]');
    const cells = container.querySelectorAll('div[data-as="cell"]');
    
    // 点击第一个单元格来聚焦它
    if (cells[0]) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true 
      });
      cells[0].dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 模拟键盘输入数字 5
    if (inputOTPRoot && keyDownHandlers.has(inputOTPRoot)) {
      const keyDownHandler = keyDownHandlers.get(inputOTPRoot)!;
      const keyDownEvent = new KeyboardEvent('keydown', { 
        key: '5', 
        bubbles: true,
        cancelable: true
      });
      keyDownHandler(keyDownEvent);
    }
    
    await waitForDomUpdate();
    
    // 模拟键盘输入数字 9 到第二个单元格（自动聚焦到下一个单元格）
    if (inputOTPRoot && keyDownHandlers.has(inputOTPRoot)) {
      const keyDownHandler = keyDownHandlers.get(inputOTPRoot)!;
      const keyDownEvent = new KeyboardEvent('keydown', { 
        key: '9', 
        bubbles: true,
        cancelable: true
      });
      keyDownHandler(keyDownEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查值是否更新
    expect(value()).toBe('59');
    expect(onChange).toHaveBeenCalledWith('59');
  });
  
  // 测试退格键
  it('handles backspace key', async () => {
    const value = createTestAtom('59');
    const onChange = vi.fn();
    
    const { container, unmount } = renderComponent(
      createElement(InputOTP, { value, onChange })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // 获取根元素和单元格
    const inputOTPRoot = container.querySelector('div[data-as="root"]');
    const cells = container.querySelectorAll('div[data-as="cell"]');
    
    // 点击第二个单元格来聚焦它
    if (cells[1]) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true 
      });
      cells[1].dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 模拟退格键删除第二个单元格的值
    if (inputOTPRoot && keyDownHandlers.has(inputOTPRoot)) {
      const keyDownHandler = keyDownHandlers.get(inputOTPRoot)!;
      const keyDownEvent = new KeyboardEvent('keydown', { 
        key: 'Backspace', 
        bubbles: true,
        cancelable: true
      });
      keyDownHandler(keyDownEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查值是否更新
    expect(value()).toBe('5');
    expect(onChange).toHaveBeenCalledWith('5');
  });
}); 