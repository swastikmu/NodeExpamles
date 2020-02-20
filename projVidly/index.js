const express = require('express');
const Joi = require('joi');

app = express();

app.use(express.json());

var genere = [ 'horror' ,'Action' , 'comedy' , 'romantic' , 'cult' , 'rom-com' , 'thriller' , 'neo-noir'];

app.get('/api/genere', (req, res)=>
{
res.send(genere);
}
);

app.post('/api/genere', (req, res) =>
{

const find = genere.find( c => c === req.params);
if (find) {
res.status(400).send("Already exsist");
}



const schema = {
genere: Joi.string().required()
}

const result = Joi.validate(req.body, schema);

if (result.error) {
res.status(400).send(result.error.details[0].message);
return;
};
genere.push(find);


}

)









app.listen(3000, ()=>{console.log('Listening for port no 3000...')})