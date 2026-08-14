const path = require("path");
const express = require('express');
const app = express();

// set the 'public' folder as the location for our static files:
app.use(express.static('public'));

// set up for file uploads
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// app.post('/upload', (req, res) => {

// 	if (!req.files) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   res.send(JSON.stringify(req.files));
// });old code

app.post('/upload', (req, res) => {

	if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  //res.send(JSON.stringify(req.files));

  const file = req.files.someFile;

  // validate the file type
  const allowedExtension = ['.png','.jpg','.jpeg']; // these files extensions are allowed to be uploaded

  const extensionName = path.extname(file.name); // get the file extension of file being uploaded

  if(!allowedExtension.includes(extensionName)){
      return res.status(422).send("Invalid Image");
  }

  // save the file
  const filePath = __dirname + "/../uploaded-files/" + file.name; // dirname will not end with a / (so you need to add one)
  file.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: filePath });
  });
});

// START THE SERVER
const port = 8080; // We'll run the server on port 8080
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});