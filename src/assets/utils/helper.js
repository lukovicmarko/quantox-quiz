// This function will generate 5 random numbers between 0 and length of the json
// in this case from 0 to 34 (length is 35);
export const createRandomNumbers = (questions, number, givenNumber) => {
  let arr = [];
  while (arr.length < number) {
    let r = Math.floor(Math.random() * questions);
    if (givenNumber !== null) {
      if (givenNumber !== r) {
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    } else {
      if (arr.indexOf(r) === -1) arr.push(r);
    }
  }
  console.log("Random numbers for questions: ", arr);
  return arr;
};

// Shuffling the elements of the array => so we don't get the correct answer always on the same spot
export const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
