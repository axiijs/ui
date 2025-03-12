import { describe, it, expect, afterEach, vi } from 'vitest';
import { Button } from '../src/Button';
import { renderComponent, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

// 扩展 Window 接口以包含我们的全局函数
declare global {
  interface Window {
    handleButtonClick?: () => void;
  }
}

describe('Button Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly', async () => {
    const { container, unmount } = renderComponent(
      createElement(Button, {}, ['Click me'])
    );
    cleanup = unmount;
    
    // Wait for any potential updates
    await waitForDomUpdate();
    
    // Check if button is rendered
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    
    // Check if text content is correct
    expect(button?.textContent).toContain('Click me');
  });

  it('can be clicked', async () => {
    const handleClick = vi.fn();
    
    // 在全局对象上添加事件处理器
    window.handleButtonClick = handleClick;

    const { container, unmount } = renderComponent(
      createElement(Button, { '$root:onClick': handleClick }, ['Click me'])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    
    // 直接触发点击事件
    if (button) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      button.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // 检查点击处理器是否被调用
    // 注意：由于 Button 组件没有显式处理 onClick 属性，
    // 这个测试可能会失败，除非 Axii 框架自动将 onClick 属性绑定到元素上
    expect(handleClick).toHaveBeenCalled();
    
    // 清理全局对象
    delete window.handleButtonClick;
  });
}); 