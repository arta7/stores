import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Mysoroush extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://sapp.ir/RoMarket_qom'}}
        style={{marginTop: 20}}
      />
    );
  }
}
