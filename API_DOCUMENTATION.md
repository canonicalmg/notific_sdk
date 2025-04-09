# Notific.ai API Documentation

This document outlines the API endpoints required for the Notific.ai SDK to function properly.

## Base URL

All API requests should be made to:

```
https://app.getsortio.com/api/interactive/
```

## Authentication

All requests require an API key, which should be passed in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### 1. Process Message

Process a user message and return appropriate actions and assistant responses.

- **URL**: `/process/`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "message": "String - The user's message",
  "actionMap": {
    "url": "String - Current page URL",
    "title": "String - Page title",
    "elements": [
      {
        "id": "String - Unique element ID",
        "type": "String - 'field' or 'action'",
        "name": "String - Element name from data-ai-* attribute",
        "value": "String - Current value (for fields)",
        "position": {
          "x": "Number - X position",
          "y": "Number - Y position"
        },
        "elementType": "String - HTML element type (input, button, etc.)",
        "label": "String - Associated label text",
        "options": ["Array of strings - For selects, dropdowns, etc."],
        "required": "Boolean - If the field is required",
        "disabled": "Boolean - If the element is disabled",
        "path": ["Array of strings - DOM path to the element"]
      }
    ],
    "timestamp": "Number - Unix timestamp in milliseconds"
  },
  "sessionId": "String - Optional session ID for conversation tracking",
  "pageContext": {
    "url": "String - Page URL",
    "title": "String - Page title",
    "path": "String - URL path",
    "referrer": "String - Referrer URL",
    "userAgent": "String - Browser user agent",
    "screenWidth": "Number - Screen width",
    "screenHeight": "Number - Screen height",
    "viewportWidth": "Number - Viewport width",
    "viewportHeight": "Number - Viewport height",
    "timestamp": "Number - Unix timestamp in milliseconds"
  }
}
```

#### Response

```json
{
  "response": {
    "actions": [
      {
        "type": "String - Action type (fill, click, select, scroll, custom)",
        "elementId": "String - Target element ID",
        "value": "String - Optional value for fill/select actions",
        "options": "Object - Optional additional parameters for custom actions"
      }
    ],
    "message": {
      "id": "String - Unique message ID",
      "role": "String - 'assistant'",
      "content": "String - Assistant's response text",
      "timestamp": "Number - Unix timestamp in milliseconds"
    }
  },
  "sessionId": "String - Session ID for tracking the conversation"
}
```

#### Action Types

1. `fill` - Fill a form field with a value
   - Required: `elementId`, `value`
   
2. `click` - Click on an element
   - Required: `elementId`
   
3. `select` - Select an option from a dropdown
   - Required: `elementId`, `value`
   
4. `scroll` - Scroll to an element
   - Required: `elementId`
   
5. `custom` - Perform a custom action
   - Required: `elementId`, `options`

### 2. Submit Feedback

Submit feedback about an interaction.

- **URL**: `/feedback/`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "sessionId": "String - Session ID",
  "messageId": "String - Message ID receiving feedback",
  "feedback": "String - Either 'positive' or 'negative'",
  "comment": "String - Optional comment about the feedback"
}
```

#### Response

```json
{
  "success": "Boolean - Indicates if feedback was successfully recorded"
}
```

### 3. Get Conversation History

Retrieve the conversation history for a specific session.

- **URL**: `/conversation/{sessionId}/`
- **Method**: `GET`

#### Response

```json
{
  "messages": [
    {
      "id": "String - Unique message ID",
      "role": "String - 'user' or 'assistant' or 'system'",
      "content": "String - Message content",
      "timestamp": "Number - Unix timestamp in milliseconds"
    }
  ]
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "String - Error code",
    "message": "String - Human-readable error message"
  }
}
```

### Common Error Codes

- `400` - Bad Request - Invalid input parameters
- `401` - Unauthorized - Missing or invalid API key
- `404` - Not Found - Resource not found
- `429` - Too Many Requests - Rate limit exceeded
- `500` - Internal Server Error - Server-side error

## Examples

### Example: Process a message to fill a login form

#### Request

```json
{
  "message": "I want to log in",
  "actionMap": {
    "url": "https://example.com/login",
    "title": "Login Page",
    "elements": [
      {
        "id": "username-field",
        "type": "field",
        "name": "username",
        "value": "",
        "position": { "x": 100, "y": 200 },
        "elementType": "input",
        "label": "Username",
        "required": true,
        "disabled": false,
        "path": ["html", "body", "div#login-form", "input#username-field"]
      },
      {
        "id": "password-field",
        "type": "field",
        "name": "password",
        "value": "",
        "position": { "x": 100, "y": 250 },
        "elementType": "input",
        "label": "Password",
        "required": true,
        "disabled": false,
        "path": ["html", "body", "div#login-form", "input#password-field"]
      },
      {
        "id": "login-button",
        "type": "action",
        "name": "login",
        "position": { "x": 100, "y": 300 },
        "elementType": "button",
        "label": "Log In",
        "disabled": false,
        "path": ["html", "body", "div#login-form", "button#login-button"]
      }
    ],
    "timestamp": 1712694000000
  },
  "pageContext": {
    "url": "https://example.com/login",
    "title": "Login Page",
    "path": "/login",
    "referrer": "https://example.com/",
    "userAgent": "Mozilla/5.0...",
    "screenWidth": 1920,
    "screenHeight": 1080,
    "viewportWidth": 1200,
    "viewportHeight": 800,
    "timestamp": 1712694000000
  }
}
```

#### Response

```json
{
  "response": {
    "actions": [
      {
        "type": "fill",
        "elementId": "username-field",
        "value": "demo_user"
      },
      {
        "type": "fill",
        "elementId": "password-field",
        "value": "********"
      },
      {
        "type": "click",
        "elementId": "login-button"
      }
    ],
    "message": {
      "id": "msg-123",
      "role": "assistant",
      "content": "I'll help you log in. I've filled in your username and password and clicked the login button.",
      "timestamp": 1712694200000
    }
  },
  "sessionId": "session-abc123"
}
```

## Implementation Notes

1. The SDK builds an "action map" of all elements on the page with `data-ai-field` and `data-ai-action` attributes.

2. The backend should analyze the user's message, determine intent, and return appropriate actions based on the available elements.

3. When returning actions, make sure to include any necessary context in the message response for a natural conversation flow.

4. Session IDs should be persisted to maintain conversation history and context.

5. Rate limiting should be implemented to prevent abuse.

6. The API should respond within 1-2 seconds for a good user experience.