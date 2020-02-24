const express = require('express');

//const app = express(); //here this will not work. as in index we are using app object as express(). so as we separate the routes in separate module. exports
//we will use express.route()

const router = express.Router();

const courses = [

{id: 1 , name: "course1" },
{id: 2 , name: "course2" },
{id: 3 , name: "course3" },

];
//get all the courses
router.get('/', (req, res) => {
res.send(courses);
return;
});

//Get only one course
router.get('/:id', (req, res) => {
const find = courses.find( c => c.id === parseInt(req.params.id)); //find function returns the object if it founds else blank
if (!find) {
res.status(404).send('page not found'); // it is require to send the status code when bad request with the message
return; 
}
else{
res.send(find);
return;
}
});

//post a course
router.post('/' , (req, res) => {

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

});


//put request on a course
router.put('/:id' , (req, res)=>{
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


//delete a course
router.delete('/:id', (req, res)=>
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
});


//validate function
function validateCourse(course)
{
const schema = {
name: Joi.string().min(3).required()
};
const  result = Joi.validate(course, schema);
return result;  
}

module.exports = router;
