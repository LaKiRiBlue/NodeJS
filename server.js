const http = require('http');
const fs = require('fs');
const path = require('path');

// Helper function to read the content of a file
function readFileContent(filePath, res) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // If there is an error reading the file, respond with a 500 status code
      res.writeHead(500);
      res.end('Error reading file');
    } else {
      // Set the Content-Type header based on the file extension
      const ext = path.extname(filePath);
      const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
      }[ext] || 'text/plain';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

const server = http.createServer();

server.on('request', (req, res) => {
  // Use the readFileContent function to serve the HTML files
  switch (req.url) {
    case '/':
      // Serve the root index.html file
      const rootFilePath = path.join(__dirname, 'client', 'index.html');
      readFileContent(rootFilePath, res);
      break;
    case '/about':
      // Serve the about index.html file
      const aboutFilePath = path.join(__dirname, 'client', 'about', 'index.html');
      readFileContent(aboutFilePath, res);
      break;
    case '/blog':
      // Serve the blog index.html file
      const blogFilePath = path.join(__dirname, 'client', 'blog', 'index.html');
      readFileContent(blogFilePath, res);
      break;
    default:
      // If the requested URL path doesn't match any known paths, respond with a 404 status code
      res.writeHead(404);
      res.end('Not found');
      break;
  }
});

server.listen(3000, () => {
  console.log('Server started on http://127.0.0.1:3000');
});
