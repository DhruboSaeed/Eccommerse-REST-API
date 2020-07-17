const http = require('http');
const app = require('./app');

const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, console.log("Port on", port));


// var http = require('http');
// var server = http.createServer(app, function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     var message = 'It works with the server!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();