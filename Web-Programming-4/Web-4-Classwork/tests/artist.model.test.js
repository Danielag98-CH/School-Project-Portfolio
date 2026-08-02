const Artist = require("../modules/artist.model");

describe("Artist Model", () => {

  describe("Constructor", () => {

    it("should set the instance variables properly", ()=>{
      const artist = new Artist({id:1, name:"Taylor Swift", birthDate:"2001-01-21"});
      expect(artist).toHaveProperty("id", 1);
      expect(artist).toHaveProperty("name", "Taylor Swift");
      expect(artist).toHaveProperty("birthDate", "2001-01-21")
    })

    it("id should default to 0 if not included in param", ()=>{
      const artist = new Artist({});
      expect(artist).toHaveProperty("id", 0);
    })

    it("name should default to empty string if not included in param", ()=>{
      const artist = new Artist({});
      expect(artist).toHaveProperty("name", "");
    })

    it("birthDate should default to NaN if not included in param", ()=>{
      const artist = new Artist({});
      expect(artist).toHaveProperty("birthDate", NaN);
    })

  }) // end of constructor tests

  describe("validate()", () => {

    it("should return proper values if all properties are valid", () => {
      const artist = new Artist({id:1, name:"Taylor Swift", birthDate: "2001-01-21"});
      const [isValid, errs] = artist.validate();
      expect(isValid).toBe(true);
      expect(errs).toEqual({});
    })

    it("should return proper values if the id property is not a number", () => {
      let artist = new Artist({id:"1", name:"Taylor Swift", birthDate: "2001-01-21"});// invalid id, must be a number
      let [isValid, errs] = artist.validate();
      expect(isValid).toBe(false);
      expect(errs).toHaveProperty("id", "The artist id must be a number");
    })

    it("should return proper values if the id property is not greater than 0", () => {
      let artist = new Artist({id:-8, name:"Taylor Swift", birthDate: "2001-01-21"}); // invalid id - less than 0
      let [isValid, errs] = artist.validate();
      expect(isValid).toBe(false);
      expect(errs).toHaveProperty("id", "The artist id must be 0 or greater");
    })

    it("should return proper values if the name property is not a string", () => {
      let artist = new Artist({id:1, name:9, birthDate: "2001-01-21"}); // invalid name, not a string
      let [isValid, errs] = artist.validate();
      expect(isValid).toBe(false);
      expect(errs).toHaveProperty("name", "The artist name must be a string");
    })

    it("should return proper values if the name property is an empty string", () => {
      let artist = new Artist({id:1, name:"", birthDate: "2001-01-21"}); // invalid name, empty string
      let [isValid, errs] = artist.validate();
      expect(isValid).toBe(false);
      expect(errs).toHaveProperty("name", "The artist name is required");
    })

    it("should return proper values if the name property is more than 120 characters", () => {
      const someName = "x".repeat(121); // invalid name, more than 120 characters
      let artist = new Artist({id:1, name: someName, birthDate: "2001-01-21"});
      let [isValid, errs] = artist.validate();
      expect(isValid).toBe(false);
      expect(errs).toHaveProperty("name", "The artist name must be 120 characters or less");
    })

    it("should return proper values if the birthDate property is not a valid date", () => {
      let artist = new Artist({id:1, name:"Taylor Swift", birthDate: "XXXX"});// invalid birthDate!!
      let [isValid, errs] = artist.validate();
      expect(isValid).toBe(false);
      expect(errs).toHaveProperty("birthDate", "The artist birthday is not a valid date");
    })

    it("should return proper values if the birthDate property is before 1900", () => {
      let artist = new Artist({id:1, name:"Taylor Swift", birthDate: "1899-1-1"});// invalid birthDate - BEFORE 1900
      let [isValid, errs] = artist.validate();
      expect(isValid).toBe(false);
      expect(errs).toHaveProperty("birthDate", "The artist birthday cannot be before 1900");
    })

    it("should return proper values if the birthDate property is later than the current date", () => {
      const currentDate = new Date();
      const futureDate = new Date().setFullYear(currentDate.getFullYear() + 1);
      let artist = new Artist({id:1, name:"Taylor Swift", birthDate: futureDate});// invalid birthDate - after the current date
      let [isValid, errs] = artist.validate();
      expect(isValid).toBe(false);
      expect(errs).toHaveProperty("birthDate", "The artist birthday cannot be in the future");
    })

  }) // end of validate() tests

})