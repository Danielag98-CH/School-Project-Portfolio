/**
Takes a test score (a number) as a parameter, and returns a letter grade.
The letter grade should be determined by the score like so:
90 - 100 should return "A"
80 - 89 should return "B"
70 - 79 should return "C"
60 - 69 should return "D"
A score lower than 60 should return "F"

@param {number} score       The score to be converted into a letter grade
@return {string}            The letter grade for the score
*/

function calculateLetterGrade(score){
    if(score >= 90){
        return "A";
    }else if(score >= 80){
        return "B";
    }else if(score > 70){
        return "C";
    }else if(score > 60){
        return "D"
    }else{
        return "F"
    }
}

/**
Takes an array of test scores (numbers) and returns the average for them.

@param {array<number>} scores     The array of scores to be used in
                                  calculating the average

@return {number}                  The average of the scores
*/
function calculateAverageScore(scores){
  let total = 0;
  scores.forEach(s => total += s);
  return total/scores.length;
}

exports.calculateLetterGrade = calculateLetterGrade
exports.calculateAverageScore = calculateAverageScore