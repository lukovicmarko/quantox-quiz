import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import "./assets/css/style.css";
import Logo from "./assets/images/google-pixel.png";

import { setLocalStorageScores, initialLocalStorage } from "./Redux/Actions";

import Home from "./Components/Home";
import Header from "./Components/Header";
import BestScores from "./Components/BestScores";
import Questions from "./Components/Questions";

class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "home",
      questions: null,
      animation: false
    };
  }
  componentDidMount() {
    this._loadSoresFromLocalStorage();
  }
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem("scores", JSON.stringify(this.props.scores));
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      questions: nextProps.questions
    };
  }
  _loadSoresFromLocalStorage = () => {
    let getScores = localStorage.getItem("scores");
    let getScoresJSON = JSON.parse(getScores);
    // if localstorage is empty show all 0;
    if (getScoresJSON !== null) {
      this.props.setLocalStorageScores(getScoresJSON);
    } else {
      this.props.initialLocalStorage();
    }
  };
  _click = event => {
    const btn = event.target.value;
    this.setState({
      currentView: btn,
      animation: true
    });
  };
  _returnToHomeScreen = () => {
    this.setState({
      currentView: "home"
    });
  };
  render() {
    const currentView = this.state.currentView;
    return (
      <div className={`container ${this.state.currentView}`}>
        <div
          className={
            this.state.animation
              ? "content__wrapper animation"
              : "content__wrapper"
          }
        >
          <div className="content_inner__wrapper">
            <Header title="CONTENT QUIZ" />
            <div className="wrapper">
              {currentView === "home" && (
                <Home click={event => this._click(event)} />
              )}
              {currentView === "bestScore" && (
                <BestScores
                  bestScores={this.props.scores}
                  click={event => this._click(event)}
                />
              )}
              {currentView === "questions" && (
                <Questions
                  finnish={this._returnToHomeScreen}
                  click={event => this._click(event)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const App = connect(
  state => ({ scores: state.scores }),
  { setLocalStorageScores, initialLocalStorage }
)(AppClass);

export default withRouter(App);
