
// const path = require('path');
// const os = require('os');
// const event = require('events');

// var emitter = new event();

// var pathObj = path.parse('os');
// var pathObj1 = path.parse(__filename);
// console.log(pathObj);
// console.log(pathObj1);

// var totmem = os.totalmem();
// var freemem = os.freemem();

// console.log(`Total free memory ${(totmem)}`);
// console.log(freemem);

// const logger = require('./logger.js'); //good practice as we accidntaly not overwrite the logger 

// function sayHello(name) {
//     global.console.log("Hello " + name);
// }

// sayHello("Swastik Mukherjee");
// console.log(logger);
// logger.log("swastik");

// emitter.on("message" , function(arg1 , arg2){
//     console.log("listener called" , arg1 , arg2);
// })

// emitter.emit('message' , {id :  1 , abcd: 2 } ,  1 , 2);

const http = require('http');

const server = http.createServer((req , res) => {
    if (req.url === '/abcd') {
        res.write('hello');
        res.end();
    }
});

// server.on('connection' , (socket) => {
//     console.log('new connection')
// })

server.listen(3000);

console.log('listening to listen port 3000')