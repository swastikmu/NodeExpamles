const express = require('express');
const Joi = require('joi');

const router = express.Router();

var generes = [ 
    {id: 1 , genere : "Action"} ,
    {id: 2 , genere : "Neo-noir"} ,
    {id: 3 , genere : "Horror"} ,
    {id: 4 , genere : "Comedy"} ,
    {id: 5 , genere : "Romantic"} ,
    {id: 6 , genere : "Cult"} ,
    {id: 7 , genere : "Rom-com"} ,
    {id: 8 , genere : "Thriller"} 
    
    ];
    //get
    router.get('/', (req, res)=>
    {
    res.send(generes);
    }
    );
    //post
    router.post('/', (req, res) =>
    {
    
    const find = generes.find( c => c.genere == req.body.genere);
    if (find) {
    res.status(400).send("Already exsist");
    return;
    }
    console.log(req.params.genere);
    const oGenere = {
        id: generes.length + 1,
        genere: req.body.genere
    }
    
    
    const schema = {
    genere: Joi.string().required()
    };
    
    const result = Joi.validate(req.body, schema);
    
    if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
    };
    generes.push(oGenere);
    res.status(201).send(oGenere);
    }
    )
    //put
    router.put('/:id' , (req, res)=>{
    var find = generes.find(c => c.id == req.params.id);
    if (!find) {
    res.status(400).send("Page not found!");
    return;
    }
    
    const schema = {
        genere: Joi.string().required()
    }
    
    const result = Joi.validate(req.body , schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    
    find.genere = req.body.genere;
    res.send(find);
    
    })
    //delete
    router.delete('/:id', (req, res) => {
    var find = generes.find(c => c.id == req.params.id);
    if (!find) {
    res.status(400).send("Page not found!");
    return;
    }
    const index = generes.indexOf(find);
    
    generes.splice(index, 1);
    res.send(find);
    
    });

    module.exports = router;
    