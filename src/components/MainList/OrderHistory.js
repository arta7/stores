import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Slider,
  TouchableOpacity,
  TextInput,
  Alert,
  ListView,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { Header } from "react-native-elements";
import { Navigator } from "./../Navigator";

import { Mobile } from "./Mobile";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: "2",
      time: "",
      visible: true,
      type: "show",
      total: 0,
      results: [],
      products: []
    };
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append("number", Mobile["Call"].name);
    return fetch("http://roomarket.ir/LlIi1/last-orders.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.contacts || [])
        });
      })

      .catch(() => {
        Alert.alert("error");
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ paddingRight: 30 }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: "سابقه سفارش", color: "white" }}
          backgroundColor="#95DE5F"
        />
        <View style={{ flex: 1 }}>
          <ScrollView>
            {this.state.dataSource != null ? (
              <ListView
                dataSource={this.state.dataSource}
                renderRow={rowData => (
                  <View
                    style={{
                      width: "95%",

                      backgroundColor: "white",
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      marginTop: 10,
                      borderRadius: 10,
                      borderWidth: 1
                    }}
                  >
                    <View>
                      <View style={{ marginBottom: 30, paddingTop: 10 }}>
                        <Text
                          style={{
                            textAlign: "right",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            fontSize: 15,
                            marginBottom: 2,
                            marginRight: 15,
                            marginTop: 2
                          }}
                        >
                          {rowData.Ajnas}
                        </Text>
                      </View>

                      <View
                        style={{
                          bottom: 0,
                          width: "100%",
                          height: 50,
                          backgroundColor: "#95DE5F",
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            marginLeft: 35,
                            marginRight: 70,
                            justifyContents: "center",
                            paddingTop: 6,
                            flexDirection: "row",
                            alignItems: "center",
                            textAlign: "right"
                          }}
                        >
                          {rowData.price}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            flexDirection: "row",
                            justifyContents: "center",
                            paddingTop: 6,
                            alignItems: "center",
                            textAlign: "right"
                          }}
                        >
                          جمع کل :
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            ) : null}
          </ScrollView>
        </View>
      </View>
    );
  }
}
