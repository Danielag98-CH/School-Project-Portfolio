const { calculateAverageScore, calculateLetterGrade } = require("../modules/grading-helper");

describe("Sample Test", () => {

    test("should be false", () => {
        expect(5 > 6).toBe(false);
    })

    it("should be true", () => {
        const expectedResult = 2.5;
        const result = 10/4;
        expect(result).toBe(expectedResult);
        expect(result).toBeGreaterThan(2);
    })

    describe("calculateAverageScore()", () => {
        it("should return 80", () => {
            const scores = [80, 90, 70];
            expect(calculateAverageScore(scores)).toBe(80);
        })
    })

    describe("calculateLetterGrade()", () => {
        it("90 should return A", () => {
            expect(calculateLetterGrade(90)).toBe("A");
        })

        it("80 should return B", () => {
            expect(calculateLetterGrade(80)).toBe("B");
        })

        it("70 should return C", () => {
            expect(calculateLetterGrade(70)).toBe("C");
        })

        it("60 should return D", () => {
            expect(calculateLetterGrade(60)).toBe("D");
        })
    })

    describe("throwing error", () => {

        function sampleFunction(someNumber){
            if(isNaN(someNumber)){
                throw new Error("Invalid param");
            }
        }

        test("should throw error if param is not a number", () => {
            expect(() => sampleFunction("BLAH")).toThrow()
        })

    })

})