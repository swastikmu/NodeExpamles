const p = new Promise((resolve , reject) =>
{
    //kick some async work 
    setTimeout( ()=> {
      // resolve(1); 
       reject(new Error('Message'));
        } , 2000);
    
});

p
.then(result => console.log(result))
.catch(err => console.log(err.message));