const Supplier = require("../src/supplier/supplier.model");
const { getAll, getById, insert, update, remove } = require("../src/supplier/supplier.data.service");

describe("Supplier Data Service", () => {

    describe("getAll()", () => {
        it("should return an array of suppliers with correct properties", async () => {
            const suppliers = await getAll();
            expect(suppliers[0]).toHaveProperty("id");
            expect(suppliers[0]).toHaveProperty("Name");
            expect(suppliers[0]).toHaveProperty("email");
            expect(suppliers[0]).toHaveProperty("phone");
        });
    });

    describe("getById()", () => {
        it("should return a valid supplier when given a valid ID", async () => {
            const supplier = await getById(1);
            expect(supplier).toHaveProperty("id", 1);
            expect(supplier).toHaveProperty("Name", "Bramble Berry");
            expect(supplier).toHaveProperty("email", "Support@BrambleBerry.com");
            expect(supplier).toHaveProperty("phone", "1-800-647-5285");
        });

        it("should return null if no matching ID exists", async () => {
            const supplier = await getById(1111111);
            expect(supplier).toBe(null);
        });

    });

    describe("insert()", () => {
        it("should return new ID when a valid supplier is inserted", async () => {
            const supplierToInsert = new Supplier({ Name: "Test Supplier", email: "test@supplier.com", phone: "1-800-555-8734" });
            const supplierId = await insert(supplierToInsert);
            expect(supplierId).toBeGreaterThan(0);

            const insertedSupplier = await getById(supplierId);
            expect(insertedSupplier).toHaveProperty("id", supplierId);
            expect(insertedSupplier).toHaveProperty("Name", "Test Supplier");
            expect(insertedSupplier).toHaveProperty("email", "test@supplier.com");
            expect(insertedSupplier).toHaveProperty("phone", "1-800-555-8734");
        });

        it("should throw error for null input", async () => {
            await expect(insert(null)).rejects.toThrow(/cannot be null/);
        });

        it("should throw error for non-Supplier input", async () => {
            await expect(insert("INVALID")).rejects.toThrow(/Invalid Supplier/);
        });

        it("should throw error for validation failure", async () => {
            const invalidSupplier = new Supplier({ Name: "", email: "notanemail", phone: "" });
            await expect(insert(invalidSupplier)).rejects.toThrow(/Invalid Supplier/);
        });
    });

    describe("update()", () => {
        it("should return true for a successful update", async () => {
            const updateToSupplier = new Supplier({ Name: "Before Update", email: "before@example.com", phone: "123" });
            const id = await insert(updateToSupplier);
            const toUpdate = new Supplier({ id, Name: "Updated Name", email: "updated@email.com", phone: "987-6543" });
            const result = await update(toUpdate);
            expect(result).toBe(true);

            const updated = await getById(id);
            expect(updated.Name).toBe("Updated Name");
        });

        it("should throw error for invalid object", async () => {
            await expect(update("BAD")).rejects.toThrow(/Invalid parameter/);
        });

        it("should throw error if no matching ID exists", async () => {
            const bad = new Supplier({ id: 888, Name: "xx", email: "xx@xx.com", phone: "123" });
            await expect(update(bad)).rejects.toThrow(/Supplier not found/);
        });
    });

    describe("remove()", () => {
        it("should return true for successful delete", async () => {
            const supplierToRemove = new Supplier({ Name: "To Delete", email: "delete@me.com", phone: "555" });
            const supplierRId = await insert(supplierToRemove);
            const resultR = await remove(supplierRId);
            expect(resultR).toBe(true);
        });

        it("should return false for non-existing ID", async () => {
            const resultR = await remove(888);
            expect(resultR).toBe(false);
        });
    });

});
