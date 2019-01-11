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
  WebView
} from "react-native";
import { Navigator } from "./../Navigator";
import ShowPayment from "./ShowPayment";
import { Header } from "react-native-elements";
import { Mobile } from "./Mobile";
export default class AddMoney extends Component {
  constructor() {
    super();
    this.state = {
      price: "0",
      isLoading: false,
      credit: "",
      lastPrice: "",
      changecredit: ""
    };
  }
  returnData(credit) {
    this.setState({ changecredit: credit });
  }

  showPayment(value, credit) {
    if (parseInt(value, 10) >= 1000) {
      this.props.navigation.navigate("ShowPayment", {
        value: value,
        lastCredit: credit
      });
    } else {
      Alert.alert("میزان بیش تر از 1000 تومان وارد کنید.");
    }
  }
  componentDidMount() {
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
  componentDidUpdate() {
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

  render() {
    if (this.state.isLoading) {
      <View style={{ marginTop: 15 }}>
        <ActivityIndicator size="large" color="red" />
      </View>;
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: "افزایش اعتبار", color: "white" }}
          backgroundColor="#95DE5F"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              justifyContent: "flex-start",
              marginTop: 20,
              marginLeft: 20
            }}
          >
            {this.state.credit} تومان
          </Text>
          <Text
            style={{
              justifyContent: "flex-end",
              marginTop: 20,
              marginRight: 10
            }}
          >
            اعتبار فعلی شما
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginLeft: "2%",
            width: "96%",
            marginRight: "2%",
            marginTop: "1%",
            height: 45,
            backgroundColor: "#00a8ff",
            borderRadius: 10
          }}
          onPress={() => {
            this.props.navigation.navigate("Hadieh", {
              mobile: Mobile["Call"].name
            });
          }}
        >
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              paddingTop: 10,
              paddingRight: 40,
              fontSize: 15
            }}
          >
            دريافت اعتبار هديه
          </Text>
          <Image
            source={require("./../../assets/Image/gift.png")}
            style={{
              width: 33,
              height: 33,
              position: "absolute",
              alignSelf: "flex-end",
              right: "10%",
              top: 5
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <Text
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: 10
          }}
        >
          مبلغ مورد نظر برای افزایش اعتبار را وارد کنید
        </Text>

        <View>
          <TextInput
            style={{
              borderColor: "#00a8ff",
              backgroundColor: "white",
              marginTop: "9%",
              marginLeft: "8%",
              marginRight: "8%",
              shadowColor: "green",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.7,
              textAlign: "center",
              fontSize: 14,
              borderRadius: 10,
              borderWidth: 1,
              height: 50,
              marginBottom: 10
            }}
            keyboardType={"numeric"}
            placeholder="مبلغ درخواستی به تومان"
            onChangeText={text => this.setState({ price: text })}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: 50,
            width: "100%",
            alignItems: "center",
            justifyContents: "flex-end"
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", height: 50, backgroundColor: "#95DE5F" }}
            onPress={() => {
              this.showPayment(this.state.price, this.state.credit);
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
              افزایش اعتبار{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
