const event  = require('events');
//var emitter = new event();

var url = "http://mylogger.io/log"

class Logger extends event{
    log(message){
        console.log(message);

        this.emit('messagelogged' , {id : 1 , url : 'https://mylogger.io'})

    }
}

function log (message)
{
console.log(message);
}

//module.exports.log= log;  //first log is etxernal function = log one is log function here
module.exports = Logger;