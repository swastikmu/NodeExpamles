const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}


async function updateAuthor(courseId){

// const course = await Course.findById(courseId);
// course.author.name = "Swastik Mukherjee";
//we can update it directly without query it

const course = await Course.updateOne({_id:courseId} , 
   { $set: {
    'author.name' : 'Swastika Mukherjee'
    }}
    );


// course.save();

}
async function addAuthor(courseId , author){

    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId , authorId){

    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

// createCourse('Node Course',[
//      new Author({ name: 'Sanu' }),
//      new Author({ name: 'Swastik' })]
//      );
//updateAuthor('5e59140a18512a18948cd4f7');

//addAuthor('5e591bfcdb2323175895cc21', new Author({ name: 'sheldon'}));
removeAuthor('5e591bfcdb23175895cc21', '5e591d0e7aff601a34de693f');


