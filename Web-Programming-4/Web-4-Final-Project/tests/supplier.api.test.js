require("dotenv").config();
const supertest = require("supertest");
const app = require("../src/app.js");

const agent = supertest.agent(app);

describe("Supplier API Tests", () => {
  let newSupplierId;

  describe("GET /supplier", () => {
    it("should return 200 and a list of suppliers", async () => {
      const response = await agent.get("/supplier");
      expect(response.status).toBe(200);

      const supplier = response.body;
      expect(typeof supplier).toBe("object");
      expect(supplier.length >= 0).toBe(true);

      if (supplier.length > 0) {
        expect(supplier[0]).toHaveProperty("id");
        expect(supplier[0]).toHaveProperty("Name");
        expect(supplier[0]).toHaveProperty("email");
        expect(supplier[0]).toHaveProperty("phone");
      }
    });
  });

  describe("GET /supplier/:id", () => {
    it("should return the supplier by id", async () => {
      const response = await agent.get("/supplier/2");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 2);
      expect(response.body).toHaveProperty("Name", "Essential Oil Company");
      expect(response.body).toHaveProperty("email", "info@essentialoil.com");
      expect(response.body).toHaveProperty("phone", "1-971-512-1296");
    });

    it("should return 404 if supplier not found", async () => {
      const response = await agent.get("/supplier/888");
      expect(response.status).toBe(404);
    });
  });

  describe("POST /supplier", () => {
    it("should insert a new supplier and return 201 with the new id", async () => {
      const supplier = {
        Name: "API Test Supplier",
        email: "apitest@supplier.com",
        phone: "555-123-4567"
      };

      const response = await agent.post("/supplier").send(supplier);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      newSupplierId = response.body.id;
    });

    it("should return 400 if supplier is invalid", async () => {
      const invalidSupplier = {
        id: newSupplierId,
        Name: "",
        email: "invalid email",
        phone: ""
      };

      const response = await agent.post("/supplier").send(invalidSupplier);
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /supplier/:id", () => {
    // it("should return 400 if ids mismatch", async () => {
    //   const badUpdate = {
    //     id: newSupplierId + 1,
    //     name: "Mismatch",
    //     email: "mismatch@supplier.com",
    //     phone: "123"
    //   };

    //   const response = await agent.put(`/supplier/${newSupplierId}`).send(badUpdate);
    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toBe("failed - id mismatch");
    // });
    
    it("should update the supplier and return 200", async () => {
      const update = {
        id: newSupplierId,
        Name: "Updated Test Supplier",
        email: "updated@supplier.com",
        phone: "555-987-6543"
      };

      const response = await agent.put(`/supplier/${newSupplierId}`).send(update);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("success");
    });

  });

  describe("DELETE /supplier/:id", () => {
    it("should delete the inserted supplier and return 200", async () => {
      const response = await agent.delete(`/supplier/${newSupplierId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("success");
    });

    it("should return 400 for a non-existing supplier", async () => {
      const response = await agent.delete("/supplier/888");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("failed");
    });
  });
});
