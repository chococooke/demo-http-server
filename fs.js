const http = require('http');
const fs = require('fs').promises;
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Submit Message</title></head>
      <body>
        <h1>Submit a Message</h1>
        <form method="POST" action="/submit">
          <label>Message: <input type="text" name="message"></label>
          <button type="submit">Submit</button>
        </form>
      </body>
      </html>
    `);
  } else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const message = new URLSearchParams(body).get('message') || 'No message';
      await fs.appendFile('data.txt', `${message}\n`);
      res.statusCode = 302;
      res.setHeader('Location', '/success');
      res.end();
    });
  } else if (req.url === '/success' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Success</title></head>
      <body>
        <p>Message submitted successfully!</p>
        <a href="/">Submit another</a>
      </body>
      </html>
    `);
  } else {
    res.statusCode = 404;
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Not Found</title></head>
      <body>
        <p>Page Not Found</p>
      </body>
      </html>
    `);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
