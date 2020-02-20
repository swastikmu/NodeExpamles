const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');

//get req and serve all members
router.get('/' , (req, res) => {


res.json(members);

});

//get req and serve one member
router.get('/:id' , (req, res) => {

const found = members.some(member => member.id == req.params.id);

if (found)
{
res.json(members.filter(member1 => member1.id ==  req.params.id));
}
else
{
res.status(400);
res.json( {msg : `No memeber with ${req.params.id} found ` } );
}});
//create new member
router.post('/' , (req, res) => {

var newMember = {
id: uuid.v4(),
name: req.body.name,
Company: req.body.Company
}
if (!newMember.name || !newMember.Company) {
    res.status(400);
    res.json( {msg : `Please enter name and company ` } );   
}
else{
    members.push(newMember);

    res.json(newMember);
}

}
);

//update member
router.put('/:id' , (req, res) => {

const found = members.some(member => member.id == req.params.id);

if (found)
{
//res.json(members.filter(member1 => member1.id ==  req.params.id));
members.forEach(member => {
    if (member.id == req.params.id) {
        member.name = req.body.name ? req.body.name : member.name;
        member.Company = req.body.Company ? req.body.Company : member.Company;

        res.json({msg : 'member updated' ,  member})
    }
});

}
else
{
res.status(400);
res.json( {msg : `No memeber with ${req.params.id} found ` } );
}});


module.exports = router;

