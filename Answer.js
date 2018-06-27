import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Question extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.text}</Text>

        // loop answer here
        this.props.answers.map(answer => {
          <Answer
            answer={answer}
            onProess={this.props.buttonClicked}
          />
        });

        <Button
          onPress={this.props.buttonClicked}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
