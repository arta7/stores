import React, { Component } from 'react';
import {
  View,
  ListView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Dimensions,AsyncStorage
} from 'react-native';
import { Header } from 'react-native-elements';
import SearchBar from 'react-native-searchbar';
import {Mobile} from './Mobile';
import Toast, {DURATION} from 'react-native-easy-toast';
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: '',
      visible: true,
      type: 'show',
      total: 0,
      results: [],
      products: [],
    };
  }


  handlePlus = id => {};

  addItem(name, count) {
    var formData = new FormData();
    formData.append('order', name);
    formData.append('count', count);
    formData.append('number', Mobile['Call'].name);
    return fetch('http://roomarket.ir/LlIi1/edit-order.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
		   this.componentDidMount();
      })
      .catch(() => {
        Alert.alert('error');
      });
  }
  
  removeItem(name, count) {
    var formData = new FormData();
    formData.append('order', name);
    formData.append('count', count);
    formData.append('number', Mobile['Call'].name);
    return fetch('http://roomarket.ir/LlIi1/edit-order.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
		   this.componentDidMount();
      })
      .catch(() => {
        Alert.alert('error');
      });
  }
  changeItem(name, count, type) {
    if (type == 1) {
      var number = parseInt(count, 10) + 1;
      this.addItem(name, number);
       this.componentDidMount();
    } else if (type == 2) {
      var numbers = parseInt(count, 10) - 1;
      if (numbers > 0) {
        this.removeItem(name, numbers);
         this.componentDidMount();
      } else {
        Alert.alert('لطفا برای حذف این محصول از دکمه حذف استفاده کنید');
      }
    } else {
      this.removeItem(name, numbers);
       this.componentDidMount();
    }
  }
renderProduct(price,count)
{
    return (parseInt(price,10) * parseInt(count,10)).toString() +  'تومان';
}


  showCount(text) {
    for (const i in this.state.order) {
      if (this.state.order[i].id == text)
        return (
          <Text
            style={{
              fontSize: 11,
               paddingTop: 8,
              paddingRight: 5,
              justifyContents: 'center',
              alignItems: 'center',
              color: '#fa983a',
            }}>
            {' '}
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
          justifyContents: 'center',
          alignItems: 'center',
        }}>
        {' '}
        افزودن به سبد خريد
      </Text>
    );
  }

  renderSum() {
    var totals = 0;
    for (const i in this.state.products) {
      totals += parseInt(this.state.products[i].total, 10);
    }

    return totals;
  }
 renderAjnas() {
    var totals = '';
    for (const i in this.state.products) {
      totals += this.state.products[i].name + '\n';
    }

    return totals;
  }

   renderTedad() {
    var totals = '';
    for (const i in this.state.products) {
      totals += this.state.products[i].count + '\n';
    }
    return totals;
  }



  componentDidMount() {
    var formData = new FormData();
    formData.append('type', 'show');
    formData.append('number', Mobile['Call'].name);
    return fetch('http://roomarket.ir/LlIi1/user-order2.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.setState({
          isLoading: false,

          dataSource: ds.cloneWithRows(responseJson.factor || []),
          products: responseJson.factor,
        });
      })

      .catch(() => {
        Alert.alert('error');
      });
  }

  removeOrder(name) {
    var formData = new FormData();
    formData.append('order', name);
    formData.append('type', 'remove');
    formData.append('number',Mobile['Call'].name);
    return fetch('http://roomarket.ir/LlIi1/user-order.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.componentDidMount();
      })
      .catch(() => {
        Alert.alert('error');
      });
  }
  
  removeAllOrder() {
    var formData = new FormData();
    formData.append('type', 'rmall');
    formData.append('number', Mobile['Call'].name);
    return fetch('http://roomarket.ir/LlIi1/user-order.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.componentDidMount();
      })
      .catch(() => {
        Alert.alert('error');
      });
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
      <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        <Header
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => this.props.navigation.goBack(),
          }}
          centerComponent={{ text: 'سبد خرید' }}
          rightComponent={
            <TouchableOpacity  onPress={() => {
                this.removeAllOrder();
              }}>
            <Image
              source={require('./../../assets/Image/trash2.png')}
              style={{ width: 30, height: 40 }}
              resizeMode="contain"
             
            />
              </TouchableOpacity>
          }
          backgroundColor="#95DE5F"
        />

        <View style={{ flex: 1 }}>
          <ScrollView>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData, sectionID, rowID) => (
                <View>
                  <View
                    style={{
                      width: '95%',
                      // height:305,
                      backgroundColor: 'white',
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      marginTop: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}>
                      <View style={{ width: '70%' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                            onPress={() =>
                              this.changeItem(rowData.name, rowData.count, 2)
                            }>
                            <Image
                              source={require('./../../assets/Image/mines.png')}
                              style={{
                                width: 20,
                                height: 20,
                                marginLeft: 20,
                                marginTop: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              marginTop: 30,
                              marginLeft: 10,
                              marginRight: 5,
                            }}>
                            {rowData.count}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              this.changeItem(rowData.name, rowData.count, 1)
                            }>
                            <Image
                              source={require('./../../assets/Image/plus.png')}
                              style={{
                                width: 20,
                                height: 20,
                                marginTop: 30,
                                marginLeft: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            height: 40,
                            marginBottom: 5,
                            marginLeft: 10,
                          }}>
                          <Text
                            style={{
                              textAlign: 'right',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              fontSize: 14,
                              marginBottom: 5,
                              marginRight: 5,
                              marginTop: 2,
                            }}>
                            {rowData.name}
                          </Text>
                        </View>
                        {rowData.op != null ? (
                          <Text
                            style={{
                              textAlign: 'right',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              fontSize: 14,
                              marginBottom: 5,
                              marginRight: 5,
                            }}>
                            قیمت رومارکت : {rowData.np}
                          </Text>
                        ) : null}
                      </View>
                      <View
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          width: '30%',
                        }}>
                        <Image
                          source={{ uri: rowData.ax }}
                          style={{
                            width: '100%',
                            height: 100,
                            marginBottom: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          resizeMode="stretch"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 30,
                        backgroundColor: '#ecf0f1',
                        marginBottom: 5,
                        marginRight: 3,
                        marginLeft: 3,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 20,
                        }}>
                        <TouchableOpacity
                          style={{
                            justifyContents: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              justifyContents: 'center',
                              alignItems: 'center',
                            }}>
                            جمع نهایی :  {rowData.total}  تومان
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <TouchableOpacity
                          style={{
                            marginRight: 10,
                            borderRadius: 5,
                            marginTop: 2,
                          }}
                          onPress={() => {
                            this.removeOrder(rowData.name);
                          }}>
                          <Image
                            source={require('./../../assets/Image/trash1.png')}
                            style={{ width: 20, height: 20, marginRight: 3 }}
                            resizeMode="stretch"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#ecf0f1',
            height: 25,
          }}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text> {this.renderSum()} تومان</Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={{ paddingBottom: 5 }}> جمع کل</Text>
          </View>
        </View>
        <View
          style={{
            bottom: 0,
            height: 50,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContents: 'flex-end',
          }}>
          <TouchableOpacity
            style={{ width: '100%', height: 50, backgroundColor: '#95DE5F' }}
            onPress={() => {
              this.props.navigation.navigate('PaymentAddress', {
                Price: this.renderSum(),Ajnas:this.renderAjnas(),Tedad:this.renderTedad(),
              });
            }}>
            <Text
              style={{
                fontSize: 15,
                justifyContents: 'center',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: 14,
                color: 'white',
              }}>
              انتخاب آدرس
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
