/**
 * Notific.ai API Mock Server
 * 
 * This is a simple mock implementation of the Notific.ai API for local testing.
 * To use this, you would typically need to run it with a server like Express.
 * 
 * Example usage with Express:
 * ```
 * const express = require('express');
 * const cors = require('cors');
 * const { processMessage } = require('./api.js');
 * 
 * const app = express();
 * app.use(cors());
 * app.use(express.json());
 * 
 * app.post('/v1/process', (req, res) => {
 *   const result = processMessage(req.body);
 *   res.json(result);
 * });
 * 
 * app.listen(3000, () => {
 *   console.log('Mock API server running on port 3000');
 * });
 * ```
 */

// Store active sessions
const sessions = new Map();

/**
 * Process an incoming message and action map
 */
function processMessage(request) {
  const { message, actionMap, sessionId: requestSessionId, pageContext } = request;
  
  // Use existing session ID or create a new one
  const sessionId = requestSessionId || generateSessionId();
  
  // Get or create session data
  let session = sessions.get(sessionId) || {
    messages: [],
    lastInteraction: Date.now()
  };
  
  // Add the new user message to the session
  session.messages.push({
    id: generateMessageId('user'),
    role: 'user',
    content: message,
    timestamp: Date.now()
  });
  
  // Update the session's last interaction time
  session.lastInteraction = Date.now();
  
  // Store/update the session
  sessions.set(sessionId, session);
  
  // Generate a response based on the message and action map
  const response = generateResponse(message, actionMap, sessionId);
  
  // Add the assistant message to the session
  if (response.response.message) {
    session.messages.push(response.response.message);
  }
  
  return response;
}

/**
 * Generate a response based on the message and action map
 */
function generateResponse(message, actionMap, sessionId) {
  const lowerMessage = message.toLowerCase();
  
  // Default response with no actions
  let responseContent = "I'm not sure how to help with that.";
  let actions = [];
  
  // Find actionable elements from the action map
  const fields = actionMap.elements.filter(el => el.type === 'field');
  const actionButtons = actionMap.elements.filter(el => el.type === 'action');
  
  // Check for specific message patterns
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    responseContent = "Hello! I'm your AI assistant. I can help you interact with this page. What would you like to do?";
  }
  else if (lowerMessage.includes('help')) {
    responseContent = "I can help you interact with this page. I can fill in forms, click buttons, and more.";
  }
  else if (lowerMessage.includes('fill') && lowerMessage.includes('form')) {
    responseContent = "I'll help you fill out the form.";
    
    // Create actions for each form field
    actions = fields.map(field => ({
      type: 'fill',
      elementId: field.id,
      value: getSampleValueForField(field.name)
    }));
  }
  else if (lowerMessage.includes('click') || lowerMessage.includes('submit')) {
    const buttonToClick = actionButtons.find(button => 
      button.name.toLowerCase().includes('submit') || 
      (button.label && button.label.toLowerCase().includes('submit'))
    );
    
    if (buttonToClick) {
      responseContent = "I'll submit the form for you.";
      actions.push({
        type: 'click',
        elementId: buttonToClick.id
      });
    } else if (actionButtons.length > 0) {
      responseContent = "I'll click this button for you.";
      actions.push({
        type: 'click',
        elementId: actionButtons[0].id
      });
    } else {
      responseContent = "I couldn't find a button to click.";
    }
  }
  else if (lowerMessage.includes('log in') || lowerMessage.includes('login')) {
    responseContent = "I'll help you log in.";
    
    // Find username field
    const usernameField = fields.find(field => 
      field.name.toLowerCase().includes('user') || 
      (field.label && field.label.toLowerCase().includes('user'))
    );
    
    // Find login button
    const loginButton = actionButtons.find(button => 
      button.name.toLowerCase().includes('login') || 
      (button.label && button.label.toLowerCase().includes('login'))
    );
    
    if (usernameField) {
      actions.push({
        type: 'fill',
        elementId: usernameField.id,
        value: 'demo_user'
      });
    }
    
    if (loginButton) {
      actions.push({
        type: 'click',
        elementId: loginButton.id
      });
    }
  }
  
  // Create the message object
  const responseMessage = {
    id: generateMessageId('assistant'),
    role: 'assistant',
    content: responseContent,
    timestamp: Date.now()
  };
  
  // Return the API response
  return {
    response: {
      actions,
      message: responseMessage
    },
    sessionId
  };
}

/**
 * Generate a sample value for a field based on its name
 */
function getSampleValueForField(fieldName) {
  const lowerName = fieldName.toLowerCase();
  
  if (lowerName.includes('name') && lowerName.includes('first')) {
    return 'John';
  } else if (lowerName.includes('name') && lowerName.includes('last')) {
    return 'Doe';
  } else if (lowerName.includes('email')) {
    return 'john.doe@example.com';
  } else if (lowerName.includes('phone')) {
    return '555-123-4567';
  } else if (lowerName.includes('address')) {
    return '123 Main St';
  } else if (lowerName.includes('city')) {
    return 'New York';
  } else if (lowerName.includes('state')) {
    return 'NY';
  } else if (lowerName.includes('zip') || lowerName.includes('postal')) {
    return '10001';
  } else if (lowerName.includes('country')) {
    return 'US';
  } else if (lowerName.includes('message') || lowerName.includes('comment')) {
    return 'This is a sample message.';
  } else if (lowerName.includes('user')) {
    return 'demo_user';
  } else if (lowerName.includes('password')) {
    return 'password123';
  } else {
    return `Sample value for ${fieldName}`;
  }
}

/**
 * Generate a unique session ID
 */
function generateSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a unique message ID
 */
function generateMessageId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Clean up old sessions (if this were a real server)
setInterval(() => {
  const now = Date.now();
  sessions.forEach((session, sessionId) => {
    // Remove sessions older than 30 minutes
    if (now - session.lastInteraction > 30 * 60 * 1000) {
      sessions.delete(sessionId);
    }
  });
}, 60 * 1000); // Run every minute

// Export the API functions
module.exports = {
  processMessage
};