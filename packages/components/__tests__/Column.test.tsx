import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { Column } from '../src/Column';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Column Component', () => {
  let cleanup: () => void;
  let originalMutationObserver: typeof MutationObserver;
  let mockMutationObserverCallbacks: Map<Node, (mutations: MutationRecord[]) => void>;

  beforeEach(() => {
    // 保存原始的 MutationObserver
    originalMutationObserver = global.MutationObserver;
    mockMutationObserverCallbacks = new Map();

    // 模拟 MutationObserver
    global.MutationObserver = class MockMutationObserver {
      callback: (mutations: MutationRecord[]) => void;

      constructor(callback: (mutations: MutationRecord[]) => void) {
        this.callback = callback;
      }

      observe(target: Node, options?: MutationObserverInit): void {
        mockMutationObserverCallbacks.set(target, this.callback);
      }

      disconnect(): void {
        // 不需要实现
      }

      takeRecords(): MutationRecord[] {
        return [];
      }
    } as any;
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    // 恢复原始的 MutationObserver
    global.MutationObserver = originalMutationObserver;
  });

  it('renders correctly with children', async () => {
    const { container, unmount } = renderComponent(
      createElement(Column, {}, [
        createElement('div', { 'data-testid': 'child-1' }, ['Child 1']),
        createElement('div', { 'data-testid': 'child-2' }, ['Child 2']),
        createElement('div', { 'data-testid': 'child-3' }, ['Child 3'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const columnRoot = container.querySelector('div[data-as="root"]');
    expect(columnRoot).not.toBeNull();
    
    // Check if all children are rendered
    const children = container.querySelectorAll('[data-testid^="child-"]');
    expect(children.length).toBe(3);
    
    // Check if children content is correct
    expect(children[0].textContent).toBe('Child 1');
    expect(children[1].textContent).toBe('Child 2');
    expect(children[2].textContent).toBe('Child 3');
  });

  it('applies gap correctly', async () => {
    const gap = createTestAtom(10);
    
    const { container, unmount } = renderComponent(
      createElement(Column, { gap }, [
        createElement('div', { 'data-testid': 'child-1' }, ['Child 1']),
        createElement('div', { 'data-testid': 'child-2' }, ['Child 2'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const columnRoot = container.querySelector('div[data-as="root"]');
    expect(columnRoot).not.toBeNull();
    
    // Check if gap is applied correctly
    const rootStyle = window.getComputedStyle(columnRoot as Element);
    expect(rootStyle.gap).toBe('10px');
    
    // Update gap and check if it's applied
    gap(20);
    await waitForDomUpdate();
    
    const updatedRootStyle = window.getComputedStyle(columnRoot as Element);
    expect(updatedRootStyle.gap).toBe('20px');
  });

  it('updates element positions based on data-order attribute', async () => {
    // 保存原始的 offsetHeight 描述符
    const originalOffsetHeightDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
    
    // 模拟元素的 offsetHeight
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get: function() {
        return 50; // 假设每个元素高度为 50px
      }
    });

    const { container, unmount } = renderComponent(
      createElement(Column, {}, [
        createElement('div', { 'data-testid': 'child-1', 'data-order': '1' }, ['Child 1']),
        createElement('div', { 'data-testid': 'child-2', 'data-order': '2' }, ['Child 2']),
        createElement('div', { 'data-testid': 'child-3', 'data-order': '3' }, ['Child 3'])
      ])
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // 检查初始顺序
    const columnRoot = container.querySelector('div[data-as="root"]');
    const children = Array.from(columnRoot?.children || []);
    expect(children.map(child => child.textContent)).toEqual(['Child 1', 'Child 2', 'Child 3']);
    
    // 更改 order 属性
    const child2 = container.querySelector('[data-testid="child-2"]') as HTMLElement;
    child2?.setAttribute('data-order', '0');
    
    // 手动触发 MutationObserver 回调
    if (columnRoot && mockMutationObserverCallbacks.has(columnRoot)) {
      const callback = mockMutationObserverCallbacks.get(columnRoot)!;
      const mockMutation: MutationRecord = {
        type: 'attributes',
        target: child2,
        attributeName: 'data-order',
        oldValue: '2',
        addedNodes: [] as any,
        removedNodes: [] as any,
        previousSibling: null,
        nextSibling: null,
        attributeNamespace: null
      } as MutationRecord;
      callback([mockMutation]);
    }
    
    await waitForDomUpdate();
    
    // 检查元素是否应用了 transform
    expect(child2.style.transform).not.toBe('');
    
    // 恢复 offsetHeight 属性
    if (originalOffsetHeightDescriptor) {
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeightDescriptor);
    }
  });
}); 