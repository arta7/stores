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

export default class ShowPayment extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      credit: ""
    };
    this.webView = null;
  }

  Update() {
    var Data = new FormData();
    Data.append("number", Mobile["Call"].name);
    return fetch("http://roomarket.ir/PayForPayFor-pay/guc1.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: Data
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ credit: responseJson.result[0].credit });
      })
      .catch(error => {
        Alert.alert(error);
      });
  }

  _onNavigationStateChange(webViewState) {
    if (webViewState.url.trim() == "return://roomarketpaysuccess") {
      this.Update();
    }
  }
  render() {
    if (this.state.credit != "") {
      this.props.navigation.goBack();
      if (
        parseInt(this.state.credit, 10) >
        parseInt(this.props.navigation.state.params.lastCredit, 10)
      ) {
        Alert.alert("پرداخت با موفقیت انجام شد");
      } else {
        Alert.alert("پرداخت با خطا متوقف شد");
      }
    }
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
              "http://pay.roomarket.ir/?price=" +
              this.props.navigation.state.params.value +
              "&number=" +
              Mobile["Call"].name
          }}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          startInLoadingState={true}
        />
      </View>
    );
  }
}
