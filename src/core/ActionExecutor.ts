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
   */
  public checkNavigationSteps(actionName: string): Action[] | null {
    console.log(`Checking navigation steps for action: ${actionName}`);
    
    // Check if the actionCatalog has an entry for this action
    if (this.actionMap.actionCatalog && this.actionMap.actionCatalog[actionName]) {
      const entry = this.actionMap.actionCatalog[actionName];
      console.log(`Found catalog entry with ${entry.navigationSteps.length} navigation steps`);
      
      // Convert the navigation steps to actions
      const navigationActions: Action[] = entry.navigationSteps.map(step => {
        console.log(`Processing navigation step: action=${step.action}, param=${step.param || 'none'}`);
        
        // Special case for switch_tab action since it's critical for navigation
        if (step.action === 'switch_tab' && step.param) {
          // Try to find any tab button with the matching param
          const tabButtons = document.querySelectorAll('[data-ai-action="switch_tab"]');
          let tabElement = null;
          
          console.log(`Found ${tabButtons.length} tab buttons to check for param ${step.param}`);
          
          // Try to find the tab with the matching param
          for (const btn of Array.from(tabButtons)) {
            const btnParam = btn.getAttribute('data-ai-action-param');
            if (btnParam === step.param) {
              tabElement = this.actionMap.elements.find(el => 
                el.name === 'switch_tab' && 
                el.accessParam === step.param
              );
              
              if (tabElement) {
                console.log(`Found matching tab element with ID ${tabElement.id}`);
                break;
              }
            }
          }
          
          // If we found a matching tab element
          if (tabElement) {
            return {
              type: 'click',
              elementId: tabElement.id
            };
          }
          
          // If we couldn't find a matching element in our action map
          // Generate a generic tab action ID that our fallback mechanism can handle
          console.log(`Could not find tab element in action map, using generic ID for tab ${step.param}`);
          const randomId = Math.random().toString(36).substring(2, 8);
          return {
            type: 'click',
            elementId: `notific-action-switch_tab-${randomId}`,
            // Store the param for the fallback mechanism
            options: { param: step.param }
          };
        }
        
        // Standard approach for other navigation steps
        const element = this.actionMap.elements.find(el => 
          el.name === step.action && 
          (!step.param || el.accessParam === step.param)
        );
        
        if (!element) {
          console.error(`Cannot find element for navigation step: ${step.action}`);
          return null;
        }
        
        console.log(`Found element ID ${element.id} for navigation step ${step.action}`);
        return {
          type: 'click',
          elementId: element.id
        };
      }).filter(Boolean) as Action[];
      
      console.log(`Generated ${navigationActions.length} navigation actions`);
      
      return navigationActions.length > 0 ? navigationActions : null;
    } else {
      console.log(`No catalog entry found for action: ${actionName}`);
    }
    
    return null;
  }

  /**
   * Execute a sequence of actions
   */
  public async executeActions(actions: Action[]): Promise<boolean> {
    try {
      // Process each action, possibly with navigation
      for (const action of actions) {
        // Check if this action is directly available
        const targetElement = this.findElementById(action.elementId);
        
        if (!targetElement) {
          // If not found directly, check if it's in our catalog
          const elementInfo = this.actionMap.elements.find(el => el.id === action.elementId);
          
          if (elementInfo && elementInfo.name) {
            const navigationActions = this.checkNavigationSteps(elementInfo.name);
            
            if (navigationActions) {
              console.log(`Element ${elementInfo.name} requires navigation steps`);
              
              // Execute the navigation actions first
              for (const navAction of navigationActions) {
                await this.executeAction(navAction);
                await this.delay(500); // Longer delay for navigation
              }
              
              // Then try to find the element again after navigation
              const newTargetElement = this.findElementById(action.elementId);
              
              if (!newTargetElement) {
                console.error(`Element still not found after navigation: ${action.elementId}`);
                continue;
              }
            }
          }
        }
        
        // Execute the action
        await this.executeAction(action);
        
        // Add a small delay between actions for visual feedback
        await this.delay(300);
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
    
    // Special handling for switch_tab when we have param information in options
    if (!element && action.elementId.includes('switch_tab') && action.options && action.options.param) {
      console.log(`Looking for tab button with param: ${action.options.param}`);
      const tabButtons = document.querySelectorAll('[data-ai-action="switch_tab"]');
      
      for (const btn of Array.from(tabButtons)) {
        const btnParam = btn.getAttribute('data-ai-action-param');
        if (btnParam === action.options.param) {
          console.log(`Found tab button for ${action.options.param} via options`);
          element = btn as HTMLElement;
          break;
        }
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
    
    // If not found and we have element info, try to use the DOM path
    if (!element && elementInfo && elementInfo.path && elementInfo.path.length > 0) {
      try {
        // Try to create a CSS selector from the path - ensure class names are properly escaped
        // Process each path segment to escape any special characters in class names
        const processedPath = elementInfo.path.map(segment => {
          // Parse the segment into tag, id, and classes
          const tagMatch = segment.match(/^([a-zA-Z0-9-]+)/);
          const idMatch = segment.match(/#([a-zA-Z0-9-]+)/);
          const classMatches = segment.match(/\.([a-zA-Z0-9_-][^\s.]*)/g);
          
          // Start with the tag
          let processed = tagMatch ? tagMatch[1] : '';
          
          // Add the ID if it exists
          if (idMatch) {
            processed += `#${idMatch[1]}`;
          }
          
          // Add properly escaped classes if they exist
          if (classMatches) {
            classMatches.forEach(classMatch => {
              // Remove the dot and escape special characters
              const className = classMatch.substring(1).replace(/([:\\.!@#$%^&*()+=])/g, '\\$1');
              processed += `.${className}`;
            });
          }
          
          return processed;
        });
        
        // Create the final selector
        const selector = processedPath.join(' > ');
        console.log('Using selector:', selector);
        const elements = document.querySelectorAll(selector);
        
        if (elements.length === 1) {
          element = elements[0] as HTMLElement;
        } else if (elements.length > 1) {
          // If multiple elements match, try to find the one with the matching data attribute
          for (const el of Array.from(elements)) {
            if (elementInfo.type === 'field' && el.getAttribute('data-ai-field') === elementInfo.name) {
              element = el as HTMLElement;
              break;
            } else if (elementInfo.type === 'action' && el.getAttribute('data-ai-action') === elementInfo.name) {
              element = el as HTMLElement;
              break;
            }
          }
        }
      } catch (error) {
        console.error('Error finding element by path:', error);
      }
    }

    // If still not found, try some fallbacks based on ID patterns
    if (!element) {
      // Check for notific-action- prefix to handle specific actions
      if (id.startsWith('notific-action-')) {
        // Extract the action name (everything after notific-action- and before any random suffix)
        const actionMatch = id.match(/notific-action-([^-]+)/);
        if (actionMatch && actionMatch[1]) {
          const baseAction = actionMatch[1];
          console.log(`Trying fallback for action: ${baseAction}`);
          
          // Special handling for switch_tab action since it's critical for navigation
          if (baseAction === 'switch_tab') {
            // Try to find the tab element by data-ai-action attribute
            const tabButtons = document.querySelectorAll('[data-ai-action="switch_tab"]');
            
            if (tabButtons.length > 0) {
              // If there's param information in the elementInfo, use it to find the right tab
              if (elementInfo && elementInfo.accessParam) {
                // Look for the tab with the matching param attribute
                for (const btn of Array.from(tabButtons)) {
                  if (btn.getAttribute('data-ai-action-param') === elementInfo.accessParam) {
                    element = btn as HTMLElement;
                    console.log(`Fallback: Found tab button for ${elementInfo.accessParam}`);
                    break;
                  }
                }
              }
              
              // If not found with accessParam, just use the first one
              if (!element) {
                element = tabButtons[0] as HTMLElement;
                console.log('Fallback: Found tab button (first one)');
              }
            }
          } 
          // For standard actions like clear_form, submit_form, etc.
          else {
            // Look for elements with the exact data-ai-action
            const actionElements = document.querySelectorAll(`[data-ai-action="${baseAction}"]`);
            if (actionElements.length > 0) {
              element = actionElements[0] as HTMLElement;
              console.log(`Fallback: Found ${baseAction} button by data-ai-action`);
            } 
            // Otherwise resort to the old clear/submit checks
            else if (baseAction.includes('clear')) {
              const clearButtons = document.querySelectorAll('[data-ai-action="clear_form"]');
              if (clearButtons.length > 0) {
                element = clearButtons[0] as HTMLElement;
                console.log('Fallback: Found clear button by data-ai-action');
              }
            } else {
              const submitButtons = document.querySelectorAll('[data-ai-action="submit_form"]');
              if (submitButtons.length > 0) {
                element = submitButtons[0] as HTMLElement;
                console.log('Fallback: Found submit button by data-ai-action');
              }
            }
          }
        }
      } 
      // For old dynamically generated action IDs from API
      else if (id.startsWith('action-')) {
        // Check if this looks like a clear action
        const isClearAction = id.includes('clear');
        
        if (isClearAction) {
          // Look for clear form button
          const clearButtons = document.querySelectorAll('[data-ai-action="clear_form"]');
          if (clearButtons.length > 0) {
            element = clearButtons[0] as HTMLElement;
            console.log('Fallback: Found clear button by data-ai-action');
          }
        } else {
          // Default to submit action
          const submitButtons = document.querySelectorAll('[data-ai-action="submit_form"]');
          if (submitButtons.length > 0) {
            element = submitButtons[0] as HTMLElement;
            console.log('Fallback: Found submit button by data-ai-action');
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