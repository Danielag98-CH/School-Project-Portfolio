const Ingredient = require("../src/ingredient/ingredient.model");
const { getAll, getById, insert, update, remove } = require("../src/ingredient/ingredient.data.service");

describe("Ingredient Data Service", () => {
    describe("getAll()", () => {
        it("should return an array of ingredients with correct properties", async () => {
            const ingredients = await getAll();
            expect(Array.isArray(ingredients)).toBe(true);
            expect(ingredients.length).toBeGreaterThanOrEqual(0);

        if(ingredients.length > 0){
            expect(ingredients[0]).toHaveProperty("ingredient_id");
            expect(ingredients[0]).toHaveProperty("ingredient_name");
            expect(ingredients[0]).toHaveProperty("supplier_id");
            expect(ingredients[0]).toHaveProperty("cost");
            expect(ingredients[0]).toHaveProperty("amount_purchased");
        }
        });
    });

    describe("getById()", () => {
        it("should return a valid ingredient when given a valid ID", async () => {
            const ing = await getById(2);
            expect(ing).not.toBeNull();
            expect(ing).toHaveProperty("ingredient_id", 2);
            expect(ing).toHaveProperty("ingredient_name", "lavender essential oil");
            expect(ing).toHaveProperty("supplier_id", 1);
            expect(ing).toHaveProperty("amount_purchased", "25lbs");
            expect(typeof ing.cost === "number" || typeof ing.cost === "string").toBe(true);
        });

        it("should return null if no matching ID exists", async () => {
            const ing = await getById(111);
            expect(ing).toBeNull();
        });
    });

    describe("insert()", () => {
        it("should return new ID when a valid ingredient is inserted", async () => {
            const ingredientToInsert = new Ingredient({
                ingredient_id: 1001,
                ingredient_name: "Test Ingredient",
                supplier_id: 1,
                cost: 9.99,
                amount_purchased: "10oz"
        });

        const newId = await insert(ingredientToInsert);
            expect(newId).toBe(1001);

        const inserted = await getById(newId);
            expect(inserted).toHaveProperty("ingredient_id", 1001);
            expect(inserted).toHaveProperty("ingredient_name", "Test Ingredient");
            expect(inserted).toHaveProperty("supplier_id", 1);
            expect(inserted).toHaveProperty("amount_purchased", "10oz");
            expect(Number(inserted.cost)).toBeCloseTo(9.99, 2);
        });

        it("should throw error for null input", async () => {
            await expect(insert(null)).rejects.toThrow(/cannot be null/i);
        });

        it("should throw error for non-Ingredient input", async () => {
            await expect(insert("INVALID")).rejects.toThrow(/Invalid Ingredient/i);
        });

        it("should throw error for validation failure", async () => {
            const invalid = new Ingredient({
                ingredient_id: 1002,
                ingredient_name: "",          
                supplier_id: 0,                
                cost: -1,                      
                amount_purchased: ""           
        });
            await expect(insert(invalid)).rejects.toThrow(/Invalid Ingredient/i);
        });
    });

    describe("update()", () => {
        it("should return true for a successful update", async () => {
        // Insert first
            const toCreate = new Ingredient({
                ingredient_id: 1010,
                ingredient_name: "Before Update",
                supplier_id: 1,
                cost: 1.23,
                amount_purchased: "1oz"
        });
            await insert(toCreate);

        // Update fields
            const toUpdate = new Ingredient({
                ingredient_id: 1010,
                ingredient_name: "Updated Name",
                supplier_id: 1,
                cost: 2.34,
                amount_purchased: "2oz"
        });
            const result = await update(toUpdate);
            expect(result).toBe(true);

            const updated = await getById(1010);
            expect(updated.ingredient_name).toBe("Updated Name");
            expect(Number(updated.cost)).toBeCloseTo(2.34, 2);
            expect(updated.amount_purchased).toBe("2oz");
        });

        it("should throw error for invalid object", async () => {
            await expect(update("BAD")).rejects.toThrow(/Invalid parameter/i);
        });

        it("should throw error if no matching ID exists", async () => {
            const missing = new Ingredient({
                ingredient_id: 888,
                ingredient_name: "Does Not Exist",
                supplier_id: 1,
                cost: 1,
                amount_purchased: "1oz"
        });
            await expect(update(missing)).rejects.toThrow(/Ingredient not found/i);
        });
    });

    describe("remove()", () => {
        it("should return true for successful delete", async () => {
            const toCreate = new Ingredient({
                ingredient_id: 1020,
                ingredient_name: "To Delete",
                supplier_id: 1,
                cost: 3.21,
                amount_purchased: "3oz"
        });
            await insert(toCreate);

            const result = await remove(1020);
            expect(result).toBe(true);

            const after = await getById(1020);
            expect(after).toBeNull();
        });

        it("should return false for non-existing ID", async () => {
            const result = await remove(99);
            expect(result).toBe(false);
        });
    });
});
