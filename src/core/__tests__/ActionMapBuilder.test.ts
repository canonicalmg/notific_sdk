import { ActionMapBuilder } from '../ActionMapBuilder';

// Mock DOM elements and methods
class MockElement {
  attributes: Record<string, string> = {};
  id = '';
  tagName = 'DIV';
  className = '';
  parentElement: MockElement | null = null;
  textContent = '';
  children: MockElement[] = [];
  style: Record<string, string> = {};

  getAttribute(name: string): string | null {
    return this.attributes[name] || null;
  }

  hasAttribute(name: string): boolean {
    return name in this.attributes;
  }

  getBoundingClientRect(): DOMRect {
    return {
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({})
    };
  }
}

// Mock document methods
document.querySelectorAll = jest.fn();
document.querySelector = jest.fn();

describe('ActionMapBuilder', () => {
  let actionMapBuilder: ActionMapBuilder;
  
  beforeEach(() => {
    jest.resetAllMocks();
    actionMapBuilder = new ActionMapBuilder();
    
    // Mock window properties
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com/test',
      },
      writable: true
    });
    
    document.title = 'Test Page';
    
    // Setup for DOM observation
    global.MutationObserver = class {
      observe = jest.fn();
      disconnect = jest.fn();
    } as any;
  });
  
  test('should initialize with empty action map', () => {
    // Mock empty query results
    (document.querySelectorAll as jest.Mock).mockReturnValue([]);
    
    // Call init method
    actionMapBuilder.init();
    
    // Get the action map
    const actionMap = actionMapBuilder.getActionMap();
    
    // Verify structure and default values
    expect(actionMap).toEqual({
      url: 'https://example.com/test',
      title: 'Test Page',
      elements: [],
      timestamp: expect.any(Number)
    });
  });
  
  test('should process field elements correctly', () => {
    // Create mock field elements
    const inputElement = new MockElement();
    inputElement.tagName = 'INPUT';
    inputElement.id = 'test-input';
    inputElement.attributes['data-ai-field'] = 'username';
    inputElement.attributes['required'] = 'true';
    
    // Mock query results
    (document.querySelectorAll as jest.Mock).mockImplementation((selector: string) => {
      if (selector === '[data-ai-field]') {
        return [inputElement];
      }
      return [];
    });
    
    // Call init method
    actionMapBuilder.init();
    
    // Get the action map
    const actionMap = actionMapBuilder.getActionMap();
    
    // Verify field element was processed correctly
    expect(actionMap.elements.length).toBe(1);
    expect(actionMap.elements[0]).toEqual({
      id: 'test-input',
      type: 'field',
      name: 'username',
      value: undefined,
      position: expect.any(Object),
      elementType: 'input',
      label: undefined,
      options: undefined,
      required: true,
      disabled: false,
      path: expect.any(Array)
    });
  });
  
  test('should process action elements correctly', () => {
    // Create mock action elements
    const buttonElement = new MockElement();
    buttonElement.tagName = 'BUTTON';
    buttonElement.id = 'test-button';
    buttonElement.attributes['data-ai-action'] = 'submit';
    buttonElement.textContent = 'Submit Form';
    
    // Mock query results
    (document.querySelectorAll as jest.Mock).mockImplementation((selector: string) => {
      if (selector === '[data-ai-action]') {
        return [buttonElement];
      }
      return [];
    });
    
    // Call init method
    actionMapBuilder.init();
    
    // Get the action map
    const actionMap = actionMapBuilder.getActionMap();
    
    // Verify action element was processed correctly
    expect(actionMap.elements.length).toBe(1);
    expect(actionMap.elements[0]).toEqual({
      id: 'test-button',
      type: 'action',
      name: 'submit',
      position: expect.any(Object),
      elementType: 'button',
      label: 'Submit Form',
      disabled: false,
      path: expect.any(Array)
    });
  });
  
  test('should destroy itself and disconnect the observer', () => {
    // Setup the observer spy
    const disconnectSpy = jest.spyOn(MutationObserver.prototype, 'disconnect');
    
    // Initialize and then destroy
    actionMapBuilder.init();
    actionMapBuilder.destroy();
    
    // Verify the observer was disconnected
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});