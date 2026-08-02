class Ingredient {

    constructor({ ingredient_id, ingredient_name, supplier_id, cost, amount_purchased }) {
        this.ingredient_id = ingredient_id ?? 0;
        this.ingredient_name = ingredient_name;
        this.supplier_id = supplier_id;
        this.cost = cost;
        this.amount_purchased = amount_purchased;
    }

    validate() {
        const errorMessages = {};
        let isValid = true;

        // Validate ingredient_id
        if(isNaN(this.ingredient_id)){
            errorMessages.ingredient_id = "The ingredient_id must be a number";
            isValid = false;
        }else if(this.ingredient_id < 0){
            errorMessages.ingredient_id = "The ingredient_id must be 0 or greater";
            isValid = false;
        }

        // Validate ingredient_name
        if(!this.ingredient_name){
            errorMessages.ingredient_name = "Ingredient name is required";
            isValid = false;
        }else if(this.ingredient_name.length > 40){
            errorMessages.ingredient_name = "Ingredient name must be 40 characters or less";
            isValid = false;
        }

        // Validate supplier_id
        if(isNaN(this.supplier_id)){
            errorMessages.supplier_id = "The supplier_id must be a number";
            isValid = false;
        }else if(this.supplier_id <= 0){
            errorMessages.supplier_id = "The supplier_id must be greater than 0";
            isValid = false;
        }

        // Validate cost
        if(isNaN(this.cost)){
            errorMessages.cost = "Cost must be a number";
            isValid = false;
        }else if(Number(this.cost) < 0){
            errorMessages.cost = "Cost must be 0 or greater";
            isValid = false;
        }

        // Validate amount_purchased
        if(!this.amount_purchased){
            errorMessages.amount_purchased = "Amount purchased is required";
            isValid = false;
        }else if(this.amount_purchased.length > 30){
            errorMessages.amount_purchased = "Amount purchased must be 30 characters or less";
            isValid = false;
        }

        return [isValid, errorMessages];
    }
}

module.exports = Ingredient;