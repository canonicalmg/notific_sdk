const express = require('express');
const cors = require('cors');
const { processMessage } = require('./api.js');

const app = express();
const PORT = 3002;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Process messages endpoint
app.post('/v1/process', (req, res) => {
  console.log('Received message:', req.body.message);
  const result = processMessage(req.body);
  console.log('Sending response:', result);
  res.json(result);
});

// Simple feedback endpoint
app.post('/v1/feedback', (req, res) => {
  console.log('Received feedback:', req.body);
  res.json({ success: true });
});

// Get conversation history
app.get('/v1/conversation/:sessionId', (req, res) => {
  console.log('Getting conversation for session:', req.params.sessionId);
  res.json({ 
    messages: [
      {
        id: 'system-greeting',
        role: 'system',
        content: 'Welcome to our mock API service!',
        timestamp: Date.now() - 5000
      }
    ] 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`
====================================
🚀 Notific.ai Mock API Server 🚀
====================================

Server running at http://localhost:${PORT}

API Endpoints:
- POST /v1/process - Process user messages
- POST /v1/feedback - Submit feedback
- GET /v1/conversation/:sessionId - Get conversation history

This is a mock implementation for testing the SDK.
Check console for request/response logs.
  `);
});