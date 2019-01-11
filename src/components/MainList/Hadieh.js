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
  AsyncStorage,
  TextInput,
  Clipboard,
  Share
} from "react-native";
import { Header } from "react-native-elements";
import SearchBar from "react-native-searchbar";
import styles from "./../../assets/css/Login";
import Icon from "react-native-vector-icons";
import { Mobile } from "./Mobile";
export default class Hadieh extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, value: "", codeDavat: "", code: "" };
  }

  componentDidMount() {
    return fetch(
      "http://roomarket.ir/LlIi1/get-refcode.php?number=" + Mobile["Call"].name
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            codeDavat: responseJson.result[0].refcode
          },
          function() {}
        );
      })
      .catch(error => {
        Alert.alert(error);
      });
  }

  onClick(code) {
    Share.share({
      message:
        "با این کد در رومارکت ثبت نام کن و اعتبار رایگان بگیر و خیلی راحت هر کالایی تو اپلیکیشن هست رو می تونی واسه خودت سفارش بدی .   کد دعوت :" +
        code,
      url: "",
      title: ""
    });
  }

  setGift(code, mobile) {
    return fetch(
      "http://roomarket.ir/LlIi1/set-refcode.php?number=" +
        mobile +
        "&refcode=" +
        code
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.result[0].credit == 3) {
          Alert.alert("شما قبلا کد دعوتتان را استفاده کردید.");
        } else if (responseJson.result[0].credit == 2) {
          Alert.alert(
            "ما دوست داریم بهتون کمک کنیم،اما کد خودتون رو نمیتوانید وارد کنید."
          );
        } else if (responseJson.result[0].credit == 1) {
          Alert.alert("کد با موفقیت اعمال شد");
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: "اعتبار هدیه", color: "#fff" }}
          backgroundColor="#95DE5F"
        />
        <View
          style={{
            height: 60,
            borderRadius: 5,
            borderColor: "#95DE5F",
            marginTop: 5,
            borderWidth: 1,
            backgroundColor: "#FFFEFB",
            marginRight: 7,
            marginLeft: 7
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              marginRight: 10,
              fontSize: 12,
              textAlign: "center",
              justifyContent: "center",
              paddingTop: 10
            }}
          >
            با ارسال کد دعوت واسه دوستات بهشون 3000 تومان اعتبار هدیه بده و با
            اولین خریدشون از رومارکت خودتم 2000 تومان اعتبار هدیه می گیری{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10
          }}
        >
          <View style={{ justifyContent: "flex-start", marginLeft: 50 }}>
            <Text>{this.state.codeDavat}</Text>
          </View>
          <View style={{ justifyContent: "flex-end", marginRight: 50 }}>
            <Text>کد دعوت شما :</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              marginLeft: "40%"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.onClick(this.state.codeDavat);
              }}
            >
              <Image
                source={require("./../../assets/Image/share.png")}
                style={{ width: 30, height: 30 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              marginRight: "40%"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Clipboard.getString(this.state.codeDavat);
              }}
            >
              <Image
                source={require("./../../assets/Image/crop.png")}
                style={{ width: 30, height: 30 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TextInput
            style={styles.textInputs}
            placeholder="کد معرف"
            onChangeText={value => this.setState({ code: value })}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.setGift(this.state.code, Mobile["Call"].name)}
          >
            <Text
              style={{
                textAlign: "center",
                justifyContent: "center",
                fontSize: 12
              }}
            >
              دریافت اعتبار هدیه
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
