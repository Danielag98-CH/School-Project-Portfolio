class Artist {

  constructor({id, name, birthDate}){
    // if the id is undefined, it should default to 0
    this.id = id || 0;
    // if the name is undefined, it should default to an empty string
    this.name = name || "";
    // if the birthDate is undefined, it should default to NaN
    this.birthDate = birthDate || NaN;
  }

  validate(){

    let isValid = true;
    const errorMessages = {};

    // VALIDATE THE id PROPERTY
    // It must be a number greater than 0
    // If it is not a number, then do the following:
    //  1. set isValid to false
    //  2. set errorMessages.id to "The artist id must be a number"
    if(typeof(this.id) !== "number"){
      isValid = false;
      errorMessages.id = "The artist id must be a number";
    }

    // If it is not greater than 0, then do the following:
    //  1. set isValid to false
    //  2. set errorMessages.id to "The artist id must be 0 or greater"
    if(this.id < 0){
      isValid = false;
      errorMessages.id = "The artist id must be 0 or greater";
    }


    // VALIDATE THE name PROPERTY
    // It must be a non-empty string that is 120 characters or less
    // If it is not a string, then do the following:
    //  1. set isValid to false
    //  2. set errorMessages.name to "The artist name must be a string"
    if(typeof(this.name) !== "string"){
      isValid = false;
      errorMessages.name = "The artist name must be a string";
    }
    // If it is an empty string, then do the following:
    //  1. set isValid to false
    //  2. set set errorMessages.name to "The artist name is required"
    if(this.name === ""){
      isValid = false;
      errorMessages.name = "The artist name is required";
    }
    
    // If it is more than 120 characters, then do the following:
    //  1. set isValid to false
    //  2. set set errorMessages.name to "The artist name must be 120 characters or less"
    if(this.name.length > 120){
      isValid = false;
      errorMessages.name = "The artist name must be 120 characters or less";
    }

    // VALIDATE THE birthDate PROPERTY
    // It must be a string that represents a valid date which is later than 1900 but before the current date
    // If it can not be parsed into a valid Date object:
    //  1. set isValid to false
    //  2. set errorMessages.birthDate to "The artist birthday is not a valid date"
    if (isNaN(new Date(this.birthDate).getTime())) {
      isValid = false;
      errorMessages.birthDate = "The artist birthday is not a valid date";
    }
    // If it is earlier than 1900-1-1:
    //  1. set isValid to false
    //  2. set errorMessages.birthDate to "The artist birthday cannot be before 1900"
    if (new Date(this.birthDate).getTime() < new Date("1900-01-01").getTime()){
      isValid = false;
      errorMessages.birthDate = "The artist birthday cannot be before 1900";
    }
    // If it is later than the current Date
    //  1. set isValid to false
    //  2. set errorMessages.birthDate to "The artist birthday cannot be in the future"
    if (new Date(this.birthDate).getTime() > new Date().getTime()) {
      isValid = false;
      errorMessages.birthDate = "The artist birthday cannot be in the future";
    }

    return [isValid, errorMessages]

  }

}

module.exports = Artist;