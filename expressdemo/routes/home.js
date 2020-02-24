
const express = require('express');

//const app = express(); //here this will not work. as in index we are using app object as express(). so as we separate the routes in separate module. exports
//we will use express.route()

const router = express.Router();


router.get('/', (req, res) => { //these all are routes we can also call these middleware as it takes a request and send res to client
    //res.send('hello');
    //now we will replace above one with pug
    res.render('index',  {title: 'My Express App' , message:'Hello'});//this will go views folder and check pug values and display 
    });

    module.exports = router;