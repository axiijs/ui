import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { Avatar } from '../src/Avatar';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Avatar Component', () => {
  let cleanup: () => void;
  let originalImage: typeof global.Image;

  beforeEach(() => {
    // 保存原始的 Image 构造函数
    originalImage = global.Image;
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
    // 恢复原始的 Image 构造函数
    global.Image = originalImage;
  });

  it('renders with alt text when no src is provided', async () => {
    const alt = createTestAtom('User Name');
    
    const { container, unmount } = renderComponent(
      <Avatar alt={alt} />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const avatarRoot = container.querySelector('div[data-as="root"]');
    expect(avatarRoot).not.toBeNull();
    
    // Check if the alt div is rendered
    const altDiv = container.querySelector('div[data-as="alt"]');
    expect(altDiv).not.toBeNull();
    
    // Check if the alt text is rendered correctly (first 2 characters, uppercase)
    expect(altDiv?.textContent).toBe('US');
  });

  it('renders with default alt text when not provided', async () => {
    const { container, unmount } = renderComponent(
      <Avatar />
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the alt div is rendered
    const altDiv = container.querySelector('div[data-as="alt"]');
    expect(altDiv).not.toBeNull();
    
    // Check if the default alt text is rendered correctly (first 2 characters of "avatar", uppercase)
    expect(altDiv?.textContent).toBe('AV');
  });

  it('renders image when src is provided and image loads successfully', async () => {
    const src = createTestAtom('https://example.com/avatar.jpg');
    const alt = createTestAtom('User Name');
    
    // 模拟 Image 对象，使其在构造后立即触发 onload 事件
    global.Image = class {
      onload: () => void = () => {};
      onerror: () => void = () => {};
      src: string = '';
      
      constructor() {
        // 使用 setTimeout 确保 onload 在事件循环的下一个周期被调用
        setTimeout(() => {
          this.onload();
        }, 0);
      }
    } as any;
    
    const { container, unmount } = renderComponent(
      <Avatar src={src} alt={alt} />
    );
    cleanup = unmount;
    
    // 等待图像"加载"
    await new Promise(resolve => setTimeout(resolve, 10));
    await waitForDomUpdate();
    
    // 检查图像是否被渲染
    const image = container.querySelector('img[data-as="image"]');
    expect(image).not.toBeNull();
    expect((image as HTMLImageElement)?.src).toBe('https://example.com/avatar.jpg');
    expect((image as HTMLImageElement)?.alt).toBe('User Name');
  });
}); 