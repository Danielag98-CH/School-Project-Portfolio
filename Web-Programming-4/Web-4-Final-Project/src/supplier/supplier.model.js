const {validateEmailAddress} = require("../utils");

class Supplier {
  
    constructor({ id, Name, email, phone }) {
        this.id = id || 0;
        this.Name = Name;
        this.email = email;
        this.phone = phone;
    }

  validate(){
    
    const errorMessages = {};
    let isValid = true;
    

    if(isNaN(this.id)){
      errorMessages.id = "The user id must be a number";
      isValid = false;
    }else if((this.id >= 0) == false){
      errorMessages.id = "The user id must be 0 or greater";
      isValid = false;
    }

    // validate Name
    if(!this.Name){
      errorMessages.Name = "Name is required";
      isValid = false;
    }else if(this.Name.length > 100){
      errorMessages.Name = "Name must be 100 characters or less";
      isValid = false;
    }

    // validate email
    if(!this.email){
      errorMessages.email = "Email is required";
      isValid = false;
    }else if(!validateEmailAddress(this.email)){
      errorMessages.email = "Email is not valid";
      isValid = false;
    }else if(this.email.length > 200){
      errorMessages.email = "Email must be 255 characters or less";
      isValid = false;
    }
    
   //validate phone number
   if (!this.phone || this.phone.length > 20) {
      errorMessages.phone = "Phone is required and must be 20 characters or less";
      isValid = false;
    }
    
    return [isValid, errorMessages]

  }

}

module.exports = Supplier;