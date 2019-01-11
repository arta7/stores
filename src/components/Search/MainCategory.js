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
  Dimensions,
  FlatList
} from "react-native";
import { Navigator } from "./../Navigator";
import SecondCategory from "./SecondCategory";

export default class MainCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    return fetch("http://roomarket.ir/LlIi1/OnlineShop.php")
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.contacts || []
          },
          function() {}
        );
      })
      .catch(error => {
        Alert.alert(error);
      });
  }

  onPressesButton(name, title) {
    {
      this.props.navigation.navigate("SecondCategory", {
        Name: name,
        Title: title
      });
    }
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
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#ecf0f1" }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={this.state.dataSource}
          numColumns={2}
          renderItem={rowData => {
            console.log(rowData);
            return (
              <View
                style={{
                  flex: 1
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    borderWidth: 3,
                    borderColor: "white",
                    marginLeft: "1%",
                    marginBottom: "2%",
                    marginTop: "1%"
                  }}
                  onPress={() =>
                    this.onPressesButton(rowData.item.site, rowData.item.name)
                  }
                >
                  <Image
                    source={{ uri: rowData.item.ax }}
                    style={{ width: "100%", height: 192, borderRadius: 10 }}
                    resizeMode="stretch"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
