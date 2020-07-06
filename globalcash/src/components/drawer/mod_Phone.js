/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native';
import {Text, List, ListItem, Picker} from 'native-base';
import {CustomHeader} from '../CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {JatuhKebawah, Btn, Btn_Blue} from '../../screens/commons/';
import {getNasabah, setLoading} from '../../redux/action/NasabahAction';
import {connect} from 'react-redux';
import axios from 'axios';
import Moment from 'moment';
import Reinput from 'reinput';
import {IMAGE} from '../../constants/Image';
import {saveMobile} from '../../redux/action/RegisterAction';
import deviceStorage from '../../services/deviceStorage.js';

export class mod_Phone extends Component {
  constructor(props){
    super(props);

    this.state = {
      jwt: null,
      dt_Hist: '',     
      loopDt: [],
      loopDt2: [],
      hisDt: [],
      dt2: [],
      hidePassword: true,
      userPassword: '',
      noKTP: '',
      newTlp: '',
      otpGenerate: '',
      Countdown: 0,
      disableMobile: false,
      disableOTP: false,
      mobile: '',
      vCode: '',
    }
    
      
    // this.loadJWT = this.loadJWT.bind(this);
    // this.loadJWT();
    // this.newJWT = this.newJWT.bind(this);    
    // this.loadJWT = deviceStorage.loadJWT.bind(this);
    // this.loadJWT();
    // this.cekPassword = this.cekPassword.bind(this);
    this.handlerChangeValue = this.handlerChangeValue.bind(this);
    this.newJWT = this.newJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
    // this.loadJWT = this.loadJWT.bind(this);
    // this.loadJWT();
  }


  // async loadJWT() {
  //   try {
  //     const value = await AsyncStorage.getItem('id_token');
  //     if (value !== null) {
  //       this.props.getNasabah(value);
  //       this.setState({
  //         jwt: value,
  //         loading: false,
  //       });
  //     } else {
  //       this.setState({
  //         loading: false,
  //       });
  //     }
  //   } catch (error) {
  //     console.log('AsyncStorage Error: ' + error.message);
  //   }
  // }

  newJWT(jwts) {
    this.setState({
      jwt: jwts,
    });
  }

  showPasswordVisibility = () => {
      this.setState({hidePassword: !this.state.hidePassword});
  }

  saveno = (textNo) => {
    this.setState({userPassword: textNo})
  }

  saveNoKTP = (eKTP) => {
      this.setState({noKTP: eKTP})
  } 

  saveNewTlp = (nTlp) => {
    this.setState({newTlp: nTlp});
    // deviceStorage.saveKey('id_token', this.state.newTlp);
}

  confirmCode = (oCode) => {
    this.setState({vCode: oCode});
  }

  cekPassword() {
    //   alert('password : ' + this.state.userPassword + "\n" + 'KTP :' + this.state.noKTP + "\n" + 'New Telepon : ' + this.state.newTlp)
    
    if (!this.state.userPassword || !this.state.noKTP || !this.state.newTlp) {
      alert('lengkapi dulu form');
    // alert(this.state.norek_cust);
    } else {
      axios({
        method: 'put',
        url: `http://103.121.149.77:63003/phoneUpdate/${this.state.noKTP}`,
        headers: {},
        data: {
          mobile: this.state.newTlp,
        },
      })
        .then(res => {
          // alert(res.data.message);
          deviceStorage.saveKey('id_token', this.state.newTlp);
          this.newJWT(this.state.newTlp);
          // this.props.saveMobile(this.state.newTlp);
          this.cKTP.clear();
          this.cLogin.clear();
          this.cPhone.clear();
          this.cKode.clear();
          alert(res.data.message);
          // this.loadJWT();
        })
        .catch(err => {
          //handle error
          console.log(err);
        });
    }
  }


  generateOTP() {
    this.setState({disableOTP: true});
    let OTP = Math.floor(1000 + Math.random() * 9000);
    this.setState({otpGenerate: OTP});
    // this.setState({Countdown: 60});
    // setInterval(() => this.startTimer(60), 1000);
    this.setState({disableMobile: true});
    alert(
      `Kode OTP sudah dikirim ke ${
        this.state.mobile
      }, jangan berikan kode ke orang lain. ${OTP}`,
    );
    axios.get(
      `http://103.121.149.77/index.php?app=ws&u=fadli&h=98b5123f9036db51c6e601e9daeb949d&op=pv&to=${
        this.state.mobile
      }&msg=${OTP}, jangan berikan kode ini ke orang lain`,
    );
    //send SMS
  }

   handlerChangeValue(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: ['#eee8e7']}}>
      {/* <ScrollView> */}
        <View style={{ backgroundColor: 'white'}}>

            <CustomHeader
            title="Ubah nomor telpon"
            navigation={this.props.navigation}
            />
            
            <List>
                <ListItem>
                    <View style={styles.OptionsPeriod}>
                        <View style={{left: 2}}>
                            <Text style={styles.labelSub}>Nomor KTP</Text> 
                        </View>
                        <View style={{right: 70, marginTop: 20}}>
                            <TextInput ref={input => {this.cKTP = input}} placeholder = "Masukan nomor KTP anda" style={{fontSize: 15, color: '#cbcbcb'}} onChangeText={this.saveNoKTP}></TextInput>
                        </View>
                    </View>
                </ListItem>

                <ListItem>
                    <View style={styles.OptionsPeriod}>
                        <View style={{left: 2}}>
                            <Text style={styles.labelSub}>Login Password</Text> 
                        </View>
                        <View style={{right: 100, marginTop: 20}} >
                            <TextInput ref={input => {this.cLogin = input}} placeholder = "Masukan password login anda" style={{fontSize: 15}} underlineColorAndroid = "transparent" onChangeText={this.saveno} secureTextEntry={this.state.hidePassword}></TextInput>
                                <TouchableOpacity
                                    activeOPacity={0.8}
                                    style={styles.touchableButton}
                                    onPress={this.showPasswordVisibility}>

                                    <Image 
                                        source= {this.state.hidePassword
                                            ? require('../../assets/images/small_pass_visible.png')
                                            : require('../../assets/images/small_pass_invisible.png')
                                        } 
                                        style={styles.buttonImage}
                                    />
                                </TouchableOpacity>
                        </View>
                    </View>
                </ListItem>
            </List>
        </View>
        
            <View style={{marginTop: 10}} />                            
            <View style={{backgroundColor: 'white'}}>
                <List>
                    <ListItem>
                        <View style={styles.OptionsPeriod}>
                            <View style={{left: 2}}>
                                <Text style={styles.labelSub}>Nomor telpon baru</Text> 
                            </View>
                            <View style={{right: 115, marginTop: 20}}>
                                <TextInput keyboardType="number-pad" ref={input => {this.cPhone = input}} placeholder = "Masukan nomor telpon baru anda" style={{fontSize: 15, color: '#cbcbcb'}} onChangeText = {this.saveNewTlp} ></TextInput>
                            </View>
                        </View>
                    </ListItem>

                    <ListItem>
                        <View style={styles.OptionsPeriod}>

                        <View style={{ marginLeft: 60, left: 180, marginTop: 15, backgroundColor: '#e8f5fd', width: 80, position: 'absolute'}}>
                            <Text style={{textAlign: 'center', color: '#4891ff', height: 25}} onPress={()=> this.generateOTP()}>
                                Send
                            </Text>
                            {/* <Btn_Blue title="Send" onPress={this.generateOTP} /> */}
                        </View>
                            <View style={{left: 2}}>
                                <Text style={styles.labelSub}>Verifikasi kode Sms</Text> 
                            </View>
                            <View style={{right: 120, marginTop: 20}} >
                                <TextInput keyboardType="number-pad" ref={input => {this.cKode = input}} placeholder = "Masukan kode verifikasi sms" style={{fontSize: 15, color: '#cbcbcb'}} onChangeText = {this.confirmCode} ></TextInput>
                            </View>
                        </View>
                    </ListItem>
                </List>            
            </View>    
        {/* </ScrollView> */}

        <View style={{width: 320, marginLeft: 20, marginBottom: 160}}>
            <Btn_Blue title="Submit" onPress={()=> this.cekPassword()} />        
        </View>
        
        
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  OptionsPeriod: {flexDirection: 'row', marginTop: 5, marginBottom: -15},
  
   labelPlaceHolder: {
    color: '#cbcbcb', 
  },

   labelSub: {
    color: '#686969', 
    fontSize: 14,
  },

  touchableButton: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
    left: 290,
  },

  buttonImage: {
    resizeMode: 'contain',
    height: '80%',
    width: '80%',
  },

  
});

const mapStoreToProps = state => ({
  redMobile: state.register.redMobile,
});
const mapDispatchToProps = dispatch => ({
  saveMobile: mobile => dispatch(saveMobile(mobile)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(mod_Phone);
