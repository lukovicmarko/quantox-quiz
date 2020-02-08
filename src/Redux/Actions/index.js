import { QUESTIONS, SCORES } from "../Constants/action-types";
import { api } from "../../assets/utils/api";
import { createRandomNumbers } from "../../assets/utils/helper";

// Function loads 5 radnom questions
// (depending on randomly created numbers in the _createRandomNumbers function)
// from JSON response, and puts it in the store.
export const loadQuestions = () => {
  return dispatch => {
    return fetch(api.dummy())
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json);
        let random = createRandomNumbers(json.length, 5, null);
        console.log("random numbers: ", random);
        let questions = random.map(key => {
          return json[key];
        });
        Promise.all(questions).then(complited => {
          dispatch({
            type: QUESTIONS,
            payload: complited
          });
          console.log("COMPLITED: ", complited);
        });
      })
      .catch(error => console.error(error));
  };
};

export const setLocalStorageScores = json => {
  //let json = { score: score, date: date };
  return dispatch => {
    dispatch({
      type: SCORES,
      payload: json
    });
  };
};

export const initialLocalStorage = () => {
  let obj = [
    { score: 0, date: 0 },
    { score: 0, date: 0 },
    { score: 0, date: 0 }
  ];
  return dispatch => {
    dispatch({
      type: SCORES,
      payload: obj
    });
  };
};
