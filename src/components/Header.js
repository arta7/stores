// Import libraries for making a component
import React from 'react';
import {Text, View,Dimensions,Image} from 'react-native';

// Make a component
const Header = (props) => {
    const {textStyle, viewStyle,rightImage,leftImage} = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
            <View style={{alignItems:'flex-start'}}>
            <Image source ={props.LeftIcon} style={leftImage} resizeMode='contain'/>
            </View>
            <View style={{alignItems:'flex-end'}}>
             <Image source ={props.RightIcon} style={rightImage} resizeMode='contain'/>
             </View>
        </View>
    );
};

// Styles for component
const styles = {
    viewStyle: {
        paddingTop: 15,
        paddingRight: 3,
        height: '11%',
        shadowColor: '#000',
        shadowOffset: {width:0, height: 2},
        shadowOpacity: 0.1,
        elevation: 1,
        backgroundColor:'#95DE5F',
        width:Dimensions.get('screen'),
        flexDirection:'row'
          
    },
    textStyle: {
        fontSize: 21,
        color:'white',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    rightImage :{
    width:30
    ,height:30,
    backgroundColor:'red'
    },
 leftImage :{
     justifyContentt:'flex-end',
     alignItems:'flex-end',
     width:30
    ,height:30,
    backgroundColor:'yellow'
    }   
     
};

// Make the component available to other parts of the app
export {Header};