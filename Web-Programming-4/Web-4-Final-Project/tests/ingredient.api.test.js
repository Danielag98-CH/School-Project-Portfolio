require("dotenv").config();
const supertest = require("supertest");
const app = require("../src/app.js");

const agent = supertest.agent(app);

describe("Ingredient API Tests", () => {
    
    let newIngredientId;

    describe("GET /ingredient", () => {
        it("should return 200 and a list of ingredients", async () => {
            const response = await agent.get("/ingredient");
            expect(response.status).toBe(200);

            const ingredients = response.body;
            expect(typeof ingredients).toBe("object");
            expect(ingredients.length >= 0).toBe(true);

            if(ingredients.length > 0){
                expect(ingredients[0]).toHaveProperty("ingredient_id");
                expect(ingredients[0]).toHaveProperty("ingredient_name");
                expect(ingredients[0]).toHaveProperty("supplier_id");
                expect(ingredients[0]).toHaveProperty("cost");
                expect(ingredients[0]).toHaveProperty("amount_purchased");
            }
            });
    });

    describe("GET /ingredient/:id", () => {
        it("should return the ingredient by id", async () => {
            const response = await agent.get("/ingredient/2");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("ingredient_id", 2);
            expect(response.body).toHaveProperty("ingredient_name", "lavender essential oil");
            expect(response.body).toHaveProperty("supplier_id", 1);
            expect(response.body).toHaveProperty("cost");
            expect(response.body).toHaveProperty("amount_purchased", "25lbs");
        });

        it("should return 404 if ingredient not found", async () => {
            const response = await agent.get("/ingredient/888");
            expect(response.status).toBe(404);
        });
    });

    describe("POST /ingredient", () => {
        it("should insert a new ingredient and return 201 with the new id", async () => {
            const test = {
                ingredient_id: 99,
                ingredient_name: "API Test Ingredient",
                supplier_id: 1,
                cost: 12.34,
                amount_purchased: "10oz"
        };

        const response = await agent.post("/ingredient").send(test);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id", 99);
            newIngredientId = response.body.id;
        });

        it("should return 400 if ingredient is invalid", async () => {
            const invalid = {
                ingredient_id: newIngredientId,
                ingredient_name: "",
                supplier_id: 0,
                cost: -1,
                amount_purchased: ""
        };

        const response = await agent.post("/ingredient").send(invalid);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "failed - invalid");
            expect(response.body).toHaveProperty("errors");
        });
    });

    describe("PUT /ingredient/:id", () => {
        it("should update the ingredient and return 200", async () => {
            const update = {
                ingredient_id: newIngredientId,
                ingredient_name: "Updated API Test Ingredient",
                supplier_id: 1,
                cost: 23.45,
                amount_purchased: "12oz"
        };

        const response = await agent.put(`/ingredient/${newIngredientId}`).send(update);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("success");
        });

        it("should return 400 if ids mismatch", async () => {
            const badUpdate = {
                ingredient_id: newIngredientId + 1, 
                ingredient_name: "Mismatch",
                supplier_id: 1,
                cost: 1,
                amount_purchased: "1oz"
        };

        const response = await agent.put(`/ingredient/${newIngredientId}`).send(badUpdate);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("failed - id mismatch");
        });
    });

    describe("DELETE /ingredient/:id", () => {
        it("should delete the inserted ingredient and return 200", async () => {
            const response = await agent.delete(`/ingredient/${newIngredientId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("success");
        });

        it("should return 400 for a non-existing ingredient", async () => {
            const response = await agent.delete("/ingredient/888");
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("failed");
        });
    });
});