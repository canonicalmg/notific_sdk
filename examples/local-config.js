/**
 * Local development configuration for Notific.ai SDK
 * 
 * This file provides a configuration object for local development.
 * It points the SDK to a local Django development server running at localhost:8000.
 */

// Configuration for local development 
const notificLocalConfig = {
  apiKey: 'dev-api-key', // Replace with your actual development API key if needed
  endpoint: 'http://localhost:8000/api/interactive/',
  debug: true, // Enable debug mode for detailed logging
  chatWidget: {
    enable: true,
    position: 'right', // 'left' or 'right'
    greeting: 'Hello! I\'m your interactive assistant running on localhost:8000. How can I help you today?'
  }
};

// Simple helper function to patch the ActionExecutor
// Track retry count to limit spam
let patchRetryCount = 0;
const MAX_RETRIES = 5;

function patchActionExecutor() {
  if (patchRetryCount === 0) {
    console.log('Attempting to patch ActionExecutor to handle dynamic IDs...');
  }
  
  // Increment retry count
  patchRetryCount++;
  
  // Function to patch a specific instance
  function patchInstance(instance) {
    if (instance && instance.actionExecutor) {
      const executor = instance.actionExecutor;
      // Save the original method
      const originalFind = executor.findElementById;
      
      // Patch the method if it exists
      if (typeof originalFind === 'function') {
        executor.findElementById = function(id) {
          // First try the original method
          try {
            const result = originalFind.call(this, id);
            if (result) return result;
          } catch (e) {
            console.error('Error in original findElementById:', e);
          }
          
          // Fallback for action-* IDs
          if (id && id.startsWith && id.startsWith('action-')) {
            console.log('Trying to find element by fallback logic for:', id);
            
            // Try to find form submit button (most common action)
            const submitButton = document.querySelector('[data-ai-action="submit_form"]');
            if (submitButton) {
              console.log('Found submit button as fallback for action');
              return submitButton;
            }
            
            // Try to find any button with data-ai-action
            const actionButtons = document.querySelectorAll('[data-ai-action]');
            if (actionButtons.length > 0) {
              console.log('Found alternative action button');
              return actionButtons[0];
            }
          }
          
          return null;
        };
        
        console.log('Successfully patched findElementById method');
        return true;
      }
    }
    return false;
  }
  
  // Try different ways to find the instance
  let patched = false;
  
  // Option 1: Check for static _instance property
  if (typeof NotificAI !== 'undefined') {
    if (NotificAI._instance) {
      console.log('Found NotificAI._instance');
      patched = patchInstance(NotificAI._instance);
    } 
    // Option 2: If NotificAI is the instance itself
    else if (NotificAI.actionExecutor) {
      console.log('NotificAI appears to be the instance itself');
      patched = patchInstance(NotificAI);
    }
    // Option 3: Try window.notificInstance set in the page
    else if (window.notificInstance) {
      console.log('Using window.notificInstance');
      patched = patchInstance(window.notificInstance);
    }
  }
  
  if (!patched) {
    // Only log and retry if we haven't exceeded maximum retries
    if (patchRetryCount < MAX_RETRIES) {
      console.log(`Could not find ActionExecutor to patch. Retry ${patchRetryCount}/${MAX_RETRIES}`);
      
      // Set up a retry after a delay
      setTimeout(patchActionExecutor, 2000);
    } else if (patchRetryCount === MAX_RETRIES) {
      console.log('Max retries reached. Giving up on ActionExecutor patching.');
    }
  }
}

// For browsers
if (typeof window !== 'undefined') {
  window.notificLocalConfig = notificLocalConfig;
  
  // Expose a simple test function
  window.testAction = function(actionType) {
    if (actionType === 'submit') {
      const button = document.querySelector('[data-ai-action="submit_form"]');
      if (button) {
        console.log('Manually clicking submit button');
        button.click();
        return true;
      }
    } else if (actionType === 'clear') {
      // Try clicking the clear button
      const button = document.querySelector('[data-ai-action="clear_form"]');
      if (button) {
        console.log('Manually clicking clear button');
        button.click();
        return true;
      } else {
        // If button not found, try resetting the form directly
        const form = document.getElementById('testForm');
        if (form) {
          console.log('Resetting form directly');
          form.reset();
          return true;
        }
      }
    }
    return false;
  };
  
  // Add direct form reset function for debugging
  window.clearForm = function() {
    const form = document.getElementById('testForm');
    if (form) {
      console.log('Resetting form directly via clearForm()');
      form.reset();
      return true;
    }
    return false;
  };
  
  // Setup patching after SDK initialization
  window.patchActionExecutor = patchActionExecutor;
}

// For CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = notificLocalConfig;
}