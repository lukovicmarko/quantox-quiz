import React from "react";

const BestScores = props => {
  const printScores = () => {
    const scores = props.bestScores;

    let date = scores.map((index, key) => {
      return (
        <div key={key} className="best__score_single row">
          <div className="col-3s">
            <span className="best__score_place"># {key + 1}</span>
          </div>
          <div className="best__score_single_wrapper col-8">
            <div className="row">
              <div className="best__score_date  col-12">
                <h2>{index.date}</h2>
              </div>
              <span className="best__score_result  col-12">
                <h1>{index.score} pts</h1>
              </span>
            </div>
          </div>
        </div>
      );
    });
    return date;
  };
  return (
    <div className="best__score">
      <h1>Your Score</h1>
      <div className="best__score_wrapper">{printScores()}</div>
      <div className="best__score_btn_wrapper">
        <button
          className="home__btn"
          value="home"
          onClick={event => props.click(event)}
        >
          <i className="material-icons">home</i>
        </button>
        <button
          className="btn__green"
          value="questions"
          onClick={event => props.click(event)}
        >
          <i className="material-icons">category</i>
          <span>PLAY</span>
        </button>
      </div>
    </div>
  );
};

export default BestScores;
