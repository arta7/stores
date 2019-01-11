import React,{Component} from 'react';
import styles from './../assets/css/Login';
import {Navigator} from './Navigator';
import MainPage from './MainPage';
import {View,Text,Image,TextInput,TouchableOpacity,Alert ,ActivityIndicator,AsyncStorage} from 'react-native';
import {Mobile} from './MainList/Mobile';
export default class LoginAccept extends Component {
constructor(props)
{
  super(props)
 
  this.state = { 
       Code:'',
       Mobiles:'',
       isLoading:false,buttonVisible:false
       }
}
onChange(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
        if ( numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }   
    this.setState({Code: newText})
   
}

  

async _setData(mobile){
  try {
    await AsyncStorage.setItem('mobile', mobile);
      await AsyncStorage.setItem('Sex', this.props.navigation.state.params.Sex);
  } catch (error) {
    // Error saving data
  }
}







onPressesButton(code,mobile){
this.setState({isLoading: true,buttonVisible:true});
fetch('http://roomarket.ir/LlIi1/verify.php?number='+mobile +'&code='+code, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}).then((response) => response.json())
    .then((response) => {
     if(response.result[0].credit.toString() == '1')
     {
        Alert.alert('کد وارد شده اشتباه است');
        this.setState({isLoading: false,buttonVisible:false});
     }
     else
     {   this.setState({isLoading: true,buttonVisible:false});
          this._setData(mobile);
          Mobile['Call'].name = mobile;
           this.props.navigation.navigate('MainPage',{Mobile : mobile,Sex:this.props.navigation.state.params.Sex});
     }
    }).catch((error) => {
      Alert.alert(error);
    });
}

 render() {
   const { Mobile } = this.props.navigation.state.params;
   if(this.state.isLoading){
   <View style={{marginTop:15}}>
          <ActivityIndicator  size="large" color="red" />
    </View>
    }
    return (
     <View style = {styles.container}>
     <Text style = {styles.textVorod}>ورود</Text>  
 <View>
      <TextInput style = {styles.textInputs}  
      keyboardType={'numeric'}   
      autoFocus = {true}
       placeholder ="کد"   onChangeText = {(text)=> this.onChange(text)}/>
<TouchableOpacity style={styles.buttonStyle} onPress={()=> this.onPressesButton(this.state.Code,Mobile)} disabled={this.state.visibleButton}>
<Text style={styles.textButton}>تایید</Text>
</TouchableOpacity>
</View>

<TouchableOpacity  style={styles.buttonEndStyle} onPress={() =>  this.props.navigation.goBack()}>
<Text style={styles.textButtonEnd}> شماره تلفن خود را اشتباه وارد کردید؟  </Text>
</TouchableOpacity>


     </View>
    );
  }
}