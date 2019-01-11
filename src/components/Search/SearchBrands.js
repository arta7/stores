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
  AsyncStorage
} from "react-native";
import { Header } from "react-native-elements";
import SearchBar from "react-native-searchbar";
import PopupDialog, {
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
import { Mobile } from "./../MainList/Mobile";
import Toast, {DURATION} from 'react-native-easy-toast';
export default class SearchBrands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: "",
      visible: true,
      favs: [],
      order: [],

      results: [],
      input: "",
      toz: ""
    };
    this.arrayholder = [];

    this.searchFilterFunction = this.searchFilterFunction.bind(this);
  }
  showPopup(text) {
    this.setState({ toz: text });
    this.popupDialog.show();
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
        Alert.alert("" + error);
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
         this.refs.toast.show('از سبد خرید حذف شد');
          }
          else
          {
            this.refs.toast.show('به  سبد خرید اضافه شد');
          }
	  })
      .catch(error => {
        Alert.alert("" + error);
      });
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
              fontSize: 11,
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
          fontSize: 11,
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
  filterImage(text) {
    for (const i in this.state.favs) {
      if (this.state.favs[i].id == text)
        return (
          <Image
            source={require("./../../assets/Image/like1.png")}
            style={{ width: 20, height: 20, marginLeft: 3 }}
            resizeMode="contain"
          />
        );
    }
    return (
      <Image
        source={require("./../../assets/Image/like.png")}
        style={{ width: 20, height: 20, marginLeft: 3 }}
        resizeMode="contain"
      />
    );
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
    var formData = new FormData();
    formData.append("type", "show");
    formData.append("number", Mobile["Call"].name);
    return fetch(
      "http://roomarket.ir/LlIi1/search.php?text=" +
        this.props.navigation.state.params.Names
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
              isLoading: false,
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
        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="توضيحات محصول"
              titleTextStyle={{ color: "white" }}
              titleStyle={{ backgroundColor: "#95DE5F" }}
            />
          }
          dialogStyle={{ backgroundColor: "#ecf0f1" }}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "right",
                paddingTop: 80,
                paddingRight: 50,
                paddingLeft: 50
              }}
            >
              {this.state.toz}
            </Text>
          </View>
        </PopupDialog>
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
          centerComponent={{ text: this.props.navigation.state.params.Names }}
          backgroundColor="#95DE5F"
        />

        <ScrollView>
          {this.state.dataSource != null ? (
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
                  <View style={{ flexDirection: "row" }}>
                    {rowData.toz.trim() != "" ? (
                      <TouchableOpacity
                        onPress={() => {
                          this.showPopup(rowData.toz);
                        }}
                      >
                        <Image
                          source={require("./../../assets/Image/Details.png")}
                          style={{ width: 70, height: 25, marginBottom: 5 }}
                          resizeMode="stretch"
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
                          توضيحات
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity>
                        <Image
                          source={require("./../../assets/Image/Details1.png")}
                          style={{ width: 70, height: 25, marginBottom: 5 }}
                          resizeMode="stretch"
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
                          {""}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
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
                  {rowData.op !== null ? (
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
                  ) : null}
                  {rowData.np !== null ? (
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
                  ) : null}
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
                        style={{
                          marginLeft: 10,
                          borderRadius: 5,
                          marginTop: 2
                        }}
                        onPress={() => {
                          this.onlikeClick(rowData.id);
                        }}
                      >
                        {this.filterImage(rowData.id)}
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
                        onPress={() => {
                          this.onOrderClick(rowData.name);
                        }}
                      >
                        {this.filterOrder(rowData.id)}
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
