const fs = require("fs");

const path = __dirname + "/../users.json";
console.log("User data will be stored in this file: ", path);

// function saveUsers(users){
//   const json = JSON.stringify(users);
//   fs.writeFileSync(path, json);
// }*old code*

function saveUsers(users){
    const json = JSON.stringify(users, null, 2)
    fs.writeFileSync(path, json);
}

function getAllUsers(){
    const usersJSON = fs.readFileSync(path, "utf-8");
    return JSON.parse(usersJSON);
}

function addUser(user){
    const users = getAllUsers();
    users.push(user);
    saveUsers(users);
}

function getUserByEmail(email){
    const users = getAllUsers();
    return users.find(u => u.email === email);
}

function login(email, password){
    const user = getUserByEmail(email);
    if(user && user.password === password){
      return user;
    }
    return false;
}


exports.saveUsers = saveUsers;
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.getUserByEmail = getUserByEmail;
exports.login = login;