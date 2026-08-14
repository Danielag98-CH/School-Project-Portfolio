const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// set the 'public' folder as the location for our static files:
app.use(express.static('public'));

// allow the app to receive data from form submits
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/request-handler', (req, res) => {
    console.log(req.method);
    res.send(parseRequest(req));
});

const parseRequest = (req) => {
    let str = "";
    str += "METHOD: " + req.method + "<br>";
    str += "IP: " + req.ip + "<br>";
    str += "PROTOCOL: " + req.protocol + "<br>";
    str += "HOST: " + req.hostname + "<br>";
    str += "PATH: " + req.path + "<br>";   // the path part of the URL
    str += "URL: " + req.originalUrl + "<br>"; // the entire request URL
    str += "SUBDOMAINS: " + JSON.stringify(req.subdomains) + "<br>"; // any subdomains in the URL
    str += "QUERY STRING: " + JSON.stringify(req.query) + "<br>";
    str += "BODY: " + JSON.stringify(req.body) + "<br>"; // REQUIRES bodyParser package
    str += "COOKIES: " + JSON.stringify(req.cookies) + "<br>"; // REQUIRES cookie parser package
    str += "FILES: " + JSON.stringify(req.files) + "<br>"; // REQUIRES express-fileUpload package

    str += "<br>HEADERS<br>"
    for(key in req.headers){
        str += `${key}: ${req.headers[key]}<br>`;
    }

    return str;

}

// START THE SERVER
const port = 8080; // We'll run the server on port 8080
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});