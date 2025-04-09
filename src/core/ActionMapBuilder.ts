import { ActionMap, ActionableElement } from '../types';

export class ActionMapBuilder {
  private observer: MutationObserver | null = null;
  private actionMap: ActionMap;

  constructor() {
    this.actionMap = this.createEmptyActionMap();
  }

  /**
   * Initialize the action map builder and start observing DOM changes
   */
  public init(): void {
    this.buildActionMap();
    this.observeDOM();
  }

  /**
   * Destroy the action map builder and stop observing DOM changes
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Get the current action map
   */
  public getActionMap(): ActionMap {
    // Update timestamp before returning
    this.actionMap.timestamp = Date.now();
    return this.actionMap;
  }

  /**
   * Create an empty action map structure
   */
  private createEmptyActionMap(): ActionMap {
    return {
      url: window.location.href,
      title: document.title,
      elements: [],
      timestamp: Date.now()
    };
  }

  /**
   * Build the action map by scanning the DOM for actionable elements
   */
  private buildActionMap(): void {
    // Reset the elements array
    this.actionMap = this.createEmptyActionMap();
    
    // Find all elements with data-ai-field or data-ai-action attributes
    const fieldElements = document.querySelectorAll('[data-ai-field]');
    const actionElements = document.querySelectorAll('[data-ai-action]');
    
    // Process field elements
    fieldElements.forEach(element => {
      const actionableElement = this.processFieldElement(element as HTMLElement);
      if (actionableElement) {
        this.actionMap.elements.push(actionableElement);
      }
    });
    
    // Process action elements
    actionElements.forEach(element => {
      const actionableElement = this.processActionElement(element as HTMLElement);
      if (actionableElement) {
        this.actionMap.elements.push(actionableElement);
      }
    });
  }

  /**
   * Process a field element and convert it to an ActionableElement
   */
  private processFieldElement(element: HTMLElement): ActionableElement | null {
    const fieldName = element.getAttribute('data-ai-field');
    if (!fieldName) return null;
    
    const rect = element.getBoundingClientRect();
    const elementType = element.tagName.toLowerCase();
    
    let value: string | undefined;
    let options: string[] | undefined;
    
    // Handle different field types
    if (elementType === 'input' || elementType === 'textarea') {
      value = (element as HTMLInputElement).value;
    } else if (elementType === 'select') {
      const selectElement = element as HTMLSelectElement;
      value = selectElement.value;
      options = Array.from(selectElement.options).map(option => option.text);
    }
    
    // Try to find a label for this field
    const label = this.findLabelForElement(element);
    
    // Calculate DOM path
    const path = this.getDomPath(element);
    
    return {
      id: this.generateElementId(element),
      type: 'field',
      name: fieldName,
      value,
      position: {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
      },
      elementType,
      label,
      options,
      required: element.hasAttribute('required'),
      disabled: element.hasAttribute('disabled'),
      path
    };
  }

  /**
   * Process an action element and convert it to an ActionableElement
   */
  private processActionElement(element: HTMLElement): ActionableElement | null {
    const actionName = element.getAttribute('data-ai-action');
    if (!actionName) return null;
    
    const rect = element.getBoundingClientRect();
    const elementType = element.tagName.toLowerCase();
    
    // Try to find a label for this action
    let label = element.textContent?.trim() || undefined;
    if (!label || label === '') {
      const ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel) {
        label = ariaLabel;
      }
    }
    
    // Calculate DOM path
    const path = this.getDomPath(element);
    
    return {
      id: this.generateElementId(element),
      type: 'action',
      name: actionName,
      position: {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
      },
      elementType,
      label,
      disabled: element.hasAttribute('disabled'),
      path
    };
  }

  /**
   * Find a label element associated with an input element
   */
  private findLabelForElement(element: HTMLElement): string | undefined {
    // Check for id->for relationship
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`);
      if (label && label.textContent) {
        return label.textContent.trim();
      }
    }
    
    // Check for parent label
    let parent = element.parentElement;
    while (parent) {
      if (parent.tagName.toLowerCase() === 'label' && parent.textContent) {
        return parent.textContent.trim();
      }
      parent = parent.parentElement;
    }
    
    // Check for aria-label
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) {
      return ariaLabel;
    }
    
    // Check for placeholder
    const placeholder = element.getAttribute('placeholder');
    if (placeholder) {
      return placeholder;
    }
    
    return undefined;
  }

  /**
   * Generate a unique ID for an element
   */
  private generateElementId(element: HTMLElement): string {
    // Use existing ID if available
    if (element.id) {
      return element.id;
    }
    
    // Generate a new ID based on element properties
    const type = element.getAttribute('data-ai-field') 
      ? 'field' 
      : element.getAttribute('data-ai-action') 
        ? 'action' 
        : 'element';
    
    const name = element.getAttribute('data-ai-field') || 
                 element.getAttribute('data-ai-action') || 
                 element.tagName.toLowerCase();
    
    const randomPart = Math.random().toString(36).substring(2, 8);
    
    return `notific-${type}-${name}-${randomPart}`;
  }

  /**
   * Get the DOM path for an element
   */
  private getDomPath(element: HTMLElement): string[] {
    const path: string[] = [];
    let currentElement: HTMLElement | null = element;
    
    while (currentElement) {
      let selector = currentElement.tagName.toLowerCase();
      
      if (currentElement.id) {
        selector += `#${currentElement.id}`;
      } else if (currentElement.className && typeof currentElement.className === 'string') {
        const classes = currentElement.className.split(/\s+/).filter(Boolean);
        if (classes.length) {
          selector += `.${classes.join('.')}`;
        }
      }
      
      path.unshift(selector);
      currentElement = currentElement.parentElement;
    }
    
    return path;
  }

  /**
   * Observe DOM mutations to keep the action map updated
   */
  private observeDOM(): void {
    this.observer = new MutationObserver(mutations => {
      let shouldRebuildMap = false;
      
      for (const mutation of mutations) {
        // Check if the mutation involves actionable elements
        if (mutation.type === 'childList') {
          for (const node of Array.from(mutation.addedNodes)) {
            if (node instanceof HTMLElement) {
              if (
                node.hasAttribute('data-ai-field') || 
                node.hasAttribute('data-ai-action') ||
                node.querySelector('[data-ai-field], [data-ai-action]')
              ) {
                shouldRebuildMap = true;
                break;
              }
            }
          }
          
          for (const node of Array.from(mutation.removedNodes)) {
            if (node instanceof HTMLElement) {
              if (
                node.hasAttribute('data-ai-field') || 
                node.hasAttribute('data-ai-action') ||
                node.querySelector('[data-ai-field], [data-ai-action]')
              ) {
                shouldRebuildMap = true;
                break;
              }
            }
          }
        } else if (mutation.type === 'attributes') {
          const target = mutation.target as HTMLElement;
          if (
            mutation.attributeName === 'data-ai-field' || 
            mutation.attributeName === 'data-ai-action' ||
            (target.hasAttribute('data-ai-field') || target.hasAttribute('data-ai-action'))
          ) {
            shouldRebuildMap = true;
            break;
          }
        }
        
        if (shouldRebuildMap) {
          break;
        }
      }
      
      if (shouldRebuildMap) {
        this.buildActionMap();
      }
    });
    
    // Start observing the entire document for changes
    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-ai-field', 'data-ai-action', 'value', 'disabled']
    });
  }
}