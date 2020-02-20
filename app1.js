const express = require('express');
const path = require('path');



// const server = http.createServer((req , res) => {
//     if (req.url === '/abcd') {
//         res.write('hello');
//         res.end();
//     }
// });

// // server.on('connection' , (socket) => {
// //     console.log('new connection')
// // })

// server.listen(4000);

// console.log('listening to listen port 4000');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api/members' , (req, res) => {

var members =[
{
id: 1,
name : "Swastik",
Company : "Accenture"
},
{
    id: 2,
    name : "Sukriya",
    Company : "Bikash"
}
]

res.json(members);

})

app.get('/' , function(req, res){
//res.send('hello world!');
res.sendFile(path.join(__dirname , '..\\JS\\Outlook' , 'Display.html'))
});

app.get('/swastik' , function(req, res){
res.send('hello swastik');
});


app.listen(PORT, function(){

    console.log(`server running on port ${(PORT)}`);
});