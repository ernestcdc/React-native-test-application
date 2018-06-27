import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import JSONData from './sample.json';

let {text:question, answers:options, correct:answer} = JSONData.questions[0];
const initialState = {
  question,
  options,
  answer,
  correctAnswers: 0,
  questionNo: 0,
  percentage: 0,
  isFinished: false
}

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onOptionClicked = (option) => {
    let correctAnswers = option === this.state.options[this.state.answer]? this.state.correctAnswers + 1 : this.state.correctAnswers,
        questionNo = this.state.questionNo + 1;

    if (questionNo < JSONData.questions.length) {
      let {text:question, answers:options, correct:answer} = JSONData.questions[questionNo];
      this.setState({
        question,
        options,
        answer,
        correctAnswers,
        questionNo
      });
    }
    else if (questionNo === JSONData.questions.length) {
      this.setState({ isFinished: true, percentage: (correctAnswers/JSONData.questions.length) * 100});
    }
  }

  goBackClicked = () => {
    this.setState(initialState);
  }

  render() {
    const options = this.state.options.map((option, index) => {
      return (
        <View key={index} style={styles.buttonStyle}>
          <Button
            onPress={e => this.onOptionClicked(option)}
            title={option}
            color="#11b8f9"
          />
        </View>
      );
    });
    const questions = <View>
      <Text>{`
        ${this.state.questionNo+1}. ${this.state.question}
      `}</Text>;
      {options}
    </View>
    const finishedView = <View>
      <Text>{`
      You have successfully completed the test.

      Percentage of correctly answered questions: ${this.state.percentage}%
      `}</Text>
      <View>
        <Button
          onPress={this.goBackClicked}
          title="Go back"
          color="#11b8f9"
        />
      </View>
    </View>;
    let isFinished = this.state.isFinished;

    return (
      <View>
        { isFinished? finishedView : questions }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 4,
    marginBottom: 4,
  },
});
