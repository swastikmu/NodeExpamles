//This example shows how to send json data to client using res.json
const express = require('express');
const logger = require('./middleware/logger');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false}));

const PORT = process.env.PORT || 5000;

app.use(logger);

//app.listen creates http server and returns the http server object
app.listen(PORT, function(){

console.log(`server running on port ${(PORT)}`);
});

app.use('/api/members' , require('./routes/api/members'));

// //get req and serve all members
// app.get('/api/members' , (req, res) => {


// res.json(members);

// });

// //get req and serve one member
// app.get('/api/members/:id' , (req, res) => {

// const found = members.some(member => member.id == req.params.id);

// if (found)
// {
//     res.json(members.filter(member1 => member1.id ==  req.params.id));
// }
// else
// {
//     res.status(400);
//     res.json( {msg : `No memeber with ${req.params.id} found ` } );
// }


// })

