const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  
  let response;
  if (req.url === '/home') {
    response = '<p>Welcome home</p>';
  } else if (req.url === '/about') {
    response = '<p>Welcome to About Us</p>';
  } else if (req.url === '/node') {
    response = '<p>Welcome to my Node Js project</p>';
  } else {
    response = '<p>Page Not Found</p>';
  }

  res.statusCode = (req.url === '/home' || req.url === '/about' || req.url === '/node') ? 200 : 404;
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${req.url === '/home' ? 'Home' : req.url === '/about' ? 'About' : req.url === '/node' ? 'Node Project' : 'Not Found'}</title>
    </head>
    <body>
      ${response}
    </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
