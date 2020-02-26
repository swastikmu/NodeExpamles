console.log('before');

setTimeout( ()=> {
console.log('Read a user from database'); //this line will get executed after 3 seconds . as this func is aysnc so before , after than this line will execute
} , 3000);

//console.log(user); //this value will be undefined as getUser takes 2 sec time to executes. 
//so how to handle these asynchonous functions . there are three ways . 1. callbacks 2. promises 3. async-await

getUserCallback(1 , function(user){
    console.log(user);
    getRepoCallback(user.gitHubUserName, (repos)=>{
        console.log(repos);
    });
});
//this is a problem with callback. suppose we need to do something after w get the data from the getRepo then there will be another nesting and it goes on
//this makes code very hard for human readable. this is called Callback Hell as nesting after nesting :( . so what is the solution ? we can use named function instaed of annonimous function



// const p = getUser(1);
// p.then(user=> console.log(user));
//wecan get rid off this p 
// getUser(1)
// .then(user=> console.log(user));

// getUser(1)
// .then(user=> getRepo(user.gitHubUserName))
// .then(repos=>console.log(repos));
//we can see using promise get rid of nesting

//now we will try async-await
async function dispRepo(){
const user = await getUser(1);
const repos = await getRepo(user.gitHubUserName);
console.log(repos);
}

dispRepo();
//as we see async await is a syntactical sugar on the top of promise. it built on top of promise only as we are using functions which were returning promise
//instaed of then-catch chain to get rid of call back hell we use await. it makes code looks like synchronous code however it is asynchronous
//to handle error here use try-catch




console.log('after');

function getUserCallback(id , callback){
    setTimeout( ()=> {
    console.log('reading user from db');
   callback({id: id , gitHubUserName: 'swastik'}); 
    } , 2000);

}

function getRepoCallback(userName , callback)
{
setTimeout( ()=>{
    console.log('calling git api...');
callback(['repo1' , 'repo2' , 'repo3']);
} , 2000)
}

//now we will modify getUser this using promise

function getUser(id){
    return new Promise(( resolve , reject ) =>{
    setTimeout( ()=> {
    console.log('reading user from db');
   resolve({id: id , gitHubUserName: 'swastik'}); 
    } , 2000)
});
};
//we can see we get rid of callback here. 

//Change getRepo using promise

function getRepo(userName )
{
    return new Promise((resolve ,  reject) => {
        setTimeout( ()=>{
            console.log('calling git api...');
        resolve(['repo1' , 'repo2' , 'repo3']);
        } , 2000)
        });

};

getUserCallback(1 , getRepository );

function displayRepo(repos){
    console.log(repos);
}

function getRepository(user){
    getRepo(user.gitHubUserName, displayRepo );
}
// however this is also not the best solution. We use Promise instead now :) go to file promise.js.
// now we will consume those promises here
