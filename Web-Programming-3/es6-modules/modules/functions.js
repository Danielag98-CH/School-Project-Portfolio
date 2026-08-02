export function sayHello(){
	alert("hello");
	log("hello");
}

export function sayGoodBye(){
	alert("bye");
	log("bye");
}

// Note that we are not using the 'export' keyword before log() function
function log(msg){
	console.log(msg);
}

//example of what this could look like
// function sayHello(){
// 	alert("hello");
// 	log("hello");
// }

// function sayGoodBye(){
// 	alert("bye");
// 	log("bye");
// }

// function log(msg){
// 	console.log(msg);
// }

// export {sayHello, sayGoodBye}