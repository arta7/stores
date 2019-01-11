import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Mytelegram extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://t.me/Romarket_qom'}}
        style={{marginTop: 20}}
      />
    );
  }
}
