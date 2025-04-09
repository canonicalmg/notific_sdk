#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const ROOT_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);
  
  // Normalize URL by removing query string and hash
  let url = req.url.split('?')[0].split('#')[0];
  
  // Handle root path
  if (url === '/') {
    url = '/examples/index.html';
  }
  
  // Construct file path
  const filePath = path.join(ROOT_DIR, url);
  
  // If the URL doesn't point to a file, try to find an index.html in the directory
  if (!path.extname(filePath)) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      serveFile(indexPath, res);
      return;
    }
  }
  
  serveFile(filePath, res);
});

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('404 - File Not Found');
        console.log(`404: ${filePath}`);
      } else {
        // Server error
        res.writeHead(500);
        res.end('500 - Server Error');
        console.error(`Error serving ${filePath}:`, err);
      }
      return;
    }
    
    // Determine content type based on file extension
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Serve file
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
    console.log(`200: ${filePath} (${contentType})`);
  });
}

server.listen(PORT, () => {
  console.log(`
===================================
🚀 Notific.ai SDK Test Server 🚀
===================================

Server running at http://localhost:${PORT}/
  
Example pages:
- Example App: http://localhost:${PORT}/examples/example-app/
- Basic Usage: http://localhost:${PORT}/examples/basic-usage.html
- CDN Example: http://localhost:${PORT}/examples/cdn/
- NPM Example: http://localhost:${PORT}/examples/npm/

Press Ctrl+C to stop the server
`);
});