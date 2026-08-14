const bcrypt = require("bcrypt");

// hash a passsword
const plainTextPassword = "test123";
const saltRounds = 10;

/*
// async version
bcrypt.hash(plainTextPassword, saltRounds, (err, hashedPassword) => {
    if(err){
        console.log(err);
    }else{
        console.log(hashedPassword);
    }
})
*/

// then/catch
bcrypt.hash(plainTextPassword, saltRounds)
    .then(hashedPassword => console.log(hashedPassword))
    .catch(err => console.log(err));

// checking a password to see if it matches hash
const hashedPassword = "$2b$10$2NV5v6/GiqIAByLm2Dim5efVLfuL9Iro.MevyW8.0qyhYA3WAylfy"

bcrypt.compare(plainTextPassword, hashedPassword)
    .then(result => console.log(result ? "Passwords Match!" : "THEY DON'T MATCH!"))
    .catch(err => console.log(err))
