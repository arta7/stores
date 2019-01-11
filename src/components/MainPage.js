import React, { Component } from "react";

import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  YellowBox,
  Dimensions,
  Alert,
  ScrollView,
  WebView,
  AsyncStorage,
  NativeModules,
  BackHandler,
  Linking
} from "react-native";
import PopupDialog, {
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";

import { DrawerNavigator } from "react-navigation";
import MainCategory from "./Search/MainCategory";
import SearchCategory from "./Search/SearchCategory";
import SearchBar from "react-native-searchbar";
import MainList from "./MainList/MainList";
import { Navigator } from "./Navigator";
import Fav from "./MainList/Fav";
import Order from "./MainList/Order";
import Myinstagram from "./Myinstagram";
import Mytelegram from "./Mytelegram";
import Mysoroush from "./Mysoroush";
import Address from "./MainList/Address";
import AddMoney from "./MainList/AddMoney";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import { Mobile } from "./MainList/Mobile";

class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
             source={require('./../assets/Image/menu.png')}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

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
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      items,
      results: []
    };
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Second");
          }}
        >
          <Image
            source={require("./../assets/Image/Search.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

class Custom_Side_Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credit: "",
      peigiri: "",
      hamkari: "",
      question: "",
      call: "",
      about: "",
      popupNetwork: [],
      showWebView: false
    };
    this.showSoroush = this.showSoroush.bind(this);
  }

  handleBackButton = () => {
    {
      Alert.alert(
        "",
        "آیا می خواهید از برنامه خارج شوید ؟",
        [
          {
            text: "بله",
            onPress: () => {
              AsyncStorage.setItem("mobile", '');
              if (Platform.OS !== "android") {
                this.props.navigation.navigate('Login');
              } else {
                BackHandler.exitApp();
              }
            }
          },
          { text: "نه" }
        ],
        { cancelable: false }
      );
    }
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

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
      .then(
        fetch("http://roomarket.ir/LlIi1/menu.php", {
          methord: "POST"
        })
          .then(response => response.json())
          .then(response => {
            this.setState({
              hamkari: response.contacts[0].BM,
              question: response.contacts[0].FQ,
              call: response.contacts[0].CT,
              about: response.contacts[0].GR,
              peigiri: response.contacts[0].PG
            });
          })
      )
      .catch(error => {
        Alert.alert(error);
      });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    this.setState({
      credit: ""
    });
  }

  showSoroush() {
    return (
      <WebView
        source={{ uri: "https://sapp.ir/RoMarket_qom" }}
        style={{ marginTop: 20 }}
      />
    );
  }

  showInstageram() {
    return (
      <WebView
        source={{ uri: "https://www.instagram.com/RoMarket_qom/" }}
        style={{ marginTop: 20 }}
      />
    );
  }

  onNavigationStateChange = navState => {
    if (navState.url.indexOf("https://sapp.ir/RoMarket_qom") === 0) {
      const regex = /#access_token=(.+)/;
      const accessToken = navState.url.match(regex)[1];
      console.log(accessToken);
    }
  };

  renderContent() {
    return (
      <WebView
        source={{
          uri: "https://sapp.ir/RoMarket_qom"
        }}
        onNavigationStateChange={this.onNavigationStateChange}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
  }

  rendertelegram() {
    return (
      <WebView
        source={{
          uri: ""
        }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#ecf0f1",
          paddingTop: 20,
          marginRight: 5,
          flex: 1
        }}
      >
        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="پرسش های متداول"
              titleTextStyle={{ color: "white" }}
              titleStyle={{ backgroundColor: "#95DE5F" }}
            />
          }
          dialogStyle={{ backgroundColor: "#ecf0f1" }}
          visible={this.state.questionPopupVisibility}
          ref={popupQuestion => {
            this.popupQuestion = popupQuestion;
          }}
          width={350}
          height={300}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 50,
              paddingLeft: 50
            }}
          >
            <ScrollView>
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10%",
                  textAlign: "center"
                }}
              >
                {this.state.question.toString()}
              </Text>
            </ScrollView>
          </View>
        </PopupDialog>

        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="همکاری با ما"
              titleTextStyle={{ color: "white" }}
              titleStyle={{ backgroundColor: "#95DE5F" }}
            />
          }
          dialogStyle={{ backgroundColor: "#ecf0f1" }}
          ref={popupCall => {
            this.popupDialogHamkari = popupCall;
          }}
          width={250}
          height={190}
          visible={this.state.cooperationPopupVisibility}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 30,
              paddingLeft: 30
            }}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
                textAlign: "center",
                fontSize: 14
              }}
            >
              {this.state.hamkari.toString()}
            </Text>
          </View>
        </PopupDialog>

        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="تیم برنامه نویسی"
              titleTextStyle={{ color: "white" }}
              titleStyle={{ backgroundColor: "#95DE5F" }}
            />
          }
          dialogStyle={{ backgroundColor: "#ecf0f1" }}
          ref={popupCall => {
            this.popupProgram = popupCall;
          }}
          width={250}
          height={300}
          visible={this.state.programPopupVisibility}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 30,
              paddingLeft: 30
            }}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
                textAlign: "center",
                fontSize: 14
              }}
            >
              {
                "گروه نرم افزاری تمشک \nطراحی و تولید نرم افزار اندروید ، ios ، نرم افزار های تحت وب و دسکتاپ \nطراحی سایت \nسامانه پیامک \n شماره تلفن : 01133392043 \n شماره همراه : 09114748947"
              }
            </Text>
            <Text style={{ color: "blue", fontSize: 12 }}>
              tameshkgroup.com
            </Text>
            <Text style={{ color: "red", marginBottom: 10, fotSize: 12 }}>
              instagram.com/tameshkgroup
            </Text>
          </View>
        </PopupDialog>

        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="شبکه های اجتماعی"
              titleTextStyle={{ color: "white" }}
              titleStyle={{ backgroundColor: "#95DE5F" }}
            />
          }
          dialogStyle={{ backgroundColor: "#ecf0f1" }}
          containerStyle={{ justifyContent: "center" }}
          ref={popupNetwork => {
            this.popupNetwork = popupNetwork;
          }}
          visible={this.state.networkPopupVisibility}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                width: "82%",
                height: 70,
                marginTop: 10,
                backgroundColor: "white",
                marginLeft: 5,
                marginRight: 5
              }}
              onPress={() => this.props.navigation.navigate("Mysoroush")}
            >
              <Image
                source={require("./../assets/Image/soroush.png")}
                style={{
                  width: "100%",
                  height: 70,
                  marginRight: 30,
                  marginLeft: 25,
                  borderRadius: 10,
                  borderWidth: 1
                }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "82%",
                height: 70,
                marginTop: 10,
                backgroundColor: "white",
                marginLeft: 5,
                marginRight: 5
              }}
              onPress={() => {
                this.props.navigation.navigate("Myinstagram");
              }}
            >
              <Image
                source={require("./../assets/Image/instageram.png")}
                style={{
                  width: "100%",
                  height: 70,
                  marginRight: 30,
                  marginLeft: 25,
                  borderRadius: 10,
                  borderWidth: 1
                }}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "82%",
                height: 70,
                marginTop: 10,
                backgroundColor: "white",
                marginLeft: 10,
                marginRight: 30
              }}
              onPress={() => this.props.navigation.navigate("Mytelegram")}
            >
              <Image
                source={require("./../assets/Image/telegram.png")}
                style={{
                  width: "100%",
                  height: 70,
                  marginRight: 30,
                  marginLeft: 25,
                  borderRadius: 10,
                  borderWidth: 1
                }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
        </PopupDialog>

        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="پیگری سفارش"
              titleTextStyle={{ color: "white" }}
              titleStyle={{ backgroundColor: "#95DE5F" }}
            />
          }
          dialogStyle={{ backgroundColor: "#ecf0f1" }}
          ref={popupCall => {
            this.popupPeigiri = popupCall;
          }}
          width={300}
          height={200}
          visible={this.state.followUpPopupVisibility}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 50,
              paddingLeft: 50
            }}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
                textAlign: "center"
              }}
            >
              {this.state.peigiri.toString()}
            </Text>
          </View>
        </PopupDialog>
        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="تماس با ما "
              titleTextStyle={{ color: "white" }}
              titleStyle={{ backgroundColor: "#95DE5F" }}
            />
          }
          dialogStyle={{ backgroundColor: "#ecf0f1" }}
          ref={popupCall => {
            this.popupCall = popupCall;
          }}
          width={230}
          height={160}
          visible={this.state.callPopupVisibility}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 50,
              paddingLeft: 50
            }}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
                textAlign: "center"
              }}
            >
              {this.state.call.toString()}
            </Text>
          </View>
        </PopupDialog>

        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="درباره ما "
              titleTextStyle={{ color: "white" }}
              titleStyle={{ backgroundColor: "#95DE5F" }}
            />
          }
          dialogStyle={{ backgroundColor: "#ecf0f1" }}
          ref={popupAbout => {
            this.popupAbout = popupAbout;
          }}
          width={300}
          height={250}
          visible={this.state.aboutPopupVisibility}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 50,
              paddingLeft: 50
            }}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
                textAlign: "center"
              }}
            >
              {this.state.about.toString()}
            </Text>
          </View>
        </PopupDialog>
        <View style={styles.sideMenuContainer}>
          {this.props.navigation.state.params.Sex == "male" ? (
            <Image
              source={require("./../assets/Image/Male1.png")}
              style={styles.sideMenuProfileIcon}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("./../assets/Image/Female1.png")}
              style={styles.sideMenuProfileIcon}
              resizeMode="stretch"
            />
          )}

          <Text> تلفن همراه شما : {Mobile["Call"].name}</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#00a8ff",
                backgroundColor: "white",
                height: 40,
                borderRadius: 15,
                width: 150
              }}
              onPress={() => {
                this.props.navigation.navigate("AddMoney");
              }}
            >
              <Text
                style={{
                  paddingRight: 20,
                  paddingLeft: 20,
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 10,
                  paddingTop: 10
                }}
              >
                افزایش اعتبار{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#00a8ff",
                backgroundColor: "white",
                marginLeft: 5,
                height: 40,
                borderRadius: 15
              }}
			  disabled={true}
            >
              <Text
                style={{
                  paddingRight: 20,
                  paddingLeft: 20,
                  paddingTop: 10,
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 10
                }}
              >
                اعتبار فعلی شما {this.state.credit} تومان{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              backgroundColor: "#ecf0f1",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flex: 1
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.popupDialogHamkari.show();
                }}
              >
                {" "}
                همکاری با ما{" "}
              </Text>
              <Image
                source={require("./../assets/Image/hand-shake.png")}
                style={styles.sideMenuIcon}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.popupQuestion.show();
                }}
              >
                {" "}
                پرسش های متداول{" "}
              </Text>
              <Image
                source={require("./../assets/Image/information.png")}
                style={styles.sideMenuIcon}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.props.navigation.navigate("Address");
                }}
              >
                {" "}
                آدرس های منتخب
              </Text>
              <Image
                source={require("./../assets/Image/placeholder.png")}
                style={styles.sideMenuIcon}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.props.navigation.navigate("Order");
                }}
              >
                {" "}
                سبد خرید
              </Text>
              <Image
                source={require("./../assets/Image/basket.png")}
                style={styles.sideMenuIcon}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.props.navigation.navigate("OrderHistory");
                }}
              >
                {" "}
                سابقه سفارش
              </Text>
              <Image
                source={require("./../assets/Image/scroll.png")}
                style={styles.sideMenuIcon}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.props.navigation.navigate("Fav");
                }}
              >
                {" "}
                علاقه مندی ها{" "}
              </Text>
              <Image
                source={require("./../assets/Image/favorites-button.png")}
                style={styles.sideMenuIcon}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.popupNetwork.show();
                }}
              >
                {" "}
                شبکه های اجتماعی
              </Text>
              <Image
                source={require("./../assets/Image/social-media.png")}
                style={styles.sideMenuIcon}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.popupPeigiri.show();
                }}
              >
                پیگیری سفارش
              </Text>
              <Image
                source={require("./../assets/Image/follower.png")}
                style={styles.sideMenuIcon}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.popupCall.show();
                }}
              >
                {" "}
                تماس با ما
              </Text>
              <Image
                source={require("./../assets/Image/phone-contact.png")}
                style={styles.sideMenuIcon}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.popupAbout.show();
                }}
              >
                {" "}
                درباره ما{" "}
              </Text>
              <Image
                source={require("./../assets/Image/man.png")}
                style={styles.sideMenuIcon}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => {
                  this.popupProgram.show();
                }}
              >
                {" "}
                تیم برنامه نویسی{" "}
              </Text>
              <Image
                source={require("./../assets/Image/programmer.png")}
                style={styles.sideMenuIcon}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <Text
                style={styles.menuText}
                onPress={() => this.handleBackButton()}
              >
                خروج از حساب کاربری{" "}
              </Text>
              <Image
                source={require("./../assets/Image/logout.png")}
                style={styles.sideMenuIcon}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class MainActivity extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated"
    ]);
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> This is Activity - 1 </Text>
      </View>
    );
  }
}

class SecondActivity extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated"
    ]);
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> This is Activity - 2 </Text>
      </View>
    );
  }
}

class ThirdActivity extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated"
    ]);
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> This is Activity - 3 </Text>
      </View>
    );
  }
}
const TabNav = TabNavigator(
  {
    رومارکت: { screen: MainList },
    "دسته بندی": { screen: MainCategory }
  },
  {
    navigationOptions: ({ navigation }) => ({}),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",

    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "white",
      labelStyle: {
        fontSize: 16,
        marginBottom: "8%"
      },
      style: {
        backgroundColor: "#95DE5F"
      }
    },
    animationEnabled: false,
    swipeEnabled: false,
    lazy: true
  }
);

const FirstActivity_StackNavigator = StackNavigator({
  First: {
    screen: TabNav,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image
          source={require("./../assets/Image/roomarketsmall1.png")}
          style={{ width: 120, height: 40 }}
          resizeMode="contain"
        />
      ),
      headerRight: <HamburgerIcon navigationProps={navigation} />,
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchCategory");
          }}
        >
          <Image
            source={require("./../assets/Image/Search.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#95DE5F"
      },
      headerTintColor: "#fff"
    })
  },
  Tabs: {
    screen: TabNav
  }
});

const SecondActivity_StackNavigator = StackNavigator({
  Second: {
    screen: SecondActivity,
    navigationOptions: ({ navigation }) => ({
      title: "SecondActivity",
      headerLeft: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const ThirdActivity_StackNavigator = StackNavigator({
  Third: {
    screen: ThirdActivity,
    navigationOptions: ({ navigation }) => ({
      title: "ThirdActivity",
      headerLeft: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const MainPage = DrawerNavigator(
  {
    MainStack: {
      screen: FirstActivity_StackNavigator
    },

    SecondStack: {
      screen: SecondActivity_StackNavigator
    },

    ThirdStack: {
      screen: ThirdActivity_StackNavigator
    }
  },
  {
    contentComponent: Custom_Side_Menu,
    drawerWidth: Dimensions.get("window").width - 50,
    drawerPosition: "right"
  }
);

export default MainPage;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    alignItems: "center",
    justifyContent: "center"
  },
  sideMenuContainer: {
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    paddingTop: 20
  },

  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2
  },

  sideMenuIcon: {
    resizeMode: "contain",
    width: 28,
    height: 28
  },
  menuText: {
    fontSize: 15,
    color: "#222222"
  }
});
