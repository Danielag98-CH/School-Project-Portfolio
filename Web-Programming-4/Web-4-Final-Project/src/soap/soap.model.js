class Soap {

    constructor({ soap_id, soap_name, description, created_by }) {
        this.soap_id = soap_id ?? 0;          
        this.soap_name = soap_name;
        this.description = description ?? '';
        this.created_by = created_by;
    }

    validate(){
        const errorMessages = {};
        let isValid = true;

    // soap_id: allow 0/must be >= 0 number
    if(this.soap_id !== undefined && this.soap_id !== null) {
        if(isNaN(this.soap_id)){
            errorMessages.soap_id = 'The soap_id must be a number';
            isValid = false;
        }else if(Number(this.soap_id) < 0){
            errorMessages.soap_id = 'The soap_id must be 0 or greater';
            isValid = false;
        }
    }

    // soap_name: required, <= 100
    if(!this.soap_name){
      errorMessages.soap_name = 'Soap name is required';
      isValid = false;
    }else if(this.soap_name.length > 100){
      errorMessages.soap_name = 'Soap name must be 100 characters or less';
      isValid = false;
    }

    // description: optional, <= 150 if present
    if(this.description && this.description.length > 150){
      errorMessages.description = 'Description must be 150 characters or less';
      isValid = false;
    }

    // created_by: required positive integer
    if(isNaN(this.created_by)) {
      errorMessages.created_by = 'created_by must be a number';
      isValid = false;
    }else if(Number(this.created_by) <= 0) {
      errorMessages.created_by = 'created_by must be greater than 0';
      isValid = false;
    }

    return [isValid, errorMessages];
  }
}

module.exports = Soap;