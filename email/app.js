const dotenv = require('dotenv');
dotenv.config();
const http = require('http');

const server = http.createServer();

const getMails = require('./getMails');

setInterval(() => {
    getMails();
    console.log(new Date().toISOString())
}, 15000);

//start server
const PORT = 3899;
server.listen(PORT);
server.on('listening', () => {
    console.log('App started on port ' + PORT);
});
