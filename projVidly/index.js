const express = require('express');

const generes = require('./routes/generes');

app = express();

app.use(express.json());//parse the json body request


app.use('/api/genere' , generes);
//added to middleware so commented
//with the above line we are tellig the express framework for any erquest of type '/api/genere' use the middleware ./routes/generes by passing
//the  generes object of const generes

// var generes = [ 
// {id: 1 , genere : "Action"} ,
// {id: 2 , genere : "Neo-noir"} ,
// {id: 3 , genere : "Horror"} ,
// {id: 4 , genere : "Comedy"} ,
// {id: 5 , genere : "Romantic"} ,
// {id: 6 , genere : "Cult"} ,
// {id: 7 , genere : "Rom-com"} ,
// {id: 8 , genere : "Thriller"} 

// ];
// //get
// app.get('/api/genere', (req, res)=>
// {
// res.send(generes);
// }
// );
// //post
// app.post('/api/genere', (req, res) =>
// {

// const find = generes.find( c => c.genere == req.body.genere);
// if (find) {
// res.status(400).send("Already exsist");
// return;
// }
// console.log(req.params.genere);
// const oGenere = {
//     id: generes.length + 1,
//     genere: req.body.genere
// }


// const schema = {
// genere: Joi.string().required()
// };

// const result = Joi.validate(req.body, schema);

// if (result.error) {
// res.status(400).send(result.error.details[0].message);
// return;
// };
// generes.push(oGenere);
// res.status(201).send(oGenere);
// }
// )
// //put
// app.put('/api/genere/:id' , (req, res)=>{
// var find = generes.find(c => c.id == req.params.id);
// if (!find) {
// res.status(400).send("Page not found!");
// return;
// }

// const schema = {
//     genere: Joi.string().required()
// }

// const result = Joi.validate(req.body , schema);
// if (result.error) {
//     res.status(400).send(result.error.details[0].message);
//     return;
// }


// find.genere = req.body.genere;
// res.send(find);

// })
// //delete
// app.delete('/api/genere/:id', (req, res) => {
// var find = generes.find(c => c.id == req.params.id);
// if (!find) {
// res.status(400).send("Page not found!");
// return;
// }
// const index = generes.indexOf(find);

// generes.splice(index, 1);
// res.send(find);

// })


app.listen(3000, ()=>{console.log('Listening for port no 3000...')})