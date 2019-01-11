import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import {Header} from './Header';
import styless from './../assets/css/MenuBar';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'

const Sliding_Drawer_width=310;

export default class test extends Component {
  constructor(props){
    super(props);
    this.Animation = new Animated.Value(0);
    this.Sliding_Drawer_Toggle=true;
  }

  ShowSlidingDrawer(){
    if(this.Sliding_Drawer_Toggle===true){
      Animated.timing(this.Animation,{
        toValue:1,
        duration:500
      }).start(()=>
      {this.Sliding_Drawer_Toggle=false}
    );
    }
    else{
      Animated.timing(this.Animation,{
        toValue:0,
        duration:500
      }).start(()=>
      {this.Sliding_Drawer_Toggle=true}
    );
    }
  }
  render() {
    const Animation_Interpolate = this.Animation.interpolate(
      {
        inputRange:[0,1],
        outputRange:[-(Sliding_Drawer_width-32),0]
      }
    );
    return (
     
      <View style={styles.container}>
      
              <Animated.View style={[styles.Root_Sliding_DrawerContainer,{transform:[{
          translateX:Animation_Interpolate
        }]}]}>
          <View style={styles.Main_Sliding_Drawer_Container}>

          <View style={styless.ViewMenu}> 
          <TouchableOpacity style={styless.AddButton}>
          
          <Text> hellow</Text>
          </TouchableOpacity>
          </View>
          </View>
          <TouchableOpacity onPress={this.ShowSlidingDrawer.bind(this)} style={{padding:1
}}>
            <Image source={require('./../assets/Image/Menu.png')} style={styles.ImageStyle} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'Row',
    Bottom:0
  },
  textStyle:{
    fontSize:18,
    color:'#000'
  },
  Root_Sliding_DrawerContainer:{
    flex:1,
    flexDirection:'row',
    bottom:0,
    top:(Platform.OS==='ios')?20:0,
    width:Sliding_Drawer_width,
    backgroundColor:'yellow',
    justifyContent:'flex-start'

    
  },
  Main_Sliding_Drawer_Container:{
flex:1,
    backgroundColor:'#FFC107',
    paddingHorizontal:10
  },
  ImageStyle:{
    resizeMode:'contain',
    width:50,
    height:50,
    backgroundColor:'blue',
    alignItems:'flex-start'
    
  }

});
