const port = 8080; // We'll run the server on port 8080

// IMPORTS
const express = require('express');
const app = express();
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');
const {getBlogList, convertMarkdown} = require("./modules/markdown-helpers")
const pathToBlogFolder = __dirname + '/blog/';

// MIDDLEWARE
app.use(express.static('public'));
app.set('view engine', 'ejs');
// allow the app to get data for form submits
app.use(bodyParser.urlencoded({ extended: true }));

///// Makes 'blogList' globally available on all 'views': /////
app.use((req, res, next) => {
   const blogList = getBlogList(pathToBlogFolder) || [];
   res.locals.posts = blogList;
   next();
 });
 app.use((req, res, next) => {
   res.locals.docClass = "";
   next();
 });

// Redirect to HTTPS
app.use((req, res, next) => {
   if (process.env.NODE_ENV === 'production') {
      if (req.headers['x-forwarded-proto'] !== 'https')
         // the statement for performing our redirection
         return res.redirect('https://' + req.headers.host + req.url);
      else
         return next();
   }else{
      return next();
   }
});

// ROUTES
app.get('/', (req, res) => {
   res.locals.docClass = "home-page";
   res.render('home', {
      title: "My Home Page"
   });
});

// app.get('/blog', (req, res)=>{
//   const blogList = getBlogList(pathToBlogFolder);
//   res.locals.docClass = "blog-list-page";
//   res.render('blog-list', {
//     title: "Blog",
//     posts: blogList
//   });
// });
app.get("/blog", (req, res) => {
   const posts = getBlogList("./blog/");
   res.render("blog-list", { title: "Blog", posts });
});

router.get('/', (req, res) => {
   console.log("Fetching updated blog list...");
   const blogs = getBlogList('./blog/'); 
   console.log("Updated Blogs:", blogs);
   res.render('blog', { title: 'Blog Posts', posts: blogs });
});

module.exports = router;

app.get("/blog/:post", (req, res) => {
   const filePath = `./blog/${req.params.post}.md`;
   const post = convertMarkdown(filePath);

   if (!post) {
       return res.status(404).render("404", { title: "Post Not Found" });
   }

   res.render("blog-post", {
       title: post.data.title,
       description: post.data.description,
       author: post.data.author,
       published: post.data.published,
       content: post.html
   });
});

app.get('/contact', (req, res) => {
   res.locals.docClass = "contact-page";
   res.render('contact', {
      title: "Contact Me"
   });
});

app.post('/contact/submit', (req, res) => {

   // import the helper functions that we need
   const {isValidContactFormSubmit, sendEmailNotification} = require("./modules/contact-helpers");
 
   // Destructure the req.body object into variables
   const {firstName, lastName, email, comments} = req.body;
 
   // Validate the variables
   if(isValidContactFormSubmit(firstName, lastName, email, comments)){
     // Everything is valid, so send an email to YOUR email address with the data entered into the form
     const message = `From: ${firstName} ${lastName}\n
                     Email: ${email}\n
                     Message: ${comments}`;
      sendEmailNotification(message, (err, info) => {
         if(err){
            console.log(err);
            return res.status(500).send("There was an error sending the email");
         }else{
            // Render a template that confirms the contact form info was recieved:
            res.locals.docClass = "contact-submit-page";
            res.render("default-layout", {
               title: "Contact Confirmation",
               content: "<h2>Thank you for contacting me!</h2><p>I'll get back to you ASAP.</p>"
            })
         }
   });
 
   }else{
     res.status(400).send("Invalid request - data is not valid")
   }
 
});

app.get("/404", (req, res) => {
  res.status(404);
  res.render('default-layout', {
     title: "Page Not Found",
     content: "<h1>Sorry!</h1><h3>We can't find the page you're requesting.</h3>"
  });
});
 
app.all('*', (req, res) => {
  res.status(404).redirect("/404");
});

// START THE SERVER
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});

