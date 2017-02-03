var http = require('http');
const EventEmitter = require('events');

class DisparaEvento extends EventEmitter {}

const eventos = new DisparaEvento();

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node.JS!');
}).listen(8080);


eventos.on('loco', () => {

    console.log('teste');

});

eventos.emit('loco')

console.log('Server running at http://localhost:8080/');