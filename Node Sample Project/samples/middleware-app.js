const express = require('express');
const app = express();


app.use((req, res, next) => {
    console.log("https check....");
    next();
});

// app.use((req, res, next) => {
//     console.log("authentication check....");
//     const user = "Bob";
//     if(user){
//        req.user = user; 
//     }
//     next();
// });

const authCheck = (req, res, next) => {
    console.log("authentication check....");
    const user = null;
    if(user){
       req.user = user; 
       next();
    } else{
        res.send("You are not logged in");
    }
}

app.get('/', (req, res) => {
    if(req.user){
        res.send("Hello " + req.user);
    }
    res.send("Hi");
});

app.get("/members-only", authCheck, (req, res) => {
    res.send("Welcome to the club");
});


const port = 8080;
const server = app.listen(port, () => {
    console.log("Waiting for requests on port %s", port);
});