import React, { Component } from "react";
import styles from "./../../assets/css/Login";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  WebView,
  Linking
} from "react-native";
import { Navigator } from "./../Navigator";
import { Header } from "react-native-elements";
import { Mobile } from "./Mobile";

export default class ShowOnline extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
    this.webView = null;
  }

  removeAllOrder() {
    var formData = new FormData();
    formData.append("type", "rmall");
    formData.append("number", Mobile["Call"].name);
    return fetch("http://roomarket.ir/LlIi1/user-order.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {})
      .catch(() => {
        Alert.alert("error");
      });
  }

  _onNavigationStateChange(webViewState) {
    if (webViewState.url.trim() == "return://roomarketfactorsuccess") {
      this.props.navigation.goBack();
      Alert.alert("پرداخت با موفقیت انجام شد");
      this.removeAllOrder();
      this.props.navigation.navigate("MainPage");
    } else if (webViewState.url.trim() == "return://roomarketfactorsuccess") {
      this.props.navigation.goBack();
      Alert.alert("پرداخت با موفقیت انجام نشد");
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: "پرداخت ", color: "white" }}
          backgroundColor="#95DE5F"
        />
        <WebView
          ref={webView => (this.webView = webView)}
          source={{
            uri:
              "http://factor.roomarket.ir/?number=" +
              Mobile["Call"].name +
              "&id=" +
              this.props.navigation.state.params.id
          }}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          startInLoadingState={true}
        />
      </View>
    );
  }
}
