// IMPORTS
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// MIDDLEWARE
// We'll add 'middleware' code here soon
// set the 'public' folder as the location for our static files:
app.use(express.static('public'));

// specify that we are using 'ejs' templates in our app:
app.set('view engine', 'ejs');

// allow the app to receive data from form submits
app.use(bodyParser.urlencoded({ extended: true }));

//set up the cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// ROUTES
// app.get('/', (req, res) => {
//    res.send('<h1>Hello World from Express!</h1>');
// }); old code*
app.get('/', (req, res) => {
   res.render('default-layout', {
      title: "My Home Page",
      content: "<h1>Hello World from Express!</h1>"
   });
});

app.get('/some-route', (req, res) => {
   res.send('<h1>This is some route</h1>');
});

app.get("/dynamic-page.html", (req, res) => {
    const currentTime = new Date();
    res.send(`<h1>The current time is ${currentTime.toString()}</h1>`);
 });

app.get('/signup', (req, res) => {
   res.render('signup-layout', {
      title: "Sign Up"
   });
});

app.get('/login', (req, res) => {
   res.render('login-layout', {
      title: "Log In"
   });
});
 
app.post('/login', async (req, res) => {
   /*
   //old code
   // import the login() function
   const {login} = require("./modules/user-helpers");
 
   // destructure the req.body object to get the email and password from it
   const {email, password} = req.body;
 
   // attempt to login
   const user = login(email, password);
   if(user){
     res.send(`Hello ${user.firstName}`);
   }else{
     res.send("Invalid Login Attempt");
   }
   */

   const bcrypt = require("bcrypt");
   const {getUserByEmail} = require("./modules/user-helpers");
   const {email, password:passwordEntered} = req.body;
   const user = getUserByEmail(email);
   if(user){
      const result = await bcrypt.compare(passwordEntered,user.password);
      if(result){
         //res.send("Logged In!");
         const timeStamp = new Date().getTime();
         res.cookie("sessionId", timeStamp);
         sessions[timeStamp] = user.firstName;
         console.log(sessions);
         res.send("logged In!"); 
      }else{
         res.send("Wrong Password");
      }
   }else{
      res.send("Invalid Email")
   }

});

app.get("/logout", (req, res) => {
   const {sessionId} = req.cookies;
   if(sessionId && sessions[sessionId]){
      delete sessions[sessionId];
      res.clearCookie("sessionId");
      console.log(sessions);
   }
   res.send("You are logged out");
})

const sessions = {};


function loginCheck(req, res, next){
   const {sessionId} = req.cookies;
   if(sessionId && sessions[sessionId]){
      req.userName = sessions[sessionId];
      next();
   }else{
      res.redirect("/login");
   }
}

app.get("/members-only", loginCheck, (req, res) => {
   res.send("Hello " + req.userName);
})

// app.post('/signup-confirmation', (req, res) => {
//    res.send("Form data received: " + JSON.stringify(req.body));
//  });*old code*

app.post('/signup-confirmation', async (req, res) => {

   // import the addUser function
   const {addUser} = require("./modules/user-helpers");
 
   // destructure the req.body object into individual variables
   const {firstName, lastName, email, password, confirmPassword} = req.body;
 
   // make sure that all required data has been sent
   if(firstName && lastName && email && password && confirmPassword){
     // make sure the passwords match
     if(password === confirmPassword){
      /*
       // If everything is valid, then add the new user
       addUser({firstName, lastName, email, password});
       res.send("Thank you for signing up!")
       */

       //encrypting passwords: // MAKE SURE TO MAKE THIS ROUTE FUNCTION async
       const bcrypt = require("bcrypt");
       const saltRounds = 10; //maybe this should be an environment variable??????
       const hashedPassword = await bcrypt.hash(password, saltRounds);
       //res.send(hashedPassword);
       addUser({firstName, lastName, email, password:hashedPassword});
       res.send("Thank you for signing up!")

     }else{
       res.send("Invalid form submit - Passwords do not match!")
     }
   }else{
    res.send("Invalid form submit - All fields are required!");
   }
});


const productRoutes = require("./products/product.routes.js")
app.use("/products", productRoutes);

// START THE SERVER
const port = 8080; // We'll run the server on port 8080
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});