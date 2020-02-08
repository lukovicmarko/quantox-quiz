import { RESET_STATE, QUESTIONS, SCORES } from "../Constants/action-types";

const initialState = {
  questions: null,
  scores: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE: {
      return initialState;
    }
    case QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload
      });
    case SCORES:
      return Object.assign({}, state, {
        scores: state.scores
          .concat(action.payload)
          .sort((a, b) => {
            return b.score - a.score;
          })
          .slice(0, 3)
      });

    default:
      break;
  }
  return state;
}
export default rootReducer;
