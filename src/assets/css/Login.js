import {StyleSheet} from 'react-native';

const styles = StyleSheet.create ({
    
   container:{
     flex:1,
    backgroundColor:'#00a8ff'
   } ,
   
  textVorod :{
    marginTop:'8%',
    textAlign:'center',
    color:'white',
    fontSize:26
  },
  ImageLogin:{

   marginTop:'5%',
   width:'50%' ,
   height:'20%',
   marginLeft:'25%'
   
  },
  textInputs :{
   borderColor: 'rgba(0,0,0,1)',
   backgroundColor:'white',
    marginTop:'9%',
    marginLeft:'8%',
    marginRight:'8%',
    shadowColor:'green',
    shadowOffset:{width:0,height:10},
    shadowOpacity:0.7,
   textAlign:'center',
    fontSize:16,
    borderRadius:10
    ,height:45
    
  },
  buttonStyle :{
  borderColor: 'rgba(0,0,0,1)',
   backgroundColor:'white',
    marginTop:'5%',
    marginLeft:'8%',
    marginRight:'8%',
   textAlign:'center',
   borderRadius:10,
    padding: 10,
    shadowColor:'green',
    shadowOffset:{width:0,height:10},
    shadowOpacity:0.7,
    justifyContent:'center',
    height:45
  
  },
buttonEndStyle :{
 alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 15,
  borderColor: 'rgba(0,0,0,1)',
   backgroundColor:'white',
    marginLeft:'50%',
    marginRight:'2%',
   borderRadius:10,
    padding: 10,
    shadowColor:'green',
    shadowOffset:{width:0,height:10},
    shadowOpacity:0.7
  
  },


  textButton :{
    textAlign:'center',
    justifyContent:'center',
    fontSize:14

  },
   textButtonEnd :{
    textAlign:'center',
    justifyContent:'center',
    fontSize:10}


}
)
export default styles;
