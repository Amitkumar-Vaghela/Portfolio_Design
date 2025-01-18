/*
const http = require('http'); 
const fs = require('fs');
const url = require('url')
const path = require('path')

const myServer = http.createServer((req, res) => {
    const log = `${new Date()}: ${req.url} : ${req.method} \n`
    fs.appendFile('log.txt', log, () => {});
    console.log("requested");
    switch(req.url){
       
        case '/':
            if(req.method==='GET'){
                fs.readFile(path.join(__dirname,'index.html'),(err,content)=>{res.end(content)})
            }
            else if(req.method ==='POST'){
                //DB querry 
                res.end('Post method execution')
            }
         else if(req.method==='Put'){
             
            // DB querry
             res.end('Put method execution')
         }

         else if(req.method==='Patch'){
            //Db Querry
            res.end('Patch method execution')
         }

         break;

        case '/about':
         fs.readFile(path.join(__dirname,'about.html'),(err,content)=>{res.end(content)})
         break;
         
        case '/contact':
            fs.readFile(path.join(__dirname,'contact.html'),(err,content)=>{res.end(content)})
            break;

        default:
         res.end("404 page not found")
    }
});

myServer.listen(8000, () => {console.log("localhost:8000")});

*/












// // project 2
// const express = require('express'); // Importing Express
// const app = express();
// const mongoose = require('mongoose')
// const user = require('./schema')

// mongoose.connect('mongodb://127.0.0.1:27017/car_dealership')
// .then(()=>{console.log('MongoDB conneccted')})
// .catch((err)=>console.log('MongoDB connection Error', err))
// app.use(express.urlencoded({extended:true}))

// // Route Handlers
// app.get('/', (req, res) => {
//     return res.sendFile(__dirname+'/public/register.html')
// });

// app.get('/contact', (req, res) => {
//     return res.sendFile(__dirname+'/public/contact.html')
// });

// app.get('/about', (req, res) => {
//     return res.sendFile(__dirname+'/public/about.html')
// });

// app.get('/register', (req,res)=>{
//     const Newuser = new user ({
//         FirstName :req.body.FirstName,
//         LastName  : req.body.LastName,
//         Email : req.body.Email
//     })
// })

// // Start the server
// app.listen(3000, () => {
//     console.log('Server running on port 3000');
//     console.log('http://localhost:3000');
// });






const express = require('express'); // Importing Express
const mongoose = require('mongoose');
const User = require('./schema'); // Import the Mongoose schema

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/car_dealership', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Middleware to parse form data and JSON payloads
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

     // Serve static files from the "public" folder
// app.use(express.static(__dirname + '/public'));

// Route Handlers
app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/register.html');
});

app.get('/contact', (req, res) => {
    return res.sendFile(__dirname + '/public/contact.html');
});

app.get('/about', (req, res) => {
    return res.sendFile(__dirname + '/public/about.html');
});

app.post('/register', async (req, res) => {
    
        // Create a new user object
        const newUser = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
        })

        // Save the user to the database
        newUser.save()
        .then(()=>{res.send("Usaer saved succesfully")})
        .catch(()=>{res.send('Error registering user.')})
        })

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
    console.log('http://localhost:3000');
});

