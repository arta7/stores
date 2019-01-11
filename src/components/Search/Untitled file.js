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
  Dimensions
} from "react-native";
import { Header } from "react-native-elements";
import SearchBar from "react-native-searchbar";

export default class SearchCategoryStatic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: "",
      visible: true,

      results: [],
      input: ""
    };
    this.arrayholder = [];

    this.searchFilterFunction = this.searchFilterFunction.bind(this);
  }

  _cancelControl() {
    this.setState({ visible: !this.state.visible });
    if (!this.state.visible) {
      this.searchBar.hide();
    } else {
      this.searchBar.show();
    }
  }

  _handleResults(results) {
    this.setState({ results });
  }

  searchFilterFunction(input) {
    //passing the inserted text in textinput
    this.setState({
      value: input,
      visible: this.state.visible
    });
    this.componentDidMount();
  }

  componentDidMount() {
    return fetch(
      "http://roomarket.ir/LlIi1/search.php?text=" +
        this.props.navigation.state.params.Name
    )
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.result || [])
        });
      })
      .catch(error => {
        Alert.alert("" + error);
      });
  }

  handleQueryChange(text) {
    this.setState({
      value: text
    });
  }

  render() {
    var ImageShow;
    {
      this.state.visible
        ? (ImageShow = (
            <Image
              source={require("./../../assets/Image/Search.png")}
              style={{ width: 25, height: 25, marginRight: 5 }}
            />
          ))
        : (ImageShow = null);
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
          centerComponent={{ text: this.props.navigation.state.params.Name }}
          backgroundColor="#b8e994"
        />

        <ScrollView>
          <ListView
            contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <View
                style={{
                  width: "43%",
                  // height:305,
                  backgroundColor: "white",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  marginTop: 10
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("./../../assets/Image/Roban.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 20,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white"
                    }}
                  >
                    {rowData.ext1}
                  </Text>
                </View>
                <Image
                  source={{ uri: rowData.ax }}
                  style={{ width: "100%", height: 100, marginBottom: 5 }}
                  resizeMode="contain"
                />
                if(1+1 ==3)
                {
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity>
                      <Image
                        source={require("./../../assets/Image/Details.png")}
                        style={{ width: 70, height: 25, marginBottom: 5 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 9,
                          marginTop: 5,
                          marginLeft: 15,
                          position: "absolute",
                          color: "white"
                        }}
                      >
                        توضیحات
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
                <View style={{ height: 40, marginBottom: 5 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 12,
                      marginBottom: 5
                    }}
                  >
                    {rowData.name}
                  </Text>
                </View>
                if({rowData.op} !== null)
                {
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 12,
                      marginBottom: 5,
                      color: "red",
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      textDecorationColor: "red"
                    }}
                  >
                    {" "}
                    {rowData.op}
                  </Text>
                }
                if({rowData.np} !== null)
                {
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 12,
                      marginBottom: 5
                    }}
                  >
                    {rowData.np}
                  </Text>
                }
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderTopWidth: 1,
                    borderColor: "#45aaf2"
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 30
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start"
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginLeft: 10, borderRadius: 5, marginTop: 2 }}
                    >
                      <Image
                        source={require("./../../assets/Image/like.png")}
                        style={{ width: 20, height: 20, marginLeft: 3 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginRight: 5
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        width: 100,
                        justifyContents: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          paddingTop: 10,
                          paddingRight: 5,
                          justifyContents: "center",
                          alignItems: "center"
                        }}
                      >
                        افزودن به سبد خرید
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}
