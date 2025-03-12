import { createRoot, atom } from 'axii';

// Custom render function for Axii components
export function renderComponent(component: any) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  // Debug: Log the component
  console.log('Rendering component:', component);
  
  try {
    const root = createRoot(container);
    root.render(component);
    
    // Debug: Log the container HTML
    console.log('Container HTML after render:', container.innerHTML);
    
    return {
      container,
      unmount: () => {
        // Manually remove the component from the DOM
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }
    };
  } catch (error) {
    console.error('Error rendering component:', error);
    throw error;
  }
}

// Helper to create reactive atoms for testing
export function createTestAtom<T>(initialValue: T) {
  return atom(initialValue);
}

// Helper to wait for DOM updates
export function waitForDomUpdate() {
  return new Promise(resolve => setTimeout(resolve, 10));
} 