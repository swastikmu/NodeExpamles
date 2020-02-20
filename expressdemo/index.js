const express = require('express');
const app = express();
const Joi = require('joi'); //returns class so j is in caps use for input validation

app.use(express.json());

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
const courses = [

{id: 1 , name: "course1" },
{id: 2 , name: "course2" },
{id: 3 , name: "course3" },

];

app.get('/', (req, res) => { //these all are routes we can also call these middleware as it takes a request and send res to client
res.send('hello');
});

app.get('/courses', (req, res) => {
res.send(courses);
return;
});

app.get('/courses/:id', (req, res) => {
const find = courses.find( c => c.id === parseInt(req.params.id)); //find function returns the object if it founds else blank
if (!find) {
res.status(404).send('page not found'); // it is require to send the status code when bad request with the message
return; 
}
});

app.post('/api/courses' , (req, res) => {

const schema = {
name: Joi.string().min(3).required() //this is Joi property we use it to create schema first then use that schema to validate the req 
};

const  result = Joi.validate(req.body, schema); // this has two parameter in return one is error  other is value


//input validation
//if (!req.body.name || req.body.name.length < 3) {
if (result.error) {
res.status(400).send(result.error.details[0].message);
}
const course = {
id: courses.length +1,
name: req.body.name
};

courses.push(course);
res.send(course);

}

);

app.put('/courses/:id' , (req, res)=>{
const course = courses.find( c => c.id === parseInt(req.params.id));
console.log(course);
if (!course) {
res.status(404).send('id page not found');
return;

}
   
var result = validateCourse(req.body);
//var {error} = validateCourse(req.body); //this equal to result.error

if (result.error) {
res.status(400).send(result.error.details[0].message);
return;   
}   
course.name = req.body.name;
res.send(course);
});

function validateCourse(course)
{
const schema = {
name: Joi.string().min(3).required()
};
const  result = Joi.validate(course, schema);
return result;  
}

app.delete('/courses/:id', (req, res)=>
{
    //if does not exist return 404
const find = courses.find( c => c.id === parseInt(req.params.id));
if (!find) {
res.status(404).send('page not found');
return;   
}    
//else delete
const index = courses.indexOf(find);

courses.splice(index, 1);
res.send(find);
})

const port = process.env.PORT || 8080

app.listen(port, () => console.log('Listening to port 3000...')); //it creates the server and then listen to that port for request