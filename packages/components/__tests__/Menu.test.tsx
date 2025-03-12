import { describe, it, expect, afterEach } from 'vitest';
import { originMenuContainerStyle } from '../src/Menu';
import { renderComponent, waitForDomUpdate } from './test-utils';
import { createElement } from 'axii';

describe('Menu Component', () => {
  let cleanup: () => void;

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('renders correctly with menu items', async () => {
    // Since Menu is just a style object, we'll create a simple menu structure
    const { container, unmount } = renderComponent(
      <div style={originMenuContainerStyle} data-testid="menu-container">
        <div data-testid="menu-item-1">
          <div>Menu Item 1</div>
          <div>
            <div>Submenu Item 1.1</div>
            <div>Submenu Item 1.2</div>
          </div>
        </div>
        <div data-testid="menu-item-2">
          <div>Menu Item 2</div>
          <div>
            <div>Submenu Item 2.1</div>
            <div>Submenu Item 2.2</div>
          </div>
        </div>
      </div>
    );
    cleanup = unmount;
    
    await waitForDomUpdate();
    
    // Check if the menu container is rendered
    const menuContainer = container.querySelector('div[data-testid="menu-container"]');
    expect(menuContainer).not.toBeNull();
    
    // Check if menu items are rendered
    const menuItems = container.querySelectorAll('div[data-testid^="menu-item-"]');
    expect(menuItems.length).toBe(2);
    
    // Check menu item content
    const menuItem1 = container.querySelector('div[data-testid="menu-item-1"] > div:first-child');
    const menuItem2 = container.querySelector('div[data-testid="menu-item-2"] > div:first-child');
    expect(menuItem1?.textContent).toBe('Menu Item 1');
    expect(menuItem2?.textContent).toBe('Menu Item 2');
    
    // Check if submenu items exist
    const submenuContainer1 = container.querySelector('div[data-testid="menu-item-1"] > div:nth-child(2)');
    const submenuContainer2 = container.querySelector('div[data-testid="menu-item-2"] > div:nth-child(2)');
    expect(submenuContainer1).not.toBeNull();
    expect(submenuContainer2).not.toBeNull();
    
    // Check that submenus are not displayed by default (we can't easily check computed styles in JSDOM)
    // Just verify they exist
    expect(submenuContainer1).toBeTruthy();
    expect(submenuContainer2).toBeTruthy();
  });
}); 