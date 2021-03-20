const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./index.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Whoops! File not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
});

server.listen(port);
