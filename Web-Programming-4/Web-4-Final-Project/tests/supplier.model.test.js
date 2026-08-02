const Supplier = require("../src/supplier/supplier.model");

describe ("Supplier Model", () => {
    
  describe("Constructor", () => {

    it("should set the instance variables properly", ()=>{
        const supplier = new Supplier({id:1, Name:"Bramble Berry", email: "Support@BrambleBerry.com", phone: "1-800-647-5285"});
        expect(supplier.id).toBe(1);
        expect(supplier.Name).toBe("Bramble Berry");
        expect(supplier.email).toBe("Support@BrambleBerry.com");
        expect(supplier.phone).toBe("1-800-647-5285");
    });

  });

  describe("validate()", () => {
    it("should pass with valid data", () => {
      const supplier = new Supplier({id: 1, Name: "Bulk Apothecary", email: "support@bulkapothecary.com", phone: "1-800-123-4567"});
      const [isValid, errors] = supplier.validate();
      expect(isValid).toBe(true);
      expect(errors).toEqual({});
    });

    it("should fail if name is missing", () => {
      const supplier = new Supplier({id: 1, Name: "", email: "test@example.com", phone: "1-800-123-8767"});
      const [isValid, errors] = supplier.validate();
      expect(isValid).toBe(false);
      expect(errors).toHaveProperty("Name", "Name is required");
    });

    it("should fail if email is missing", () => {
      const supplier = new Supplier({id: 1, Name: "Test Supplier", email: "", phone: "1-800-123-8767"});
      const [isValid, errors] = supplier.validate();
      expect(isValid).toBe(false);
      expect(errors).toHaveProperty("email", "Email is required");
    });

    it("should fail if email is invalid", () => {
      const supplier = new Supplier({id: 1, Name: "Test Supplier", email: "test-email", phone: "1-800-123-8767"});
      const [isValid, errors] = supplier.validate();
      expect(isValid).toBe(false);
      expect(errors).toHaveProperty("email", "Email is not valid");
    });

    it("should fail if phone is missing", () => {
      const supplier = new Supplier({id: 1, Name: "Test Supplier", email: "test@example.com", phone: ""});
      const [isValid, errors] = supplier.validate();
      expect(isValid).toBe(false);
      expect(errors).toHaveProperty("phone", "Phone is required and must be 20 characters or less");
    });
  });
});