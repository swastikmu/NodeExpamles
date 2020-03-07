//There are two types ways we can create relation betweeen different document. 1. Using Reference (Normalization) 2. Using Embadded Doc(Denormalization)

//Using Reference 

//adv and disadv : Consistancy bue need to do extra query for author

let author ={
    name : 'Swastik'
};

let course = {
    author : 'id',
    authors : ['id1' , 'id2'] //if there are multiple author then need to create an array. 
}; //we use the id of author swastik here to define the relation of two. 

//using embadded docs (Denormalization)
//if we want to change some data need to change in multiple places else it will give in consistancy. performance faster

let course = {
    author : {
        name: 'swastik'
    }
}; 

//Need to have best of both worlds. 
//we can have embadded only necessary properties to the courses to make it hybrid

let course = {

    author : {
        id: 'ref',
        name: 'swastik' //it might have 50-100 properties so we added only one or two 
    }
}
