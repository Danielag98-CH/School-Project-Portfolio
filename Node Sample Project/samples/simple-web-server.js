const http = require('http');

const app = http.createServer((req, res) => {
    console.log("handling request on server.....");
    res.end("Hello World!");
});

app.listen(8080);
console.log("Listening for requests on port 8080");