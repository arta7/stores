import React, { Component } from 'react';
import { Linking } from 'react-native';

export default class Tameshkins extends Component {
  render() {
    return (
     Linking.openURL('http://www.instagram.com/tameshkgroup')
    );
  }
}