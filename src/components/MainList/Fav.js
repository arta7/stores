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
import { Mobile } from "./Mobile";
import Toast, {DURATION} from 'react-native-easy-toast';
export default class Fav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: "",
      visible: true,
      fav: "",
      type: "show",
      favs: [],
      order: [],
      results: []
    };
  }

  removeItem(id) {
    var formData = new FormData();
    formData.append("fav", id);
    formData.append("type", "remove");
    formData.append("number", Mobile["Call"].name);
    return fetch("http://roomarket.ir/LlIi1/user-fav.php", {
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
        this.componentDidMount();
      })
      .catch(() => {
        Alert.alert("error");
      });
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append("type", this.state.type);
    formData.append("number", Mobile["Call"].name);
    return fetch("http://Roomarket.ir/LlIi1/user-fav.php", {
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
          dataSource: ds.cloneWithRows(responseJson.favs || [])
        });
      })
      .then(
        fetch("http://Roomarket.ir/LlIi1/user-fav.php", {
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
              favs: responseJson.favs
            });
          })
      )
      .then(
        fetch("http://roomarket.ir/LlIi1/user-order2.php", {
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
              order: responseJson.factor,
              isLoading: false
            });
          })
      )
      .catch(() => {
        Alert.alert("error");
      });
  }

  changeLike(id, text) {
    var formDat = new FormData();
    formDat.append("type", text);
    formDat.append("fav", id);
    formDat.append("number", Mobile["Call"].name);
    return fetch("http://Roomarket.ir/LlIi1/user-fav.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: formDat
    })
      .then(response => response.json())
      .then(responseJson => {
	  	 if(text == 'remove')
          {
         this.refs.toast.show('از علاقه مندی ها  حذف شد');
          }
          else
          {
            this.refs.toast.show('به علاقه مندی ها اضافه شد');
          }
		  
	  })
      .catch(error => {
        Alert.alert(error);
      });
  }

  changeOrder(id, text) {
    var formDat = new FormData();
    formDat.append("type", text);
    formDat.append("order", id);
    formDat.append("number", Mobile["Call"].name);
    return fetch("http://Roomarket.ir/LlIi1/user-order.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: formDat
    })
      .then(response => response.json())
      .then(responseJson => {
	  	if(text == 'remove')
          {
         this.refs.toast.show('از سبد خرید  حذف شد');
          }
          else
          {
            this.refs.toast.show('به  سبد خرید اضافه شد');
          }


		  
	  })
      .catch(error => {
        Alert.alert(error);
      });
  }
  
  
  
   
  onlikeClick(id) {
    let text = "add";
    for (const i in this.state.favs) {
      if (this.state.favs[i].id == id) {
        text = "remove";
      }
    }
    this.changeLike(id, text);
    return this.componentDidMount();
  }

  onOrderClick(id) {
    let text = "add";
    for (const i in this.state.order) {
      if (this.state.order[i].name == id) {
        text = "remove";
      }
    }
    this.changeOrder(id, text);
    return this.componentDidMount();
  }

  filterOrder(text) {
    for (const i in this.state.order) {
      if (this.state.order[i].id == text)
        return (
          <Text
            style={{
              fontSize: 12,
              paddingTop: 5,
              paddingRight: 5,
              justifyContents: "center",
              alignItems: "center",
              color: "#fa983a"
            }}
          >
            {" "}
            حذف از سبد خريد
          </Text>
        );
    }
    return (
      <Text
        style={{
          fontSize: 12,
          paddingTop: 5,
          paddingRight: 5,
          justifyContents: "center",
          alignItems: "center"
        }}
      >
        {" "}
        افزودن به سبد خريد
      </Text>
    );
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
	  <Toast
                    ref="toast"
                    style={{backgroundColor:'#00a8ff'}}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: "علاقه مندی ها", color: "white" }}
          backgroundColor="#95DE5F"
        />

        <ScrollView>
          {this.state.dataSource != null ? (
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
                      flex: 1,
                      justifyContent: "flex-end"
                    }}
                  >
                    <View style={{ width: "70%" }}>
                      <View style={{ height: 40, marginBottom: 5 }}>
                        <Text
                          style={{
                            textAlign: "right",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            fontSize: 14,
                            marginBottom: 5,
                            marginRight: 5,
                            marginTop: 10
                          }}
                        >
                          {rowData.name}
                        </Text>
                      </View>
                      {rowData.np !== null ? (
                        <Text
                          style={{
                            textAlign: "right",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            fontSize: 14,
                            marginBottom: 5,
                            marginRight: 5
                          }}
                        >
                          {rowData.np}
                        </Text>
                      ) : null}
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: "30%"
                      }}
                    >
                      <Image
                        source={{ uri: rowData.ax }}
                        style={{
                          width: "100%",
                          height: 100,
                          marginBottom: 5,
                          marginRight: 5,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                        resizeMode="stretch"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 40,
                      backgroundColor: "#ecf0f1",
                      marginBottom: 5,
                      marginRight: 3,
                      marginLeft: 3
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          justifyContents: "center",
                          alignItems: "center"
                        }}
                        onPress={() => {
                          this.onOrderClick(rowData.name);
                        }}
                      >
                        {this.filterOrder(rowData.id)}
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-end"
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          marginRight: 10,
                          borderRadius: 5,
                          marginTop: 2
                        }}
                        onPress={() => {
                          this.removeItem(rowData.id);
                        }}
                      >
                        <Image
                          source={require("./../../assets/Image/trash1.png")}
                          style={{ width: 20, height: 20, marginRight: 3 }}
                          resizeMode="stretch"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : null}
        </ScrollView>
      </View>
    );
  }
}
