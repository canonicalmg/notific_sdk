import { Action, ActionableElement, ActionMap, NavigationStep, ActionCatalogEntry, ActionCatalog } from '../types';

export class ActionExecutor {
  private actionMap: ActionMap;
  private elementCache: Map<string, HTMLElement> = new Map();

  constructor(actionMap: ActionMap) {
    this.actionMap = actionMap;
  }

  /**
   * Update the action map
   */
  public updateActionMap(actionMap: ActionMap): void {
    this.actionMap = actionMap;
    // Clear the element cache when the action map is updated
    this.elementCache.clear();
  }

  /**
   * Check if an action requires navigation steps before execution
   * In simplified MVP, we don't use navigation steps
   */
  public checkNavigationSteps(actionName: string): Action[] | null {
    console.log(`Simplified MVP: skipping navigation steps for action: ${actionName}`);
    return null;
  }

  /**
   * Execute a sequence of actions
   * Simplified for MVP to directly execute actions without navigation steps
   */
  public async executeActions(actions: Action[]): Promise<boolean> {
    try {
      console.log(`Executing ${actions.length} action(s):`);
      
      // Process each action
      for (const action of actions) {
        console.log(`Processing action: ${action.type} on element ${action.elementId}`);
        
        try {
          // Execute the action
          await this.executeAction(action);
          
          // Add a small delay between actions for visual feedback
          await this.delay(300);
        } catch (actionError) {
          console.error(`Error executing action ${action.elementId}:`, actionError);
          // Continue with next action even if this one failed
        }
      }
      return true;
    } catch (error) {
      console.error('Error executing actions:', error);
      return false;
    }
  }

  /**
   * Execute a single action
   */
  private async executeAction(action: Action): Promise<void> {
    let element = this.findElementById(action.elementId);
    
    // If the element is not found by ID, try to find by action name
    if (!element && action.elementId.includes('notific-action-')) {
      // Extract the action name from the ID
      const actionName = action.elementId.replace('notific-action-', '');
      console.log(`Element not found by ID, trying to find by action name: ${actionName}`);
      
      // Try to find element by data-ai-action attribute
      const actionElements = document.querySelectorAll(`[data-ai-action="${actionName}"]`);
      if (actionElements.length > 0) {
        element = actionElements[0] as HTMLElement;
        console.log(`Found element by data-ai-action: ${actionName}`);
      }
    }
    
    if (!element) {
      throw new Error(`Element with ID ${action.elementId} not found`);
    }

    // Add a visual highlight effect to the element
    this.highlightElement(element);

    switch (action.type) {
      case 'fill':
        await this.fillField(element, action.value || '');
        break;
      case 'click':
        await this.clickElement(element);
        break;
      case 'select':
        await this.selectOption(element, action.value || '');
        break;
      case 'scroll':
        await this.scrollToElement(element);
        break;
      case 'custom':
        // Handle custom actions based on options
        await this.executeCustomAction(element, action.options);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  /**
   * Find an element in the DOM by its ID
   * Simplified for MVP to use direct ID lookup and data-ai-* attributes
   */
  private findElementById(id: string): HTMLElement | null {
    // First check the cache
    if (this.elementCache.has(id)) {
      return this.elementCache.get(id) || null;
    }

    // Find the element description in the action map
    const elementInfo = this.actionMap.elements.find(el => el.id === id);
    
    // Try to find the element directly by ID
    let element = document.getElementById(id);
    
    // If element not found and it's an action, try using data-ai-action attribute
    if (!element && id.startsWith('notific-action-')) {
      const actionName = id.replace('notific-action-', '').split('-')[0]; // Get the base action name
      const actionElements = document.querySelectorAll(`[data-ai-action="${actionName}"]`);
      
      if (actionElements.length > 0) {
        element = actionElements[0] as HTMLElement;
        console.log(`Found element by data-ai-action: ${actionName}`);
      }
    }
    
    // If element not found and it's a field, try using data-ai-field attribute
    if (!element && id.startsWith('notific-field-')) {
      // Handle IDs with random suffixes like notific-field-supportTeamMembers-70mstn
      let fieldName = '';
      const parts = id.split('-');
      
      if (parts.length >= 3) {
        if (parts.length > 3) {
          // For IDs with random suffixes, extract the actual field name
          // If it has multiple parts like supportTeamMembers-value, join them
          if (parts.length > 4) {
            fieldName = parts.slice(2, -1).join('-');
          } else {
            fieldName = parts[2]; // Simple case like notific-field-supportTeamMembers-abc123
          }
        } else {
          fieldName = parts[2]; // Simple case like notific-field-supportTeamMembers
        }
      }
      
      console.log(`Trying to find field by data-ai-field: ${fieldName}`);
      
      // Try to find the element by the extracted field name
      const fieldElements = document.querySelectorAll(`[data-ai-field="${fieldName}"]`);
      
      if (fieldElements.length > 0) {
        element = fieldElements[0] as HTMLElement;
        console.log(`Found element by data-ai-field: ${fieldName}`);
      } else if (fieldName.includes('-')) {
        // If the field name has hyphens and we didn't find it, try with just the first part
        const simplifiedFieldName = fieldName.split('-')[0];
        const simplifiedElements = document.querySelectorAll(`[data-ai-field="${simplifiedFieldName}"]`);
        
        if (simplifiedElements.length > 0) {
          element = simplifiedElements[0] as HTMLElement;
          console.log(`Found element by simplified data-ai-field: ${simplifiedFieldName}`);
        } else {
          // Last resort - try finding by partial match
          const allFields = document.querySelectorAll('[data-ai-field]');
          for (const el of Array.from(allFields)) {
            const currentField = el.getAttribute('data-ai-field');
            if (currentField && (fieldName.startsWith(currentField) || currentField.startsWith(fieldName))) {
              element = el as HTMLElement;
              console.log(`Found element by partial field match: ${currentField}`);
              break;
            }
          }
        }
      }
    }
    
    // Cache the element for future use
    if (element) {
      this.elementCache.set(id, element);
    }
    
    return element;
  }

  /**
   * Add a visual highlight effect to an element
   */
  private highlightElement(element: HTMLElement): void {
    const originalOutline = element.style.outline;
    const originalTransition = element.style.transition;
    
    element.style.outline = '2px solid #0088ff';
    element.style.transition = 'outline 0.2s ease-in-out';
    
    setTimeout(() => {
      element.style.outline = originalOutline;
      element.style.transition = originalTransition;
    }, 1000);
  }

  /**
   * Fill an input field with the given value
   */
  private async fillField(element: HTMLElement, value: string): Promise<void> {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      // Clear the current value
      element.value = '';
      
      // Focus the element
      element.focus();
      
      // Simulate typing character by character for visual effect
      for (let i = 0; i < value.length; i++) {
        const char = value.charAt(i);
        element.value += char;
        
        // Dispatch input event
        const inputEvent = new Event('input', { bubbles: true });
        element.dispatchEvent(inputEvent);
        
        // Add a small delay between characters to simulate typing
        await this.delay(50);
      }
      
      // Dispatch change event
      const changeEvent = new Event('change', { bubbles: true });
      element.dispatchEvent(changeEvent);
      
      // Blur the element
      element.blur();
    } else {
      throw new Error('Element is not an input field');
    }
  }

  /**
   * Click an element
   */
  private async clickElement(element: HTMLElement): Promise<void> {
    // Scroll into view if needed
    await this.scrollToElement(element);
    
    // Simulate a mousedown event
    const mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(mousedownEvent);
    
    // Small delay between events
    await this.delay(50);
    
    // Simulate a mouseup event
    const mouseupEvent = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(mouseupEvent);
    
    // Simulate a click event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(clickEvent);
  }

  /**
   * Select an option in a dropdown
   */
  private async selectOption(element: HTMLElement, value: string): Promise<void> {
    if (element instanceof HTMLSelectElement) {
      // Try to find the option with the given value or text
      let optionFound = false;
      
      for (const option of Array.from(element.options)) {
        if (option.value === value || option.text === value) {
          element.value = option.value;
          optionFound = true;
          break;
        }
      }
      
      if (!optionFound) {
        throw new Error(`Option with value or text "${value}" not found in select element`);
      }
      
      // Dispatch change event
      const changeEvent = new Event('change', { bubbles: true });
      element.dispatchEvent(changeEvent);
    } else {
      throw new Error('Element is not a select element');
    }
  }

  /**
   * Scroll to make an element visible
   */
  private async scrollToElement(element: HTMLElement): Promise<void> {
    const rect = element.getBoundingClientRect();
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    if (!isInViewport) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      // Wait for the scroll to complete
      await this.delay(500);
    }
  }

  /**
   * Execute a custom action
   */
  private async executeCustomAction(element: HTMLElement, options: any): Promise<void> {
    // Handle custom actions based on the options provided
    if (options && options.type) {
      switch (options.type) {
        case 'hover':
          const hoverEvent = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          element.dispatchEvent(hoverEvent);
          break;
        
        case 'focus':
          element.focus();
          break;
        
        case 'blur':
          element.blur();
          break;
        
        case 'setValue':
          if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            element.value = options.value || '';
            const inputEvent = new Event('input', { bubbles: true });
            element.dispatchEvent(inputEvent);
            const changeEvent = new Event('change', { bubbles: true });
            element.dispatchEvent(changeEvent);
          }
          break;
        
        default:
          throw new Error(`Unknown custom action type: ${options.type}`);
      }
    }
  }

  /**
   * Create a promise that resolves after a delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}