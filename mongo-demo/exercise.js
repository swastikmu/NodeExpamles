//get all the backend published courses , sort them by their name , pick name and author and display them

//Step 1: Require the Mongoose module
const mongoose = require('mongoose'); //importing required module to

//Step 2: Connect to the Mongo database
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('Connected to database...'))
.catch(err => console.error('unable to connect to database' , err)); //connected to mangoDB

//Step 3: Create a Schema

const courseSchema = new mongoose.Schema({
//tags:[String],
date:{type:Date , default:Date.now},
name: {type: String , required: true}, //this required tells this is mandatory. it triggers when save() gets executed.
author: String,
isPublished: Boolean,
//price:Number,
//suppose the validatin is if isPublished eq true then price is required
price:{type: Number, 
required: function() {return this.isPublished;},
category: {type: String, 
    required: true,
    enum: ['web','mobile', 'network'] //category will take value between these array value
}
},
//some valiation cannot be achived using built in validator we need to use custom validator.
//suppose we want there should be at least one tag in the tags

tags:{type: Array, 

validate:{
validator: function(v){

    return v && v.length > 0;
},
message : 'A course should have at least one tag'
}
}
//for async validation we set first isAsync : true 
});

//Related to string there are different other types of validator minlength , maxlength, match to match a pattern
// if we want a perticular field should have some predefinded value then we use property enum.


//Step 4: Create a model

const Course = mongoose.model('Course', courseSchema);

//step5: create getCourses methods

// async function getCourses(){

//    return await Course
// .find({isPublished: true})
//      .or([{price : {$gte: 15}} ,  { name: /.*by.*/i} ]) //can be done using $in operator in find 
//      .sort({price : -1})
//      .select({name: 1, author:1 , price:1});

// }

// //step 6: call the method
// async function run(){
//   const courses = await  getCourses();
//   console.log(courses);

// }

// run();

// async function updateCourse(id){
//     const course = await Course.findById(id);
//     if (!course){
//         console.log(course);
//         return;
//     }
    
//     course.set(
//         {
//             author:'Another Author'
//         }
//     )
//     const result = await course.save();
//     console.log(result);
//     }

//   updateCourse('5a68fdc3615eda645bc6bdec');


  async function createCourse(){

    const course = new Course({
       name: 'Angular Course',
        author: 'Mosh',
        tags: [],
        isPublished: true,
        category:'-',
        price: 15
    });
    try {
        const result = await course.save(); // it returns a id when it successfully saves the data
        console.log(result);       
    } catch (error) {
        for(field in error.errors)
        {
            console.log(error.errors[field]);
        }
    }

}

createCourse();



