import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loadQuestions, setLocalStorageScores } from "../Redux/Actions";
import { createRandomNumbers, shuffle } from "../assets/utils/helper";
import Question from "./Question";
import Result from "./Result";
import LoaderSVG from "./Loader";

class QuestionsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfQuestions: 5,
      questions: null,
      currentQuestion: 0,
      answer: "",
      img: "",
      score: 0,
      disabled: true,
      isEnd: false,
      continents: [
        "Africa",
        "Asia",
        "South America",
        "North America",
        "Europe",
        "Oceania",
        "Antarctica"
      ],
      selectedAnswer: "",
      correctAnswer: false,
      generatedAnswers: null,
      animationQuestions: false
    };
  }
  componentDidMount() {
    this.props.loadQuestions();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.questions !== prevState.questions) {
      this._printTheQuestions();
    }
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this._printTheQuestions();
      this.setState({
        disabled: true,
        selectedAnswer: ""
      });
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      questions: nextProps.questions
    };
  }

  _printTheQuestions = () => {
    const continents = this.state.continents;
    let questions = this.state.questions;
    if (this.state.currentQuestion < this.state.numberOfQuestions) {
      // data from single question
      let answer = questions[this.state.currentQuestion].continent;
      let img = questions[this.state.currentQuestion].image;

      console.log("CORRECT ANSWER: ", answer);

      // create 2 random answers
      let generatedAnswers = this._generateAnswers(continents, answer);
      this.setState({
        img,
        generatedAnswers,
        answer
      });
      console.log("generatedAnswers: ", generatedAnswers);
    }
  };

  // check if the correct answer is contained in random answers
  // if it is, generate new answers and put them in the options
  // add the correct answer to them
  // shuffle that array => so the correct answer won't be last every time
  _generateAnswers = (continents, answer) => {
    let answers;

    let indexOfanswer = continents.indexOf(answer);
    answers = createRandomNumbers(continents.length, 2, indexOfanswer);

    let options = [];
    for (let i = 0; i < answers.length; i++) {
      options.push(continents[answers[i]]);
    }

    const possibilities = [...options, answer];
    const shuffledArray = shuffle(possibilities);

    return shuffledArray;
  };

  _handleAnswer = event => {
    let selectedAnswer = event.target.value;
    this.setState({
      selectedAnswer,
      disabled: false,
      correctAnswer: true,
      animationQuestions: false
    });
  };

  _handleNext = () => {
    if (this.state.currentQuestion < this.state.numberOfQuestions - 1) {
      if (this.state.answer === this.state.selectedAnswer) {
        this.setState({
          score: this.state.score + 750,
          currentQuestion: this.state.currentQuestion + 1
        });
      } else {
        this.setState({
          currentQuestion: this.state.currentQuestion + 1
        });
      }
    } else {
      if (this.state.answer === this.state.selectedAnswer) {
        // Redirect user to the RESULT page
        this.setState({
          score: this.state.score + 750,
          isEnd: true
        });
      } else {
        // Redirect user to the RESULT page
        this.setState({
          isEnd: true
        });
      }
    }
    this.setState({
      animationQuestions: true
    });
  };

  _getDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    date = day + "/" + month + "/" + year;
    return date;
  };

  _finnishTheQuiz = () => {
    let date = this._getDate();
    let json = { score: this.state.score, date: date };
    this.props.setLocalStorageScores(json);
    this.props.finnish();
  };

  render() {
    if (!this.state.isEnd) {
      return (
        <div
          className={
            this.state.animationQuestions
              ? "button__wrapper animation"
              : "button__wrapper"
          }
        >
          <h1>
            QUESTIONS {this.state.currentQuestion + 1} of{" "}
            {this.state.numberOfQuestions}
          </h1>
          {this.state.generatedAnswers !== null ? (
            <Question
              img={this.state.img}
              handleAnswer={this._handleAnswer}
              generatedAnswers={this.state.generatedAnswers}
              currentQuestion={this.state.currentQuestion}
              selectedAnswer={this.state.selectedAnswer}
              correctAnswer={this.state.correctAnswer}
              answer={this.state.answer}
            />
          ) : (
            <LoaderSVG />
          )}

          <button
            className={this.state.disabled ? "next__btn hide" : "next_btn"}
            onClick={this._handleNext}
          >
            NEXT
          </button>
        </div>
      );
    } else {
      return (
        <Result
          score={this.state.score}
          finnishTheQuiz={this._finnishTheQuiz}
        />
      );
    }
  }
}
const Questions = connect(
  state => ({
    questions: state.questions
  }),
  { loadQuestions, setLocalStorageScores }
)(QuestionsClass);

export default withRouter(Questions);
