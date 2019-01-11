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
  Dimensions,
  TextInput
} from "react-native";
import { Header } from "react-native-elements";
import SearchBar from "react-native-searchbar";
import styles from "./../../assets/css/Login";
import SwitchSelector from "react-native-switch-selector";
import { Mobile } from "./Mobile";
/*class SearchIcon extends Component {
 constructor() {
 
    super();
 
    this.state = {
      visible : true,
       items,
      results: []
    }
    
   this._handleResults = this._handleResults.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  _cancelControl()
{
  
     this.setState({visible:!this.state.visible});
    if(!this.state.visible)
    {
      this.searchBar.hide();
    }
    else
    {
       this.searchBar.show();
    }
   
      
}

  _handleResults(results) {
    this.setState({ results });
  }
handleQueryChange(text)
{
  this.props.handleQueryChange(text)
}

  render() {
 var ImageShow ;
   {this.state.visible ?
      ImageShow=   <Image
            source={require('./../../assets/Image/Search.png')}
            style={{ width: 25, height: 25, marginRight: 5}}
          />       
:
  ImageShow=null
   

}
    return (
      <View style={{ flexDirection: 'row' }}>
       i(this.searchBar.show())
 {
 <TouchableOpacity onPress={() => this._cancelControl()} >
 <View style={{flex:1,backgroundColor:'#003552',flexDirection:'row-reverse'}}> <View style={{position:'absolute',top:-50,backgroundColor:'#fff',flexDirection:'row-reverse'}}>
  <SearchBar      
          ref={(ref) => this.searchBar = ref}      
          data={items}
         onChangeText={() =>{ {this.handleQueryChange(this.text)}}}
          handleResults={this._handleResults}
          placeholder='جستجو محصول'
          onBack={() => this._cancelControl()}
        />
      </View> 
      </View> 
      {ImageShow}
        </TouchableOpacity>
 
 } 
      </View>    
    );
  }
}*/

export default class addAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: "",
      visible: true,
      fav: "",
      type: "",
      name: "",
      address: "",
      cityType: "1",
      results: []
    };
  }

  onChangename = text => {
    this.setState({ name: text });
  };
  onChangeaddress(text) {
    var newText = "";

    if (text.length < 1) {
      this.setState({ address: "" });
    }
    for (var i = 1; i < text.length; i++) {
      if (text.indexOf(text[i]) > -1) {
        text = text[i] + text[i - 1];
      }
      this.setState({ address: text });
    }
  }
  onPresses(values) {
    this.setState({ cityType: values });
  }

  addAddress(name, address, type) {
    var formData = new FormData();
    formData.append("number", Mobile["Call"].name);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("type", type);
    return fetch("http://roomarket.ir/LlIi1/add-address.php", {
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
        this.props.navigation.state.params.ScreenA.setState({ isCom: true });
        this.props.navigation.goBack();
      })
      .catch(error => {
        Alert.alert(error);
      });
  }

  render() {
    const options = [
      { label: "قم", value: "1" },
      { label: "پردیسان", value: "2" }
    ];
    return (
      <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: "افزودن آدرس", color: "white" }}
          backgroundColor="#95DE5F"
        />
        <View style={{ backgroundColor: "#ecf0f1" }}>
          <Text
            style={{
              marginTop: "8%",
              textAlign: "center",
              color: "black",
              fontSize: 12
            }}
          >
            لطفا نام و آدرس دقیق خود را وارد کنید
          </Text>
          <Image
            source={this.state.Value}
            style={styles.ImageLogin}
            resizeMode="contain"
          />
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
                fontSize: 16,
                borderRadius: 10,
                borderWidth: 1,
                height: 60
              }}
              placeholder="نام"
              onChangeText={text => this.setState({ name: text })}
            />
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
                fontSize: 16,
                borderRadius: 10,
                borderWidth: 1,
                height: 100
              }}
              placeholder="آدرس"
              onChangeText={text => this.setState({ address: text })}
            />
          </View>
          <View
            style={{ marginTop: 20, marginLeft: "40%", marginRight: "35%" }}
          >
            <SwitchSelector
              options={options}
              initial={0}
              onPress={value => this.onPresses(value)}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContents: "flex-end"
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", height: 50, backgroundColor: "#95DE5F" }}
            onPress={() => {
              this.addAddress(
                this.state.name,
                this.state.address,
                this.state.cityType
              );
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
              ذخیره آدرس
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
