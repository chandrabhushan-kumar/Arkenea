const http = require('http');
const app = require('./App.js'); // app file include

const port  = 3009;
console.log('port => ',port);

const server = http.createServer(app);
server.listen(port);