const {calculateLetterGrade, calculateAverageScore} = require('../modules/grading-helper');

console.log(calculateLetterGrade(93));

const testScores = [90, 80];
console.log(calculateAverageScore(testScores));