import React, { Component } from "react";
import {
  View,
  ListView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
  Dimensions
} from "react-native";
import { Header } from "react-native-elements";
import SearchBar from "react-native-searchbar";
import { Navigator } from "./../Navigator";
import { Mobile } from "./Mobile";

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isCom: false,
      value: "",
      visible: true,
      fav: "",
      type: "",
      results: []
    };
  }

  filterImage(address) {
    if (AsyncStorage.getItem("Address") == address.trim()) {
      return (
        <Image
          source={require("./../../assets/Image/flashsabz.png")}
          style={{ width: 20, height: 20, marginRight: 3 }}
          resizeMode="stretch"
        />
      );
    }

    return (
      <Image
        source={require("./../../assets/Image/flashsiah.png")}
        style={{ width: 20, height: 20, marginRight: 3 }}
        resizeMode="stretch"
      />
    );
  }
  setAddress(address) {
    AsyncStorage.setItem("Address", address);
    return this.componentDidMount();
  }

  removeAddress(mobile, address) {
    return fetch(
      "http://roomarket.ir/LlIi1/rm-address.php?number=" +
        mobile +
        "&address=" +
        address
    )
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.componentDidMount();
      })
      .catch(error => {
        Alert.alert(error);
      });
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append("number", Mobile["Call"].name);
    return fetch("http://roomarket.ir/LlIi1/get-address1.php", {
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
          dataSource: ds.cloneWithRows(responseJson.result || []),
          results: responseJson.result
        });
      })
      .catch(error => {
        Alert.alert(error);
      });
  }

  render() {
    if (this.state.isCom) {
      this.componentDidMount();
      this.setState({
        isCom: false
      });
    }
    if (this.state.isLoading) {
      return (
        <View style={{ paddingRight: 30 }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: "آدرس ها", color: "white" }}
          backgroundColor="#95DE5F"
        />

        <ScrollView>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <View
                style={{
                  width: "95%",
                  // height:305,
                  backgroundColor: "white",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 10,
                  borderWidth: 1
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 60,
                    backgroundColor: "white",
                    marginBottom: 5,
                    marginRight: 3,
                    marginLeft: 3
                  }}
                >
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: "row",
                      justifyContent: "flex-start"
                    }}
                  >
                    <TouchableOpacity
                      style={{ borderRadius: 5, marginTop: 2 }}
                      onPress={() => {
                        this.removeAddress(
                          Mobile["Call"].name,
                          rowData.address
                        );
                      }}
                    >
                      <Image
                        source={require("./../../assets/Image/trash.png")}
                        style={{ width: 20, height: 20, marginRight: 3 }}
                        resizeMode="stretch"
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 2.5,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "flex-end"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        justifyContents: "flex-end",
                        alignItems: "flex-end",
                        textAlign: "right"
                      }}
                    >
                      {rowData.address}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: "row",
                      justifyContent: "flex-end"
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginRight: 10, borderRadius: 5, marginTop: 2 }}
                      onPress={() => {
                        this.setAddress(rowData.address);
                      }}
                    >
                      {this.filterImage(rowData.address)}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContents: "center"
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderColor: "#00a8ff",
              borderWidth: 1,
              width: "60%",
              height: 40,
              marginBottom: 10,
              marginLeft: "22%",
              backgroundColor: "white"
            }}
            onPress={() => {
              this.props.navigation.navigate("addAddress", { ScreenA: this });
            }}
          >
            <Text
              style={{
                fontSize: 13,
                justifyContents: "center",
                alignItems: "center",
                textAlign: "center",
                paddingTop: 10,
                color: "black"
              }}
            >
              آدرس جدید
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
