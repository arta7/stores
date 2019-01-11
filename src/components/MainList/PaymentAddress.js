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
import Toast, {DURATION} from 'react-native-easy-toast';
export default class PaymentAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isCom: false,
      value: "",
      visible: true,
      fav: "",
      type: "",
      address: "",
      typeAddress: "",
      nameAddress: "",
      addressData: [],
      results: []
    };
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
        Alert.alert("" + error);
      });
  }

  filterAddress(text) {
    if (this.state.address == text) {
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

  setAddress(Address, Type, name) {
    this.setState({ address: Address, typeAddress: Type, nameAddress: name });
    this.filterAddress(Address);
	 this.refs.toast.show(' آدرس ' + Address.toString()+ 'انتخاب شد ');
    return this.componentDidMount();
  }

  gotoPayment() {
    if (this.state.address.toString().trim() == "") {
     this.refs.toast.show('لطفا یک آدرس را انتخاب کنید');
    } else {
      fetch("http://roomarket.ir/LlIi1/mount.php", {
        method: "POST"
      })
        .then(response => response.json())
        .then(responseJson => {
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });

          if (this.state.typeAddress == "1") {
            if (
              parseInt(responseJson.contacts[0].qom, 10) <
              parseInt(this.props.navigation.state.params.Price, 10)
            ) {
              this.props.navigation.navigate("Payment", {
                price: this.props.navigation.state.params.Price,
                Address: this.state.address,
                AddressName: this.state.nameAddress,
                Ajnas: this.props.navigation.state.params.Ajnas,
                Tedad: this.props.navigation.state.params.Tedad
              });
              this.setState({ address: "" });
            } else {
              Alert.alert(
                " لطفا مبلغ بیش تر از " +
                  (parseInt(responseJson.contacts[0].qom, 10) + 1).toString() +
                  "  تومان وارد کنید"
              );
            }
          } else {
            if (
              parseInt(responseJson.contacts[0].par, 10) <
              parseInt(this.props.navigation.state.params.Price, 10)
            ) {
              this.props.navigation.navigate("Payment", {
                price: this.props.navigation.state.params.Price,
                Address: this.state.address,
                AddressName: this.state.nameAddress
              });
              this.setState({ address: "" });
            } else {
              Alert.alert(
                " لطفا مبلغ بیش تر از " +
                  (parseInt(responseJson.contacts[0].par, 10) + 1).toString() +
                  "  تومان وارد کنید"
              );
            }
          }
        })
        .catch(error => {
          Alert.alert("" + error);
        });
    }
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
          addressData: responseJson.result
        });
      })
      .catch(error => {
        Alert.alert("" + error);
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
          centerComponent={{ text: "آدرس ها", color: "white" }}
          backgroundColor="#95DE5F"
        />
        <Text
          style={{ alignItem: "center", textAlign: "center", marginBottom: 20 }}
        >
          لطفا بر روی آدرس مورد نظر کلیک کنید!
        </Text>
        <View style={{ flex: 1 }}>
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
                          style={{
                            marginRight: 10,
                            borderRadius: 5,
                            marginTop: 2
                          }}
                          onPress={() => {
                            this.setAddress(
                              rowData.address,
                              rowData.type,
                              rowData.name
                            );
                          }}
                        >
                          {this.filterAddress(rowData.address)}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            ) : null}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContents: "center",
            height: 50
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderColor: "#00a8ff",
              borderWidth: 1,
              width: "60%",
              height: 40,
              marginLeft: "25%",
              marginBottom: 5,
              backgroundColor: "white"
            }}
            onPress={() => {
              this.props.navigation.navigate("addAddress", { ScreenA: this });
            }}
          >
            <Text
              style={{
                fontSize: 15,
                justifyContents: "center",
                alignItems: "center",
                textAlign: "center",
                paddingTop: 10,
                color: "#95DE5F"
              }}
            >
              آدرس جدید
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#ecf0f1",
            height: 25
          }}
        >
          <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
            <Text> {this.props.navigation.state.params.Price} تومان</Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={{ paddingBottom: 5, marginRight: 5 }}> جمع کل</Text>
          </View>
        </View>
        <View
          style={{
            bottom: 0,
            height: 50,
            alignItems: "flex-end",
            justifyContents: "flex-end"
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", height: 50, backgroundColor: "#95DE5F" }}
            onPress={() => {
              this.gotoPayment();
            }}
          >
            <Text
              style={{
                fontSize: 15,
                justifyContents: "center",
                alignItems: "center",
                textAlign: "center",
                paddingTop: 10,
                color: "white"
              }}
            >
              انتخاب نحوه پرداخت{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
