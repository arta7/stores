import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  Alert,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import PopupDialog, {
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import Swiper from "react-native-swiper";
import { Navigator } from "./../Navigator";
import SecondCategory from "./../Search/SecondCategory";
import SearchCategory from "./../Search/SearchCategory";
import Hadieh from "./Hadieh";
import SearchBrands from "./../Search/SearchBrands";
import SearchCategoryStatic from "./../Search/SearchCategoryStatic";
import { Mobile } from "./Mobile";
import Toast, {DURATION} from 'react-native-easy-toast';
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class MainList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows([]),
      dateTime: "",
      isTime: false,
      dataVizheh: ds.cloneWithRows([]),
      dataJadid: ds.cloneWithRows([]),
      dataPorforosh: ds.cloneWithRows([]),
      brands2: ds.cloneWithRows([]),
      brands: ds.cloneWithRows([]),
      adver: [],
      mobile: "",
      imageJadid: false,
      favs: [],
      order: [],
      change: false,
      orderName: false,
      toz: ""
    };
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
              fontSize: 11,
              paddingTop: 8,
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
          paddingTop: 8,
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

  componentDidMount() {
    var formData = new FormData();
    formData.append("type", "show");
    formData.append("number", Mobile["Call"].name);
    setInterval(responseJson => {
      return fetch("http://Roomarket.ir/LlIi1/get-time.php")
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ dateTime: responseJson.result[0].credit });
        })
        .catch(error => {
          Alert.alert(error);
        });
    }, 1000);
    return fetch("http://roomarket.ir/LlIi1/OnlineShop.php")
      .then(response => response.json())
      .then(responseJson => {
        ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState(
          {
            dataSource: ds.cloneWithRows(responseJson.contacts || []),
            mobile: Mobile["Call"].name
          },
          function() {}
        );
      })
      .then(
        fetch("http://Roomarket.ir/LlIi1/get-special.php?id=2")
          .then(response => response.json())
          .then(responseJson => {
            ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState(
              {
                dataVizheh: ds.cloneWithRows(responseJson.special || [])
              },
              function() {}
            );
          })
      )
      .then(
        fetch("http://roomarket.ir/LlIi1/allk.php")
          .then(response => response.json())
          .then(responseJson => {
            ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState(
              {
                dataJadid: ds.cloneWithRows(responseJson.contacts || [])
              },
              function() {}
            );
          })
      )
      .then(
        fetch("http://Roomarket.ir/LlIi1/get-special.php?id=1")
          .then(response => response.json())
          .then(responseJson => {
            ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState(
              {
                dataPorforosh: ds.cloneWithRows(responseJson.special || [])
              },
              function() {}
            );
          })
      )
      .then(
        fetch("http://roomarket.ir/LlIi1/brands2.php")
          .then(response => response.json())
          .then(responseJson => {
            ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState(
              {
                brands2: ds.cloneWithRows(responseJson.contacts || [])
              },
              function() {}
            );
          })
      )
      .then(
        fetch("http://roomarket.ir/LlIi1/brands.php")
          .then(response => response.json())
          .then(responseJson => {
            ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState(
              {
                brands: ds.cloneWithRows(responseJson.contacts || [])
              },
              function() {}
            );
          })
      )
      .then(
        fetch("http://roomarket.ir/LlIi1/Adver.php")
          .then(response => response.json())
          .then(responseJson => {
            ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState({
              adver: responseJson.contacts[0]
            });
          })
      )
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
      .catch(error => {
        Alert.alert(error);
      });
  }

  pressesButton(name, title) {
    this.props.navigation.navigate("SecondCategory", {
      Name: name,
      Title: title
    });
  }

  showPopup(text) {
    this.setState({ toz: text });
    this.popupDialog.show();
  }

  vizhehshow() {
    this.showvizheh.show();
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
      <View style={{ flex: 1 }}>
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
        <ScrollView style={{ width: "auto", height: "auto" }}>
          <View style={{ height: 150 }}>
            <Swiper
              style={styles.wrapper}
              showsButtons={false}
              autoplay={true}
              autoplayTimeout={6}
            >
              <View style={styles.slide1}>
                <Image
                  source={{ uri: "http://roomarket.ir/slider/1.png" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                  }}
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.slide2}>
                <Image
                  source={{ uri: "http://roomarket.ir/slider/2.png" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                  }}
                  resize="stretch"
                />
              </View>
              <View style={styles.slide3}>
                <Image
                  source={{ uri: "http://roomarket.ir/slider/3.png" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                  }}
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.slide3}>
                <Image
                  source={{ uri: "http://roomarket.ir/slider/4.png" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                  }}
                  resizeMode="stretch"
                />
              </View>
            </Swiper>
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
              {"دريافت اعتبار هديه"}
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
          <View style={{ marginTop: 1 }}>
            <ListView
              horizontal={true}
              contentContainerStyle={{
                flexDirection: "row"
              }}
              dataSource={this.state.dataSource}
              renderRow={rowDatas => (
                <View
                  style={{
                    marginRight: 10,
                    marginBottom: 5,
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
                        fontSize: 14,
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
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
                  backgroundColor: "#00a8ff",
                  width: 150,
                  height: 35,
                  marginLeft: 10,
                  borderRadius: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    paddingRight: 10,
                    paddingLeft: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
                    paddingTop: 10
                  }}
                >
                  {this.state.dateTime}
                </Text>
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
              <Text style={{ color: "blue" }}>ويژه</Text>
            </View>

            <View style={{ marginRight: 10 }}>
              <Text>{"پيشنهاد"}</Text>
            </View>
          </View>
          {/* List Vizheh */}
          <ListView
            renderScrollComponent={props => (
              <InvertibleScrollView {...props} inverted />
            )}
            horizontal={true}
            contentContainerStyle={{
              flexDirection: "row-reverse"
            }}
            dataSource={this.state.dataVizheh}
            renderRow={(rowData, sectionId, rowId) => (
              <View
                style={{
                  backgroundColor: "white",
                  marginRight: 5,
                  marginLeft: 8,
                  marginBottom: 3,
                  marginTop: 20
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
                  style={{ width: "100%", height: 90 }}
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
                        {"توضيحات"}
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
                {rowData.op != null ? (
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 11,
                      marginBottom: 3,
                      color: "red",
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      textDecorationColor: "red"
                    }}
                  >
                    {" " + rowData.op}
                  </Text>
                ) : null}
                {rowData.np != null ? (
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 11,
                      marginBottom: 3
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
                    height: 40
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
                      style={{ marginLeft: 10, borderRadius: 5, marginTop: 7 }}
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
          {/* aks ketab */}
          <View
            style={{ marginTop: 5, marginLeft: 25, marginRight: 25, flex: 1 }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SearchCategoryStatic", {
                  Name: this.state.adver.name1
                });
              }}
            >
              <Image
                source={{ uri: this.state.adver.ax2 }}
                style={{ width: "100%", height: 150 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
          {/* list jadidha */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: 5
              }}
            >
              <Text style={{ color: "blue" }}>{"ترين ها"}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Text>{"جديد"}</Text>
            </View>
          </View>
          <ListView
            initialListSize={10}
            horizontal={true}
            contentContainerStyle={{
              flexDirection: "row"
            }}
            dataSource={this.state.dataJadid}
            renderRow={(rowData, sectionID, rowID) => (
              <View
                style={{
                  width: 150,
                  backgroundColor: "white",
                  marginRight: 5,
                  marginLeft: 8,
                  marginBottom: 3,
                  marginTop: 20
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
                  source={{ uri: rowData.ax.toString() }}
                  style={{ width: "100%", height: 90 }}
                  resizeMode="stretch"
                />
                {rowData.toz.trim() != "" ? (
                  <View style={{ flexDirection: "row" }}>
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
                        {"توضيحات"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
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
                  </View>
                )}
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
                {rowData.op != null ? (
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 11,
                      marginBottom: 3,
                      color: "red",
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      textDecorationColor: "red"
                    }}
                  >
                    {" " + rowData.op}
                  </Text>
                ) : null}
                {rowData.np != null ? (
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 11,
                      marginBottom: 3
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
                    height: 40
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
                      style={{ marginLeft: 10, borderRadius: 5, marginTop: 7 }}
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
          {/* aks bastabi amin */}
          <View
            style={{ marginTop: 5, marginLeft: 25, marginRight: 25, flex: 1 }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SearchCategoryStatic", {
                  Name: this.state.adver.name2
                });
              }}
            >
              <Image
                source={{ uri: this.state.adver.ax1 }}
                style={{ width: "100%", height: 150 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
          {/* list porforosh */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: 5
              }}
            >
              <Text style={{ color: "blue" }}>{"ترين ها"}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Text>{"پرفروش"}</Text>
            </View>
          </View>
          <ListView
            renderScrollComponent={props => (
              <InvertibleScrollView {...props} inverted />
            )}
            horizontal={true}
            contentContainerStyle={{
              flexDirection: "row-reverse"
            }}
            dataSource={this.state.dataPorforosh}
            renderRow={rowData => (
              <View
                style={{
                  width: 150,
                  //   height: 240,
                  backgroundColor: "white",
                  marginRight: 5,
                  marginLeft: 8,
                  marginBottom: 3,
                  marginTop: 20
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
                  style={{ width: "100%", height: 90 }}
                  resizeMode="contain"
                />
                {rowData.toz.trim() != "" ? (
                  <View style={{ flexDirection: "row" }}>
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
                        {"توضيحات"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
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
                  </View>
                )}

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
                      fontSize: 11,
                      marginBottom: 3,
                      color: "red",
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      textDecorationColor: "red"
                    }}
                  >
                    {" " + rowData.op}
                  </Text>
                ) : null}
                {rowData.np !== null ? (
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 11,
                      marginBottom: 3
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
                    height: 40
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
                      style={{ marginLeft: 10, borderRadius: 5, marginTop: 7 }}
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
          {/* aks lavazem arayeshi */}
          <View
            style={{ marginTop: 5, marginLeft: 25, marginRight: 25, flex: 1 }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SearchCategoryStatic", {
                  Name: this.state.adver.name3
                });
              }}
            >
              <Image
                source={{ uri: this.state.adver.ax3 }}
                style={{ width: "100%", height: 150 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
          {/* list berandhaie bartar */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: 5,
                marginTop: 5
              }}
            >
              <Text style={{ color: "blue" }}>{"محبوب"}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Text>{"برندهاي "}</Text>
            </View>
          </View>
          <ListView
            contentContainerStyle={{
              flexDirection: "row-reverse"
            }}
            dataSource={this.state.brands2}
            renderRow={rowData => (
              // toz
              <TouchableOpacity
                style={{
                  marginLeft: 5,
                  marginTop: 7,
                  marginRight: 5,
                  width: Dimensions.get("screen").width / 3 - 10
                }}
                onPress={() => {
                  this.props.navigation.navigate("SearchBrands", {
                    Names: rowData.name
                  });
                }}
              >
                <Image
                  source={{ uri: rowData.ax }}
                  style={{ width: "100%", height: 40, marginLeft: 3 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          />
          <ListView
            contentContainerStyle={{
              flexDirection: "row-reverse"
            }}
            dataSource={this.state.brands}
            renderRow={rowData => (
              //toztoz
              <TouchableOpacity
                style={{
                  marginLeft: 5,
                  marginTop: 7,
                  marginRight: 5,
                  width: Dimensions.get("screen").width / 3 - 10
                }}
                onPress={() => {
                  this.props.navigation.navigate("SearchBrands", {
                    Names: rowData.name
                  });
                }}
              >
                <Image
                  source={{ uri: rowData.ax }}
                  style={{ width: "100%", height: 40, marginLeft: 3 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.props.navigation.navigate("Order")}
          style={{
            position: "absolute",
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            right: 10,
            bottom: 5
          }}
        >
          <Image
            source={require("./../../assets/Image/shopping.png")}
            style={{
              resizeMode: "contain",
              width: 50,
              height: 50
            }}
          />
        </TouchableOpacity>
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  slide2: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  slide3: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: "10%"
  }
});
