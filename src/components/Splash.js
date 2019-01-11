import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  AsyncStorage,
  NetInfo,
  Alert,
  Text,TouchableOpacity
} from 'react-native';
import MainList from './MainList/MainList';
import { Navigator } from './Navigator';
import PopupDialog, {
  DialogTitle,
  DialogButton,
} from 'react-native-popup-dialog';
import {Mobile} from './MainList/Mobile';
export default class Splash extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isTimer: true,
      mobiles: null,
      sex: null,
      connect: true,
    };
  }

  async _retrieveData() {
    try {
      const value = await AsyncStorage.getItem('mobile');
      const valueSex = await AsyncStorage.getItem('Sex');
      if (value !== null && value != '') {
        Mobile['Call'].name = value;
        this.setState({ mobiles: value, sex: valueSex });
        return value;
      }
      else
      {
        this.props.navigation.navigate('Login')
      } 
    } catch (error) {
      Alert.alert(error);
    }
  }

  handleConnectionChange = isConnected => {
    this.setState({ connect: isConnected });
  };
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
    NetInfo.isConnected
      .fetch()
      .done(isConnected => this.setState({ connect: isConnected }));

   if(!this.state.connect)
   {
      this.popupDialog.show();
   }
   else
   {
    this._retrieveData().then(isLoad => {
      if (isLoad) {
        this.props.navigation.navigate('MainPage', {
          
          Mobile: this.state.mobiles !== null ? this.state.mobiles : '',
          Sex:
            AsyncStorage.getItem('Sex') !== null
              ? AsyncStorage.getItem('Sex')
              : '',
        });
      }
    });
  
   }
  }

  render() {
    
    if (this.state.connect) {
      if (this.state.isLoading) {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>         
            <Image
              source={require('./../assets/Image/roomarketsmall.png')}
              style={{ width: 130, height: 60 }}
              resizeMode="contain"
            />
            <ActivityIndicator size="large" style={{ marginTop: 40 }} />
           
          </View>
        );
      }
    } 
    else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>       
          <PopupDialog
           dialogTitle={<DialogTitle title="لطفا اتصال به اینترنت خود را چک کنید" titleTextStyle ={{color:'white'}} titleStyle={{backgroundColor:'#95DE5F'}}  />}
            dialogStyle={{ backgroundColor: '#ecf0f1' }}
            width={280}
            height={400}
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 50,
                paddingLeft: 50,
              }}>
              <Image
                source={require('./../assets/Image/Internet.png')}
                style={{ width: '70%', height: '65%' }}
                resizeMode="contain"
              />
               </View>
<TouchableOpacity style={{width:'92%',height:50,backgroundColor:'white',marginLeft:10,marginRight:10,bottom:10,borderRadius:10,borderWidth:1,borderColor:'#00a8ff',position:'absolute'}} onPress={()=>this.componentDidMount()}>
 <Text style={{fontSize:17,textAlign:'center',justifyContents:'center',alignItems:'center',paddingTop:10}}>تلاش مجدد</Text>
</TouchableOpacity>

           
          </PopupDialog>
        </View>
      );
    }
  }
}
