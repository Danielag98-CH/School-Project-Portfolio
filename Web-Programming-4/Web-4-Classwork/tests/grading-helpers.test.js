const {calculateAverageScore, calculateLetterGrade} = require("../modules/grading-helpers")


describe("Grading Helpers Test", () => {
    describe('calculateAverageScore()', () => { 
        test('Should return the expected value', () => { 
            const scores = [80, 90, 70];
            const result = calculateAverageScore(scores);
            const expectedResult = 80;
            expect(result).toBe(expectedResult);
            expect(calculateAverageScore([95,85,90])).toBe(90);
        })

        test("should round up the decimal to a whole number", () => {
            expect(calculateAverageScore([80, 90, 71])).toBe(81);
        })

        test("should throw error if the param is invalid", () => {
            expect(() => {calculateAverageScore([])}).toThrow(/Array must not be empty/)
        })
     })

    describe('calculateLetterGrade()', () => {
        
    })
})