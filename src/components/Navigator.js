import {StackNavigator,NavigationActions } from 'react-navigation';
import LoginAccept from './LoginAccept';
import Login from './Login';
import MainPage from './MainPage';
import MainCategory from './Search/MainCategory';
import SecondCategory from './Search/SecondCategory';
import ThirdCategory from './Search/ThirdCategory';
import MainList from './MainList/MainList';
import Hadieh from './MainList/Hadieh';
import Fav from './MainList/Fav';
import Splash from './Splash';
import SearchCategory from './Search/SearchCategory';
import SearchCategoryStatic from './Search/SearchCategoryStatic';
import SearchBrands from './Search/SearchBrands';
import Address from './MainList/Address';
import PaymentAddress from './MainList/PaymentAddress';
import Payment from './MainList/Payment';
import addAddress from './MainList/addAddress';
import AddMoney from './MainList/AddMoney';
import ShowPayment from './MainList/ShowPayment';
import Order from './MainList/Order';
import OrderHistory from './MainList/OrderHistory';
import Myinstagram from './Myinstagram';
import Mytelegram from './Mytelegram';
import Mysoroush from './Mysoroush';
import tameshk from './tameshk';
import Tameshkins from './Tameshkins';
import ShowOnline from './MainList/ShowOnline';
const Navigator = StackNavigator({
   Splash:{screen:Splash ,
   navigationOptions: {
        gesturesEnabled: false,
        headerLeft: null
    }},
   MainPage:{screen:MainPage,
   navigationOptions: {
        gesturesEnabled: false,
        headerLeft: null
    }},
  Login:{screen:Login,navigationOptions: {
        gesturesEnabled: false,
        headerLeft: null
    }}, 
  Myinstagram:{screen:Myinstagram},
  Mytelegram:{screen:Mytelegram},
  Mysoroush:{screen:Mysoroush},
  ShowOnline:{screen:ShowOnline},
  LoginAccept:{screen:LoginAccept,navigationOptions: {
        gesturesEnabled: false,
        headerLeft: null
    }},
  MainCategory:{screen:MainCategory},   
   SearchCategory:{screen:SearchCategory},
  SecondCategory:{screen:SecondCategory},
  ThirdCategory:{screen:ThirdCategory}, 
  SearchBrands:{screen:SearchBrands},
  MainList:{screen:MainList} ,
  Address:{screen:Address},
  tameshk:{screen:tameshk},
  Tameshkins:{screen:Tameshkins},
  PaymentAddress:{screen:PaymentAddress},
   Payment:{screen:Payment},
  addAddress:{screen:addAddress},
  ShowPayment:{screen:ShowPayment},
  Fav :{screen:Fav},
  Order:{screen:Order},
  OrderHistory:{screen:OrderHistory},
  SearchCategoryStatic:{screen:SearchCategoryStatic},
  Hadieh:{screen:Hadieh},
   AddMoney:{screen:AddMoney}
},{headerMode:'none'
,mode:'card'
});
export  {Navigator};
