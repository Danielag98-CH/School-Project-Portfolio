// Import the fs module (which is an object that has useful methods for doing file IO)
const fs = require("fs");

// The content that we want to put into a file
const content = "Hello World!"

// The name of the file that we want to create
const fileName = "my-file.txt"

// The full path to the file we want to create (starting from the root of the drive)
const filePath = __dirname + "/" + fileName;
console.log("FULL path TO FILE: " + filePath);

// Invoke the writeFile() method of the fs object
fs.writeFile(filePath, content, (error) => {
  if(error){
    console.log(error);
  }else{
  	console.log("file written successfully");
  }
});

fs.readFile(filePath,'utf-8', (error, fileContents)=>{
	if(error){
		console.log(error);
	}else{
		console.log("FILE CONTENTS: " + fileContents);
	}
});

fs.writeFileSync(filePath, content);
console.log("SYNCHRONIZED VERSION: file written successfully!")

const fileContents = fs.readFileSync(filePath, "utf-8");
console.log("SYNCHRONIZED VERSION: " + fileContents);