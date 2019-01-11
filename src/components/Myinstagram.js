import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Myinstagram extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://www.instagram.com/RoMarket_qom/'}}
        style={{marginTop: 20}}
      />
    );
  }
}
