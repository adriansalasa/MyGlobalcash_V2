/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, Image, StyleSheet, Alert, Linking, BackHandler} from 'react-native';
import {Text, Button, List, ListItem, Icon} from 'native-base';
import {CustomHeader} from '../../CustomHeader';
import {IMAGE} from '../../../constants/Image';
import FrmPinjam from '../../../screens/components/FrmPinjam';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getNasabah, setLoading} from '../../../redux/action/NasabahAction';
import {TEXT} from '../../../constants/env';
import axios from 'axios';
// import {getAbout} from '../../../redux/action/AboutAction';
import deviceStorage from '../../../services/deviceStorage.js';
import NewLogin from '../../../screens/LoginScreen';


export class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      sRek : false,
      jwt: null,
      errSrc: null,
      errSrcPh: null,
      firstName: '',
      lastName: '',
      fullName: '',
      csPhone: '',
      myID: 3,
      errCodeLogOut: null,
    };

    this.loadJWT = this.loadJWT.bind(this);
    this.loadJWT();
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);

    // this.loadAbout = this.loadAbout.bind(this);
    // this.loadAbout();

    this.handlerChangeValue = this.handlerChangeValue.bind(this);
  }

  handlerChangeValue(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }
  
  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      
      if (value !== null) {
        getNasabah(value);
        console.log('value' + value);
        // getNasabah(value);
         this.setState({
          jwt: value,
          // id_bank: this.props.nasabah.id_bank,

        });

        //this.setState({csPhone: '0219999999'});
    
      }
    } catch (error) {
      console.log('AsyncStorage search: ' + error.message);
    }
  }

  async loadAbout() {
    try {
      const nAbout = 1;
      //if (value !== null) {
       getAbout(nAbout);
      console.log('ini SEARCH TABS LOH ');
      //} 
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
 
  hagga(){
    Alert.alert(
      'Confirmation',
      'Apakah anda yakin akan keluar dari aplikasi..??',
      [{text: 'Confirm'}, {text: 'Cancel'}],
      {cancelable: false},
    );
  }

  showRek(){
    // <View>
    //   <FrmPinjam
    //     handlerChangeValue={this.handlerChangeValue}
    //     navigation={this.props.navigation}
    //   />
    // </View>
    // this.setState({sRek: true})
    this.props.navigation.navigate('BankInfo');
  }

  showPinjm() {
    this.props.navigation.navigate('His_Pinjam');
  }

  showBayar() {
    this.props.navigation.navigate('His_Bayar');
  }

  modPhone() {
    this.props.navigation.navigate('mod_Phone');
  }

  modPassword() {
    this.props.navigation.navigate('mod_Password');
  }

  usrSuggest() {
    this.props.navigation.navigate('usr_suggest');
  }

  GoAbout() {
    // this.props.navigation.navigate('AboutUs');
    this.props.navigation.navigate('mnAbout');
  }
  
  callNow() {
    // Linking.openURL(`tel:${'021 82408568'}`);
    Linking.openURL(`tel:${this.state.csPhone}`);
  }

  // callUs(){
  //   Alert.alert(
  //   // Linking.openURL(`tel:${0212345678}`)
  //   TEXT.TEXT_TITLE_APP,
  //   //'Telpon sekarang...??',
  //   this.state.csPhone,
  //   [
  //     {
  //       text: 'Cancel',
  //       onPress: ()=> console.log('tidak di klik'),
  //       style: 'cancel',
  //     },
  //     {text: 'Call', onPress: ()=> this.callNow()}
  //   ],
  //     {cancelable: false}
  //   );
  // }
  
  callUs(){ 
    Alert.alert(
      TEXT.TEXT_TITLE_APP,
      this.state.csPhone,
      [
        {
          text: 'Cancel',
          onPress: ()=> console.log('tidak di klik'),
          style: 'cancel',
        },
        {text: 'Call', onPress: ()=> this.callNow()}
      ],
        {cancelable: false}
      );
  }

  GoPPriv() {
    this.props.navigation.navigate('PPriv');
  }

  GoPPen() {
    this.props.navigation.navigate('PPen');
  }
  //  componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.exitNow);
  //  }

  //  componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.exitNow);
  //  }
   componentDidMount() {
    const {getNasabah} = this.props;
    const tmrFnd = setTimeout(() => {
      this.findNas();
    }, 200);
    const tmrPhone = setTimeout(() => {
      this.findPhone();
    }, 400);
   }

   logoutNow = ()=> {
    this.deleteJWT();
    //this.props.navigation.navigate('LoginScreen');
    //BackHandler.addEventListener('hardwareBackPress', this.props.navigation.navigate('Login'));
    // alert('okkk');
   //this.removeJWT();
    //console.log('jwtlogout2 : ' + this.state.jwt);
    this.props.navigation.navigate('Login');

    axios({
      method: 'post',
      url: `http://103.121.149.77:63003/recbgyn/${this.state.myID}`,
      headers: {},
      data: {
        Bgtime: 1,
        bgklik: 'y',
      },
    })
      .then(res => {
      console.log(res.data.data);
      const tmp_Logout = res.data.data.bgklik;
      console.log('tmp_Logout : ' + tmp_Logout);
      })
      .catch(err => {
        console.log('error eyy : ' + err.response.status);
      });
   }

   exitNow = ()=> {
    Alert.alert(
      'Keluar Aplikasi',
      'Apakah anda yakin akan keluar dari aplikasi..??',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        // {text: 'Confirm', onPress: () => BackHandler.exitApp()},
        {text: 'Confirm', onPress: () => this.logoutNow()},
      ],
      { cancelable: false });
      return true;
   }

  findNas() {
    axios({
      method: 'Get',
      url: `http://103.121.149.77:63003/nasabah/${this.state.jwt}`,
    })
      .then(res => {
        const fndData = res.data;
        //console.log('tesss');

        this.setState({errSrc: res.status});
        if (this.state.errSrc === 200) {
          // this.props.getNasabah(this.state.jwt);
          // clearInterval(this.MyTimer);
          // console.log(fndData);
          // console.log('bisssaaa');
          this.setState({firstName: fndData.nasabah.nama_depan});
          this.setState({lastName: fndData.nasabah.nama_belakang});
          this.setState({fullName: this.state.firstName + ' ' + this.state.lastName});
          // console.log(this.state.fullName);
        }
      })
      .catch(err => {
        this.setState({errSrc: err.response.status});
        // console.log(this.state.errCode);
      });
  }

  findPhone() {
    axios({
      method: 'Get',
      url: `http://103.121.149.77:63003/csphones`,
    })
      .then(res => {
        const fndPhone = res.data.datas;
        //console.log(fndPhone);
        
        this.setState({errSrcPh: res.status});
       // console.log(this.state.errSrcPh);
        if (this.state.errSrcPh === 200) {
          this.setState({csPhone: fndPhone.nmrTelepon});
          // console.log('csPhones : ' + this.state.csPhones);
        }
      })
      .catch(err => {
        this.setState({errSrcPh: err.response.status});
        // console.log(this.state.errCode);
      });
  }

  render() {
    const {nasabah} = this.props;
    
    return ( 
      // <View>
      // <Text>{nasabah}</Text>
      // </View>
        <SafeAreaView style={{flex: 1, backgroundColor: ['#eee8e7']}}>
          
          <View
            style={{
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#4c669f',
            }}>
            <View style={styles.OptionsBaris}>
              <View style={styles.Label}>
                <Text style={{color: 'white'}}>Hai, {this.state.fullName} </Text>
                {/* {this.props.getNasabah('082298345678')} */}
              </View>
              {/* <Text style={styles.labelText}>:</Text> */}
              <View style={styles.labelTextRight}>
                <Text style={{color: 'white'}} onPress={() => this.exitNow()}>EXIT</Text>
              </View>
            </View>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri:
                  'data:image/jpeg;base64,oius7a9sd9/1585531513998-profileurl.jpg',
              }}
            />
          </View>
          <ScrollView>
            <View style={{marginTop: 10}} />
            <View style={{backgroundColor: 'white'}}>
              <List>
                {/* <ListItem onPress={() => this.props.navigation.navigate('Setting')}>
                <Text>History Pembayaran</Text>
              </ListItem> */}
                <ListItem onPress={() => this.showBayar()}>
                  <Image source={IMAGE.HisPay} style={{width: 30, height: 30}} />
                  <Text style={styles.bgSett} onPress={() => this.showBayar()}> History Pembayaran</Text>
                </ListItem>
                <ListItem onPress={() => this.showPinjm()}>
                  <Image source={IMAGE.NewHis} style={{width: 30, height: 30}} />
                  <Text style={styles.bgSett} onPress={() => this.showPinjm()}> History Pinjaman</Text>
                </ListItem>
                <ListItem onPress={() => this.showRek()}>
                  <Image source={IMAGE.Card} style={{width: 25, height: 20, marginLeft: 3}} />
                  <Text style={styles.bgSett} onPress={() => this.showRek()}>  Info Rekening Bank</Text>
                </ListItem>
                <ListItem onPress={() => this.modPassword()}>
                  <Image source={IMAGE.Password} style={{marginLeft: 3}} />
                  <Text style={styles.bgSett} onPress={() => this.modPassword()}> Ubah kata sandi</Text>
                </ListItem>
                <ListItem onPress={() => this.modPhone()}>
                  <Image source={IMAGE.PhoneNo} style={{width: 20, height: 20, marginLeft: 3}} />
                  <Text style={styles.bgSett} onPress={() => this.modPhone()}>    Ubah nomor telpon</Text>
                </ListItem>
                <ListItem onPress={() => this.usrSuggest()}>
                  <Image source={IMAGE.Saran} style={{width: 25, height: 26, marginLeft: 2}} />
                  <Text style={styles.bgSett} onPress={() => this.usrSuggest()}>   Saran Pengguna</Text>
                </ListItem>
              </List>
            </View>
            {/* </ScrollView> */}
            <View style={{marginTop: 10}} />
            {/* <ScrollView> */}
            <View style={{backgroundColor: 'white'}}>
              <List>
                <ListItem onPress={() => this.GoPPen()}>
                <Image source={IMAGE.List2} style={{width: 25, height: 26, marginLeft: 2}}/>
                  <Text style={styles.bgSett}>  Perjanjian Pendaftaran Pengguna</Text>
                </ListItem>
                <ListItem onPress={() => this.GoPPriv()}>
                <Image source={IMAGE.List1}style={{width: 25, height: 26, marginLeft: 2}} />
                  <Text style={styles.bgSett}>  Perjanjian Privasi kemudian</Text>
                </ListItem>
              </List>
            </View>

            <View style={{marginTop: 10}} />
            <View style={{backgroundColor: 'white'}}>
              <List>
                <ListItem>
                  <Image source={IMAGE.ContactUs} />
                  <Text style={styles.bgSett} onPress={() => this.callUs()}>  Contact Us</Text>
                </ListItem>
                <ListItem onPress={() => this.GoAbout()}>
                  <Image source={IMAGE.AboutUs}style={{width: 25, height: 26, marginLeft: 2}} />
                  <Text style={styles.bgSett} onPress={() => this.GoAbout()}>   About Us</Text>
                </ListItem>
              </List>
            </View>
          </ScrollView>
        </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  bgSett: {
    fontSize: 14,
    color: 'grey',
  },
  OptionsBaris: {flexDirection: 'row', marginTop: 20},

  Label: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
    left: 6,
  },

  lblAlert: {
    marginLeft: 90,
  },

  labelTextRight: {
    marginRight: 12,
  },
  Container: {
    backgroundColor: '#bdd9e2',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

const mapStoreToProps = state => ({
  nasabah: state.nasabah.nasabah,
  about: state.about.about,
});
const mapDispatchToProps = dispatch => ({
  getNasabah: mobile => dispatch(getNasabah(mobile)),
  getAbout: id => dispatch(getAbout(id)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(Search);
