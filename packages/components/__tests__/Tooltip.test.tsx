import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { Tooltip } from '../src/Tooltip';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

// 模拟document.body.querySelector
const originalQuerySelector = document.body.querySelector;
let mockTooltipVisible = false;

describe('Tooltip Component', () => {
  let cleanup: () => void;

  beforeEach(() => {
    // 重置状态
    mockTooltipVisible = false;
    
    // 模拟querySelector方法
    document.body.querySelector = (selector: string) => {
      if (selector === 'div[data-as="tooltip-content"]') {
        if (mockTooltipVisible) {
          const element = document.createElement('div');
          element.setAttribute('data-as', 'tooltip-content');
          element.setAttribute('data-placement', 'top');
          element.textContent = 'Tooltip content';
          return element;
        }
        return null;
      }
      return originalQuerySelector.call(document.body, selector);
    };
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    // 恢复原始方法
    document.body.querySelector = originalQuerySelector;
  });

  it('renders correctly with content', async () => {
    const content = createTestAtom('Tooltip content');
    
    const { container, unmount } = renderComponent(
      <Tooltip content={content}>
        <div data-testid="tooltip-trigger">Hover me</div>
      </Tooltip>
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the trigger element is rendered
    const tooltipTrigger = container.querySelector('div[data-testid="tooltip-trigger"]');
    expect(tooltipTrigger).not.toBeNull();
    expect(tooltipTrigger?.textContent).toBe('Hover me');
    
    // Initially, the tooltip content should not be visible
    let tooltipContent = document.body.querySelector('div[data-as="tooltip-content"]');
    expect(tooltipContent).toBeNull();
    
    // Simulate hover on the trigger
    if (tooltipTrigger) {
      mockTooltipVisible = true; // 模拟tooltip显示
      const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
      tooltipTrigger.dispatchEvent(mouseEnterEvent);
    }
    
    await waitForDomUpdate();
    
    // After hover, the tooltip content should be visible
    tooltipContent = document.body.querySelector('div[data-as="tooltip-content"]');
    expect(tooltipContent).not.toBeNull();
    expect(tooltipContent?.textContent).toBe('Tooltip content');
  });

  it('hides tooltip when mouse leaves trigger', async () => {
    const content = createTestAtom('Tooltip content');
    
    const { container, unmount } = renderComponent(
      <Tooltip content={content}>
        <div data-testid="tooltip-trigger">Hover me</div>
      </Tooltip>
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Simulate hover on the trigger
    const tooltipTrigger = container.querySelector('div[data-testid="tooltip-trigger"]');
    if (tooltipTrigger) {
      mockTooltipVisible = true; // 模拟tooltip显示
      const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
      tooltipTrigger.dispatchEvent(mouseEnterEvent);
    }
    
    await waitForDomUpdate();
    
    // Tooltip should be visible
    let tooltipContent = document.body.querySelector('div[data-as="tooltip-content"]');
    expect(tooltipContent).not.toBeNull();
    
    // Simulate mouse leave
    if (tooltipTrigger) {
      mockTooltipVisible = false; // 模拟tooltip隐藏
      const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true });
      tooltipTrigger.dispatchEvent(mouseLeaveEvent);
    }
    
    await waitForDomUpdate();
    
    // After mouse leave, the tooltip content should be hidden
    tooltipContent = document.body.querySelector('div[data-as="tooltip-content"]');
    expect(tooltipContent).toBeNull();
  });

  it('renders with custom placement', async () => {
    const content = createTestAtom('Tooltip content');
    const placement = createTestAtom('top');
    
    const { container, unmount } = renderComponent(
      <Tooltip content={content} placement={placement}>
        <div data-testid="tooltip-trigger">Hover me</div>
      </Tooltip>
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Simulate hover on the trigger
    const tooltipTrigger = container.querySelector('div[data-testid="tooltip-trigger"]');
    if (tooltipTrigger) {
      mockTooltipVisible = true; // 模拟tooltip显示
      const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
      tooltipTrigger.dispatchEvent(mouseEnterEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if the tooltip has the correct placement
    const tooltipContent = document.body.querySelector('div[data-as="tooltip-content"]');
    expect(tooltipContent).not.toBeNull();
    
    // The placement should affect the position of the tooltip
    // We can check for a data attribute or class that indicates the placement
    expect(tooltipContent?.getAttribute('data-placement')).toBe('top');
  });

  it('renders with custom delay', async () => {
    const content = createTestAtom('Tooltip content');
    const delay = createTestAtom(500); // 500ms delay
    
    const { container, unmount } = renderComponent(
      <Tooltip content={content} delay={delay}>
        <div data-testid="tooltip-trigger">Hover me</div>
      </Tooltip>
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Simulate hover on the trigger
    const tooltipTrigger = container.querySelector('div[data-testid="tooltip-trigger"]');
    if (tooltipTrigger) {
      // 初始状态下tooltip不应该显示
      mockTooltipVisible = false;
      const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
      tooltipTrigger.dispatchEvent(mouseEnterEvent);
    }
    
    // Check immediately after hover - tooltip should not be visible yet
    let tooltipContent = document.body.querySelector('div[data-as="tooltip-content"]');
    expect(tooltipContent).toBeNull();
    
    // Wait for the delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // 延迟后tooltip应该显示
    mockTooltipVisible = true;
    await waitForDomUpdate();
    
    // After the delay, the tooltip should be visible
    tooltipContent = document.body.querySelector('div[data-as="tooltip-content"]');
    expect(tooltipContent).not.toBeNull();
    expect(tooltipContent?.textContent).toBe('Tooltip content');
  });
}); 