const {saveUsers, getAllUsers, addUser, getUserByEmail, login} = require("../modules/user-helpers");

// Test the saveUsers() method
const userData = [
  {"firstName":"Bob", "lastName":"Smith", "email":"bob@smith.com", "password":"test123"}
]

saveUsers(userData);

// Test the getAllUsers() function
const users = getAllUsers();
console.log("All Users: ", users);

// Test the addUser() function
const newUser = {"firstName":"Betty", "lastName":"Jones", "email":"betty@jones.com", "password":"opensesame"};
addUser(newUser);

// Test the login() function
console.log(login("bob@smith.com","test123")); // should return the 'user' obj for bob smith
console.log(login("bob@smith.com","blah")); // should return false
console.log(login("blah","blah")); // should return false