import { describe, it, expect, afterEach } from 'vitest';
import { Carousel } from '../src/Carousel';
import { renderComponent, createTestAtom, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Carousel Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with initial value state', async () => {
    const value = createTestAtom(false);
    
    const { container, unmount } = renderComponent(
      createElement(Carousel, { value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const carouselRoot = container.querySelector('div[data-as="root"]');
    expect(carouselRoot).not.toBeNull();
    
    // Check if the main element is rendered
    const carouselMain = container.querySelector('div[data-as="main"]');
    expect(carouselMain).not.toBeNull();
    
    // Check initial styles based on value=false
    const rootStyle = window.getComputedStyle(carouselRoot as Element);
    // Use regex to match the background color, allowing for different formats of the same color
    expect(rootStyle.background).toMatch(/rgba\(42,\s*44,\s*51,\s*0?\.7\)/);
    
    const mainStyle = window.getComputedStyle(carouselMain as Element);
    expect(mainStyle.background).toBe('transparent');
  });

  it('renders correctly when value is true', async () => {
    const value = createTestAtom(true);
    
    const { container, unmount } = renderComponent(
      createElement(Carousel, { value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the root element is rendered
    const carouselRoot = container.querySelector('div[data-as="root"]');
    expect(carouselRoot).not.toBeNull();
    
    // Check if the main element is rendered
    const carouselMain = container.querySelector('div[data-as="main"]');
    expect(carouselMain).not.toBeNull();
    
    // Check styles based on value=true
    const rootStyle = window.getComputedStyle(carouselRoot as Element);
    expect(rootStyle.background).toBe('#253FFD');
    
    const mainStyle = window.getComputedStyle(carouselMain as Element);
    expect(mainStyle.background).toBe('#fff');
  });

  it('toggles value when clicked', async () => {
    const value = createTestAtom(false);
    
    const { container, unmount } = renderComponent(
      createElement(Carousel, { value })
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check initial state
    expect(value()).toBe(false);
    
    // Click on the carousel
    const carouselRoot = container.querySelector('div[data-as="root"]');
    expect(carouselRoot).not.toBeNull();
    
    if (carouselRoot) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true
      });
      carouselRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if value was toggled
    expect(value()).toBe(true);
    
    // Click again to toggle back
    if (carouselRoot) {
      const clickEvent = new MouseEvent('click', { 
        bubbles: true,
        cancelable: true
      });
      carouselRoot.dispatchEvent(clickEvent);
    }
    
    await waitForDomUpdate();
    
    // Check if value was toggled back
    expect(value()).toBe(false);
  });
}); 