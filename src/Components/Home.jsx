import React from "react";

const Home = props => {
  return (
    <div className="home">
      <h1>Welcome to the Quantox Quiz</h1>
      <button
        className="btn__green start__btn"
        value="bestScore"
        onClick={props.click}
      >
        START
      </button>
    </div>
  );
};

export default Home;
