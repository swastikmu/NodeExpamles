const mongoose = require('mongoose');

//this is a connection string needed to connect to mongodb. as i have mongodb in same system so using localhost . in real time it will be different
//real scenario the string will come from a config file
mongoose.connect('mongodb://localhost/playground') //mongodb://localhost/ - server name , playground - database
//this connect method returns a promise :)
.then(() => console.log('Connected to MongoDB...')) // if returned resolve then use then as per promise rule
.catch(err => console.error('Could not connect to MongoDB...' , err)); //if return reject then use then as per promise rule


//now we will create schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date , default: Date.now},
    isPublished: Boolean
}); //we can use string number, date, buffer, boolean, objctID, array as schema type

//now we will use model
//We use model like class. We define schema then we use that schema to define a model. it takes two args, first one is the singular or the schema like for
//courses it will be Course and C in upper case as model is class. next arg will be schema name. now we will create obj with this model
// here name will be in camel case.
const Course = mongoose.model('course' , courseSchema);


//now we will save the data above in MongoDB. So, as we know db call is asynchronous. so the below save method returns a promise.
async function createCourse(){

    const course = new Course({ 
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['Angular' , 'frontend'],
        isPublished: true
    }); //only these properties defiend here will be saved in db. schema can have more properties
    const result = await course.save(); // it returns a id when it successfully saves the data
    console.log(result);
}

//next we will do query on the available courses
async function getCourses(){
 //const courses =  await  Course.find(); 
 //this is to get all courses. the class Course has a method called find which returns all the data available in that table.
 const courses =  await  Course
 .find({author: 'Mosh'})
 .limit(10)
 .sort({name: 1})
 //.select({name: 1, tags: 1});
 .count();
 //the above one a bit complex query where we find all the courses relesed by Mosh and then we limit no of courses we want then we sort by name . 1 for assending -1 for decsending
 //select is to define which properties we want at the output. 
 console.log(courses);
}

//createCourse(); 
getCourses();

//Comparison operators
//suppose there is another property price for which we want to filter by greater than 10 . However, in js object only key-value pair is available. to use these operators we need 
//to change the query
//gte - greater than equal to
//lte - less than equal to
//nin - not in 
//in - in
//eq = equal to

async function getCourses(){
    //const courses =  await  Course.find(); 
    //this is to get all courses. the class Course has a method called find which returns all the data available in that table.
    const courses =  await  Course
    //.find({price: {$gte: 10 , $lte: 20}}) // we need to create object to create a key value pair for gte lte. this is gt 10 lt 15.
    .find({price: {$in: [10 , 15 , 20]}}) //find courses with price 10 , 15 , 20
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    //the above one a bit complex query where we find all the courses relesed by Mosh and then we limit no of courses we want then we sort by name . 1 for assending -1 for decsending
    //select is to define which properties we want at the output. 
    console.log(courses);
   }

     //logical operators
   //or
   //and

   //regular expression


async function getCourses(){
 //const courses =  await  Course.find(); 
 //this is to get all courses. the class Course has a method called find which returns all the data available in that table.
 const courses =  await  Course
 //.find({author: 'Mosh'})
 .find({author: /^Mosh/i}) //get courses whose author name starts with MoshModule ^ indicate starts of string . append i at end to make case insensitive
 .find({author: /Hamedani$/i}) // get courses whose author name ends with Hamedani. $  indicates end of string
.find({author: /.*Mosh.*/}) // get courses whose author name contains Mosh. .* for any value
 .limit(10)
 .sort({name: 1})
 .select({name: 1, tags: 1});
 //the above one a bit complex query where we find all the courses relesed by Mosh and then we limit no of courses we want then we sort by name . 1 for assending -1 for decsending
 //select is to define which properties we want at the output. 
 console.log(courses);
}

//count method if you use instead if select it will give the no of documents selected

//pagination

//update a data in DB
async function updateCourse(id){
const course = await Course.findById(id);
if (!course) return;

course.set(
    {
        isPublished: true,
        author:'Another Author'
    }
)
const result = await course.save();
console.log(result);
}
updateCourse('5a68fdf95db93f6477053ddd');