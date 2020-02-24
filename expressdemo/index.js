const express = require('express');
const app = express();
const helmet = require('helmet'); //example of thirld party middleware
const morgan = require('morgan'); //example of thirld party middleware it logs the data of url request
const Joi = require('joi'); //returns class so j is in caps use for input validation
const config = require('config'); //keep the config folder in same folder as express demo
const courses = require('./routes/courses');
const home = require('./routes/home');



app.use(express.json());
app.use(express.static('public'));
app.use(helmet()); //as it returned a function 
app.use(morgan('tiny'));
app.use('/api/courses' , courses);
app.use('/' , home);


console .log('Application Name: ' + config.get('name'));
console .log('Application Name: ' + config.get('mail.host'));

app.set('view engine' , 'pug'); //set the template engine to pug. this is to tell express that we will use pug . it will internally load pug
app.set('views' , './views');




app.use(function(req, res,next) {
    console.log('logging...');
    next(); //this next is to transfer the control to next middleware/ if we do not do that request will hang
});
//middleware functions called in sequence

app.use(function(req, res,next) {
    console.log('Authenticating...');
    next(); //this next is to transfer the control to next middleware/ if we do not do that request will hang
});
//we generally put each middlleware custom function in a separate module and we module.export from there and use it here
//here we will require it 





const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Listening to port 8080..')); //it creates the server and then listen to that port for request