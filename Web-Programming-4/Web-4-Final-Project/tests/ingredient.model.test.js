
const Ingredient = require("../src/ingredient/ingredient.model");

describe("Ingredient Model", () => {
    
    describe("Constructor", () => {
        it("should set the instance variables properly", () => {
            const ing = new Ingredient({
                ingredient_id: 2,
                ingredient_name: "lavender essential oil",
                supplier_id: 1,
                cost: 1478.78,
                amount_purchased: "25lbs"
        });

            expect(ing.ingredient_id).toBe(2);
            expect(ing.ingredient_name).toBe("lavender essential oil");
            expect(ing.supplier_id).toBe(1);
            expect(ing.cost).toBe(1478.78);
            expect(ing.amount_purchased).toBe("25lbs");
        });
    });

     describe("validate()", () => {
        it("should pass with valid data", () => {
            const ing = new Ingredient({
                ingredient_id: 1,
                ingredient_name: "bees wax",
                supplier_id: 4,
                cost: 287.79,
                amount_purchased: "55lbs"
        });
            const [isValid, errors] = ing.validate();
            expect(isValid).toBe(true);
            expect(errors).toEqual({});
        });

        it("should fail if ingredient_name is missing", () => {
            const ing = new Ingredient({
                ingredient_id: 1,
                ingredient_name: "",
                supplier_id: 1,
                cost: 10,
                amount_purchased: "1lb"
        });
            const [isValid, errors] = ing.validate();
            expect(isValid).toBe(false);
            expect(errors).toHaveProperty("ingredient_name", "Ingredient name is required");
        });

        it("should fail if supplier_id is not a positive number", () => {
            const ing = new Ingredient({
                ingredient_id: 1,
                ingredient_name: "cocoa butter",
                supplier_id: 0,
                cost: 565.95,
                amount_purchased: "55lbs"
        });
            const [isValid, errors] = ing.validate();
            expect(isValid).toBe(false);
            expect(errors).toHaveProperty("supplier_id", "The supplier_id must be greater than 0");
        });

        it("should fail if cost is negative or not a number", () => {
            const error1 = new Ingredient({
                ingredient_id: 1,
                ingredient_name: "rosehip oil",
                supplier_id: 2,
                cost: -1,
                amount_purchased: "1gal"
        });
            const [v1, e1] = error1.validate();
            expect(v1).toBe(false);
            expect(e1).toHaveProperty("cost", "Cost must be 0 or greater");

            const error2 = new Ingredient({
                ingredient_id: 1,
                ingredient_name: "rosehip oil",
                supplier_id: 2,
                cost: "abc",
                amount_purchased: "1gal"
        });
            const [v2, e2] = error2.validate();
            expect(v2).toBe(false);
            expect(e2).toHaveProperty("cost", "Cost must be a number");
        });

        it("should fail if amount_purchased is missing", () => {
            const ing = new Ingredient({
                ingredient_id: 1,
                ingredient_name: "jojoba oil",
                supplier_id: 1,
                cost: 12.34,
                amount_purchased: ""
        });
            const [isValid, errors] = ing.validate();
            expect(isValid).toBe(false);
            expect(errors).toHaveProperty("amount_purchased", "Amount purchased is required");
        });

        it("should fail if ingredient_id is negative or not a number", () => {
            const error1 = new Ingredient({
                ingredient_id: -5,
                ingredient_name: "shea butter",
                supplier_id: 3,
                cost: 99.99,
                amount_purchased: "5lb"
        });
            const [v1, e1] = error1.validate();
            expect(v1).toBe(false);
            expect(e1).toHaveProperty("ingredient_id", "The ingredient_id must be 0 or greater");

        const error2 = new Ingredient({
            ingredient_id: NaN,
            ingredient_name: "shea butter",
            supplier_id: 3,
            cost: 99.99,
            amount_purchased: "5lb"
        });
            const [v2, e2] = error2.validate();
            expect(v2).toBe(false);
            expect(e2).toHaveProperty("ingredient_id", "The ingredient_id must be a number");
        });
    });
});
