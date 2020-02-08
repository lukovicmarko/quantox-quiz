import React from "react";

const Question = props => {
  return (
    <div className="question">
      <div key={props.currentQuestion}>
        <img src={props.img} alt="" />
        <div className="answer__btn_wrapper">
          {props.generatedAnswers.map(index => {
            return (
              <button
                className={
                  props.selectedAnswer === index
                    ? "answer__btn active"
                    : "answer__btn"
                }
                key={index}
                value={index}
                data-correct={props.answer === index ? true : false}
                data-submited={props.selectedAnswer.length !== 0 ? true : false}
                onClick={props.handleAnswer}
              >
                <i className="material-icons">category</i>
                <span>{index}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
