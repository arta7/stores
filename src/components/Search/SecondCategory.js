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
import { Navigator } from "./../Navigator";
import SearchCategory from "./SearchCategory";
import { Mobile } from "./../MainList/Mobile";
const items = [
  1337,
  "janeway",
  {
    lots: "of",
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: ["gold!"]
              }
            }
          }
        }
      }
    }
  },
  [4, 2, "tree"]
];

class SearchIcon extends Component {
  constructor() {
    super();

    this.state = {
      visible: true,
      items,
      results: []
    };
  }

  _cancelControl() {
    this.setState({ visible: !this.state.visible });
    if (!this.state.visible) {
      this.searchBar.hide();
    } else {
      this.searchBar.show();
    }
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
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => this._cancelControl()}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#003552",
              flexDirection: "row-reverse",
              width: 30
            }}
          >
            {" "}
            <View
              style={{
                position: "absolute",
                top: -50,
                backgroundColor: "#fff",
                flexDirection: "row-reverse",
                width: 30
              }}
            />
          </View>

          {ImageShow}
        </TouchableOpacity>
      </View>
    );
  }
}

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class SecondCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: "",
      dataSource1: ds.cloneWithRows([]),
      dataSource: ds.cloneWithRows([])
    };
  }
  pressesButton(name, title) {
    {
      (this.props.navigation.state.params.Name = name),
        (this.props.navigation.state.params.Title = title);

      this.componentDidMount();
    }
  }

  componentDidMount() {
    return fetch(
      "http://roomarket.ir/LlIi1/" +
        this.props.navigation.state.params.Name +
        ".php"
    )
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
          dataSource1: ds.cloneWithRows(responseJson.contacts || [])
        });
      })
      .then(
        fetch("http://roomarket.ir/LlIi1/OnlineShop.php")
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
      )
      .catch(error => {
        Alert.alert("" + error);
      });
  }

  onPressesButton(name, title) {
    {
      this.props.navigation.navigate("ThirdCategory", {
        Site: name,
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
      <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: this.props.navigation.state.params.Title }}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SearchCategory");
              }}
            >
              <Image
                source={require("./../../assets/Image/Search.png")}
                style={{ width: 25, height: 25, marginLeft: 5 }}
              />
            </TouchableOpacity>
          }
          backgroundColor="#95DE5F"
        />
        <ScrollView>
          {this.state.dataSource != null ? (
            <ListView
              horizontal={true}
              contentContainerStyle={{
                flexDirection: "row",
                width:
                  (Dimensions.get("screen").width / 3) *
                  this.state.dataSource.getRowCount()
              }}
              dataSource={this.state.dataSource}
              renderRow={rowDatas => (
                <View
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    marginTop: 5
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#95DE5F",
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20
                    }}
                    onPress={() =>
                      this.pressesButton(rowDatas.site, rowDatas.name)
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 15,
                        paddingRight: 10,
                        paddingLeft: 10
                      }}
                    >
                      {rowDatas.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : null}

          {this.state.dataSource1 != null ? (
            <ListView
              contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
              dataSource={this.state.dataSource1}
              renderRow={rowData => (
                <View
                  style={{
                    width: "31%",
                    height: 140,
                    borderWidth: 2,
                    borderColor: "white",
                    backgroundColor: "white",
                    marginLeft: "1%",
                    marginRight: "1%",
                    marginBottom: "10%",
                    borderRadius: 5
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.onPressesButton(rowData.site, rowData.name)
                    }
                  >
                    <Image
                      source={{ uri: rowData.img }}
                      style={{ width: "100%", height: "90%" }}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#00a8ff",
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
					   onPress={() =>
                      this.onPressesButton(rowData.site, rowData.name)
                    }
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 11,
                          color: "black",
                          paddingBottom: 3
                        }}
                      >
                        {rowData.name}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : null}
        </ScrollView>
      </View>
    );
  }
}
