import React, { Component } from 'react';
import { Linking } from 'react-native';

export default class tameshk extends Component {
  render() {
    return (
     Linking.openURL('http://www.tameshkgroup.com')
    );
  }
}