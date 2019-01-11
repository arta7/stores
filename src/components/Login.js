import React,{Component} from 'react';
import styles from './../assets/css/Login';
import {View,Text,Image,TextInput,TouchableOpacity,Alert,ActivityIndicator,AsyncStorage  } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {Navigator} from './Navigator';
import LoginAccept from './LoginAccept';
import MainPage from './MainPage';
export default class Login extends Component {
  constructor()
  {
       super()
       this.state = { Value :require('./../assets/Image/Male.png'),
       Sex:'male',
       Mobile:'',buttonVisible:false,
       isLoading:false
       }


  }


  
onPressesButton(sex,mobile){
  
this.setState({isLoading: true,buttonVisible:true});
fetch('http://roomarket.ir/LlIi1/send-code.php?number='+mobile+'&name=SiteSignIn&sex='+sex, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

}).then((response) => response.json())
    .then((response) => {
     if(response['result']['status'] == 'error')
     {
        this.setState({isLoading: false,buttonVisible:false});
        Alert.alert('لطفا شماره را درست وارد کنید');
     }
     else 
     {     this.setState({isLoading: true,buttonVisible:false});
           this.props.navigation.navigate('LoginAccept',{Mobile : this.state.Mobile,Sex:this.state.Sex});
     }
   
    })
   
    .catch((error) => {
      Alert.alert(error);
    });
}
onChange(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
        if ( numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }   
    this.setState({Mobile: newText})
}
  onPresses(values)
  {
   if(values != '1')
    {
     
      this.setState({Sex :'female'});
    } 
    else
    {
    
      this.setState({Sex :'male'});
    }
  }
  
  onChanged(text){
   var newText = '';
   var numbers = '0123456789';
   if(text.length < 1){
     this.setState({ mobile: '' });
   }
   for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
             newText = newText + text[i];
        }
        this.setState({ mobile: newText });
    }
}
  render() {
    var ImageAks;
    const options = [
    { label: 'آقا', value: '1' },
    { label: 'خانم', value: '2' }
];
if(this.state.Sex == 'male')
{
  ImageAks = <Image source={require('./../assets/Image/Male.png')} 
   style ={styles.ImageLogin}  resizeMode='contain'
   />
}
else
{
    ImageAks = <Image source={require('./../assets/Image/Female.png')} 
   style ={styles.ImageLogin}  resizeMode='contain'
   />
}
if(this.state.isLoading){
   <View style={{marginTop:15}}>
          <ActivityIndicator  size="large" color="red" />
    </View>
    }
    return (
     <View style = {styles.container}>
     <Text style = {styles.textVorod}>ورود</Text>
<View style= {{marginTop:20,marginLeft:'40%',marginRight:'40%'}}>
<SwitchSelector  options={options} initial={0} onPress={(value) => this.onPresses(value)}  />
</View>
      {
        ImageAks
      } 
      {/* resizeMode='contain'/> */}
     
 <View>
      <TextInput style = {styles.textInputs}
      maxLength={11} 
      autoFocus = {true} 
       placeholder ="تلفن همراه (الزامی)"  onChangeText = {(text)=> this.onChange(text)}/>
<TouchableOpacity style={styles.buttonStyle} disabled={this.state.buttonVisible}
onPress={()=> this.onPressesButton(this.state.Sex,this.state.Mobile)}
 >
<Text style={styles.textButton}>ورود</Text>
</TouchableOpacity>
</View>


     </View>
    );
  }
}