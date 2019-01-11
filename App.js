import React, { Component } from 'react';
import { Text, View, StyleSheet,Linking } from 'react-native';
import { Navigator } from './src/components/Navigator';

export default class App extends Component {


  render() {
    return ( <Navigator />);
  }
}
