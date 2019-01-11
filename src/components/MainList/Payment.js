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
  AsyncStorage
} from "react-native";
import { Mobile } from "./Mobile";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { Header } from "react-native-elements";
import { Navigator } from "./../Navigator";
import DatePicker from "react-native-datepicker";

var radio_time = [
  { label: "تحویل سفارش در کمتر از 45 دقیقه", value: "0" },
  { label: "تحویل سفارش در ساعت مشخص", value: "1" }
];

var radio_pardakht = [
  { label: "پرداخت در محل ( نقدی - کارت خوان )", value: "2" },
  { label: "پرداخت آنلاین", value: "3" },
  { label: "کسر از اعتبار", value: "4" }
];
export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      name: "",
      value: "2",
      time: "0",
      visible: true,
      type: "show",
      total: 0,
      numvalue: "0",
      results: [],
      products: [],
      isDateTimePickerVisible: false,
      clock: "20:00",
      credit: "",
      FAtime: "",
      FAdate: "",
      decresevalue: 0
    };
  }
  Decrese(first, second) {
    this.setState({ decresevalue: first - second });
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
        Alert.alert("" + error);
      });
  }

  changeTime(time) {
    this.setState({ clock: time });
  }

  SetPayment(types) {
    var time = "",
      dates = "";
    fetch("http://api.bot-dev.org/time/")
      .then(response => response.json())
      .then(responseJson => {
        if (this.state.time == "0") {
          time = "qabl az 45 min";
        } else {
          time = this.state.clock.toString();
        }
        dates =
          responseJson.FAdate.toString() + " " + responseJson.FAtime.toString();
      })
      .catch(error => {
        Alert.alert("" + error);
      });
    var Data = new FormData();
    Data.append(
      "name",
      this.props.navigation.state.params.AddressName.toString()
    );
    Data.append(
      "Addres",
      this.props.navigation.state.params.Address.toString()
    );
    Data.append("Ajnas", this.props.navigation.state.params.Ajnas.toString());
    Data.append("tedad", this.props.navigation.state.params.Tedad.toString());
    Data.append("price", this.props.navigation.state.params.price.toString());
    Data.append("pay", types);
    Data.append("time", time);
    Data.append("toz", this.state.name);
    Data.append("data", dates);
    Data.append("number", Mobile["Call"].name);
    Data.append("pushe", "");
    Data.append("finished", "1");
    return fetch("http://roomarket.ir/LlIi1/RoMarket.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: Data
    })
      .then(response => response.json())
      .then(responseJson => {
        this.decreaseValue();
        this.removeAllOrder();
        this.props.navigation.navigate("MainPage");
      })
      .catch(error => {
        Alert.alert("" + error);
      });
  }

  SetOnline(types) {
    var time = "",
      dates = "";
    fetch("http://api.bot-dev.org/time/")
      .then(response => response.json())
      .then(responseJson => {
        if (this.state.time == "0") {
          time = "qabl az 45 min";
        } else {
          time = this.state.clock.toString();
        }
        dates =
          responseJson.FAdate.toString() + " " + responseJson.FAtime.toString();
      })
      .catch(error => {
        Alert.alert("" + error);
      });
    var Data = new FormData();
    Data.append(
      "name",
      this.props.navigation.state.params.AddressName.toString()
    );
    Data.append(
      "Addres",
      this.props.navigation.state.params.Address.toString()
    );
    Data.append("Ajnas", this.props.navigation.state.params.Ajnas.toString());
    Data.append("tedad", this.props.navigation.state.params.Tedad.toString());
    Data.append("price", this.props.navigation.state.params.price.toString());
    Data.append("pay", types);
    Data.append("time", time);
    Data.append("toz", this.state.name.toString());
    Data.append("data", dates);
    Data.append("number", Mobile["Call"].name);
    Data.append("pushe", "");
    Data.append("finished", "0");
    return fetch("http://roomarket.ir/LlIi1/RoMarket.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: Data
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.navigation.navigate("ShowOnline", {
          Id: responseJson.result[0].FactorID
        });
      })
      .catch(error => {
        Alert.alert("" + error);
      });
  }

  Setsefaresh(types) {
    var time = "",
      dates = "";
    fetch("http://api.bot-dev.org/time/")
      .then(response => response.json())
      .then(responseJson => {
        if (this.state.time == "0") {
          time = "qabl az 45 min";
        } else {
          time = this.state.clock.toString();
        }
        dates =
          responseJson.FAdate.toString() + " " + responseJson.FAtime.toString();
      })
      .catch(error => {
        Alert.alert("" + error);
      });
    var Data = new FormData();
    Data.append(
      "name",
      this.props.navigation.state.params.AddressName.toString()
    );
    Data.append(
      "Addres",
      this.props.navigation.state.params.Address.toString()
    );
    Data.append("Ajnas", this.props.navigation.state.params.Ajnas.toString());
    Data.append("tedad", this.props.navigation.state.params.Tedad.toString());
    Data.append("price", this.props.navigation.state.params.price.toString());
    Data.append("pay", types);
    Data.append("time", time);
    Data.append("toz", this.state.name.toString());
    Data.append("data", dates);
    Data.append("number", Mobile["Call"].name);
    Data.append("pushe", "");
    Data.append("finished", "1");
    return fetch("http://roomarket.ir/LlIi1/RoMarket.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: Data
    })
      .then(response => response.json())
      .then(responseJson => {
        this.removeAllOrder();
        this.props.navigation.navigate("MainPage");
      })
      .catch(error => {
        Alert.alert("" + error);
      });
  }

  decreaseValue() {
    var value = Number(
      this.props.navigation.state.params.price.toString()
    ).toString();

    var formData = new FormData();

    formData.append("credit", value);

    formData.append("number", Mobile["Call"].name);

    return fetch("http://roomarket.ir/PayForPayFor-pay/suc1m1.php", {
      method: "POST",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      },

      body: formData
    })
      .then(response => response.json())

      .then(responseJson => {})

      .catch(() => {
        Alert.alert("error");
      });
  }

  removeAllOrder() {
    var formData = new FormData();
    formData.append("type", "rmall");
    formData.append("number", Mobile["Call"].name);
    return fetch("http://roomarket.ir/LlIi1/user-order.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {})
      .catch(() => {
        Alert.alert("error");
      });
  }

  render() {
    var values;
    if (this.state.value == "2") {
      values = (
        <TouchableOpacity
          style={{ width: "100%", height: 50, backgroundColor: "#95DE5F" }}
          onPress={() => {
            this.Setsefaresh("pardakht dar mahal");
          }}
        >
          <Text
            style={{
              fontSize: 13,
              justifyContents: "center",
              alignItems: "center",
              textAlign: "center",
              paddingTop: 10,
              color: "white"
            }}
          >
            ثبت سفارش{" "}
          </Text>
        </TouchableOpacity>
      );
    } else if (this.state.value == "3") {
      values = (
        <TouchableOpacity
          style={{ width: "100%", height: 50, backgroundColor: "#95DE5F" }}
          onPress={() => {
            this.SetOnline("پرداخت به صورت آنلاین");
          }}
        >
          <Text
            style={{
              fontSize: 13,
              justifyContents: "center",
              alignItems: "center",
              textAlign: "center",
              paddingTop: 10,
              color: "white"
            }}
          >
            پرداخت و ثبت سفارش{" "}
          </Text>
        </TouchableOpacity>
      );
    } else if (this.state.value == "4") {
      if (
        Number(this.state.credit.toString()) >=
        Number(this.props.navigation.state.params.price.toString())
      ) {
        values = (
          <TouchableOpacity
            style={{ width: "100%", height: 50, backgroundColor: "#95DE5F" }}
            onPress={() => {
              this.SetPayment("kasr az etebar");
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
              ثبت سفارش{" "}
            </Text>
          </TouchableOpacity>
        );
      } else {
        values = (
          <TouchableOpacity
            style={{ width: "100%", height: 50, backgroundColor: "#95DE5F" }}
            onPress={() => {
              this.props.navigation.navigate("AddMoney");
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
        );
      }
    }
    var numeric;
    if (this.state.time == "0") {
      numeric = <View />;
    } else if (this.state.time == "1") {
      numeric = (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
            marginTop: 5
          }}
        >
          <DatePicker
            style={{ width: 100 }}
            date={this.state.clock}
            mode="time"
            placeholder="انتخاب  ساعت"
            format="HH:mm"
            locale={"SV"}
            confirmBtnText="تایید"
            cancelBtnText="لغو"
            showIcon={false}
            customStyles={{
              dateInput: {
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 5,
                marginTop: 5
              }
            }}
            onDateChange={time => {
              this.changeTime(time);
            }}
          />
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
          centerComponent={{ text: "علاقه مندی ها", color: "white" }}
          backgroundColor="#95DE5F"
        />

        <View
          style={{
            marginBottom: 5,
            borderWidth: 1,
            borderColor: "red",
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            backgroundColor: "#ecf0f1",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10
          }}
        >
          <View
            style={{ backgroundColor: "green", marginBottom: 3, height: 30 }}
          >
            <Text
              style={{
                textAlign: "center",
                justifyContent: "center",
                paddingTop: 5
              }}
            >
              زمان ارسال{" "}
            </Text>
          </View>
          <RadioForm
            radio_props={radio_time}
            initial={0}
            buttonInnerColor={"green"}
            buttonSize={10}
            buttonColor={"black"}
            selectedButtonColor={"green"}
            style={{ alignItems: "flex-end", marginRight: 5 }}
            onPress={value => {
              this.setState({ time: value, clock: "20:00" });
            }}
          />
          {numeric}
        </View>
        <View
          style={{
            marginBottom: 5,
            borderWidth: 1,
            borderColor: "red",
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            backgroundColor: "#ecf0f1",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10
          }}
        >
          <View
            style={{ backgroundColor: "green", marginBottom: 3, height: 30 }}
          >
            <Text
              style={{
                textAlign: "center",
                justifyContent: "center",
                paddingTop: 5
              }}
            >
              نحوه پرداخت
            </Text>
          </View>
          <RadioForm
            radio_props={radio_pardakht}
            initial={0}
            buttonInnerColor={"green"}
            buttonSize={10}
            buttonColor={"black"}
            selectedButtonColor={"green"}
            style={{ alignItems: "flex-end", marginRight: 5 }}
            onPress={value => {
              this.setState({ value: value });
            }}
          />
        </View>
        <View>
          <TextInput
            style={{
              borderColor: "#00a8ff",
              backgroundColor: "white",
              marginTop: "5%",
              marginLeft: "5%",
              marginRight: "5%",
              shadowColor: "green",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.7,
              textAlign: "center",
              fontSize: 16,
              borderRadius: 10,
              borderWidth: 1,
              height: 120
            }}
            placeholder="توضیحات"
            onChangeText={text => this.setState({ name: text })}
          />
        </View>
        <View
          style={{
            bottom: 0,
            height: 50,
            width: "100%",
            position: "absolute",
            alignItems: "flex-end",
            justifyContents: "flex-end"
          }}
        >
          {values}
        </View>
      </View>
    );
  }
}
