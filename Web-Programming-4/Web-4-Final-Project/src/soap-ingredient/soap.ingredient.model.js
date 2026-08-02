class SoapIngredient{

    constructor({ soap_id, ingredient_id, amount_used }){
        this.soap_id = soap_id;
        this.ingredient_id = ingredient_id;
        this.amount_used = amount_used;
    }

  validate(){
        const errors = {};
        let ok = true;

        if(!Number.isInteger(this.soap_id) || this.soap_id <= 0){
            errors.soap_id = "soap_id must be a positive integer";
            ok = false;
        }
        if(!Number.isInteger(this.ingredient_id) || this.ingredient_id <= 0){
            errors.ingredient_id = "ingredient_id must be a positive integer";
            ok = false;
        }
        if(!this.amount_used){
            errors.amount_used = "amount_used is required";
            ok = false;
        }else if(this.amount_used.length > 30){
            errors.amount_used = "amount_used must be 30 characters or less";
            ok = false;
        }

        return [ok, errors];
    }
}

module.exports = SoapIngredient;