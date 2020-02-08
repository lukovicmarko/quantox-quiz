import React from "react";

const Result = props => {
  const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <div className="results">
      <div className="header">
        <h1>RESULTS</h1>
      </div>
      <div className="results__content">
        <i className="material-icons">category</i>
        <h2>Your Score</h2>
        <h1 className="score">{formatNumber(props.score)} pts</h1>
        <button className="finnish__btn" onClick={props.finnishTheQuiz}>
          FINNISH
        </button>
      </div>
    </div>
  );
};

export default Result;
