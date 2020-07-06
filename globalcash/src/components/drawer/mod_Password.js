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
import {IMAGE} from '../../constants/Image';
import deviceStorage from '../../services/deviceStorage.js';

export class mod_Password extends Component {
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
      hideNewPassword: true,
      reNewPassword: true,
      oldPassword: '',
      newPassword: '',
      renewPassword: '',
    };
    // this.loadJWT = this.loadJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  componentDidmount() {
    const {getNasabah} = this.props;
  }

  showPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  newPasswordVisibility = () => {
    this.setState({hideNewPassword: !this.state.hideNewPassword});
  };

  renewPasswordVisibility = () => {
    this.setState({reNewPassword: !this.state.reNewPassword});
  };

  oldPass_Set = (oPass) =>{
      this.setState({oldPassword: oPass});
  }

  newPass_Set = (nPass) =>{
      this.setState({newPassword: nPass});
  }

  renewPass_Set = (rnPass) =>{
      this.setState({renewPassword: rnPass});
  }

//   async loadJWT() {
//     try {
//       const value = await AsyncStorage.getItem('id_token');
//       if (value !== null) {
//         this.props.getNasabah(value);
//         this.setState({
//           jwt: value,
//           loading: false,
//         });
//       } else {
//         this.setState({
//           loading: false,
//         });
//       }
//     } catch (error) {
//       console.log('AsyncStorage Error: ' + error.message);
//     }
//   }

  postPassword() {
    axios({
      method: 'put',
      url: `http://103.121.149.77:63003/passUpdate/${this.state.jwt}`,
      headers: {},
      data: {
        password: this.state.renewPassword,
      },
    })
      .then(res => {
        // this.props.saveMobile(this.state.newTlp);
        alert(res.data.message);
        this.renPass.clear();
        this.nePass.clear();
        this.olPass.clear();
        // this.loadJWT();
      })
      .catch(err => {
        //handle error
        console.log(err);
      });
    // alert(this.state.jwt);
    // alert(this.state.reNewPassword);
    // console.log('oldPassword : ' + this.state.oldPassword);
    // console.log('NewPassword : ' + this.state.newPassword);
    // console.log('renewpassword : ' + this.state.renewPassword);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: ['#eee8e7']}}>
      {/* <ScrollView> */}
        <View style={{backgroundColor: 'white'}}>

            <CustomHeader
            title="Ubah kata sandi"
            navigation={this.props.navigation}
            />
            
            <List>
                <ListItem>
                    <View style={styles.OptionsPeriod}>
                        <View style={{left: 2}}>
                            <Text style={styles.labelSub}>Kata Sandi Lama</Text> 
                        </View>
                        {/* <View style={{marginTop: 20, left: 190}}>
                            <Image source = {IMAGE.PassIcon} /> 
                        </View> */}
                        {/* <View style={{right: 130, marginTop: 20}}>
                            <TextInput placeholder = "Masukan kata sandi lama anda" style={{fontSize: 15}} secureTextEntry={true}></TextInput>
                        </View> */}
                        <View style={{right: 130, marginTop: 20}}>
                            <TextInput ref={input => {this.olPass = input}} placeholder = "Masukan kata sandi lama anda" style={{fontSize: 15, left: 25}} underlineColorAndroid = "transparent" secureTextEntry={this.state.hidePassword} onChangeText={this.oldPass_Set}></TextInput>
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
                                <Text style={styles.labelSub}>Kata Sandi Baru</Text> 
                            </View>
                            {/* <View style={{marginTop: 20, left: 195}}>
                                <Image source = {IMAGE.PassIcon} /> 
                            </View> */}
                            <View style={{right: 125, marginTop: 20}}>
                                <TextInput ref={input => {this.nePass = input}} placeholder = "Masukan kata sandi baru anda" style={{fontSize: 15, left: 25}} underlineColorAndroid = "transparent" secureTextEntry={this.state.hideNewPassword} onChangeText={this.newPass_Set}></TextInput>
                                <TouchableOpacity
                                    activeOPacity={0.8}
                                    style={styles.touchableButton}
                                    onPress={this.newPasswordVisibility}>

                                    <Image 
                                        source= {this.state.hideNewPassword
                                            ? require('../../assets/images/small_pass_visible.png')
                                            : require('../../assets/images/small_pass_invisible.png')
                                        } 
                                        style={styles.buttonImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ListItem>

                    <ListItem>
                        <View style={styles.OptionsPeriod}>
                            <View style={{left: 2}}>
                                <Text style={styles.labelSub}>Konfirmasi kata sandi</Text> 
                            </View>
                            {/* <View style={{marginTop: 20, left: 160}}>
                                <Image source = {IMAGE.PassIcon}  /> 
                            </View> */}
                            <View style={{right: 160, marginTop: 20}} >
                                <TextInput ref={input => {this.renPass = input}} placeholder = "Ketikan kembali kata sandi baru anda" style={{fontSize: 15, left:25}} secureTextEntry={this.state.reNewPassword} onChangeText={this.renewPass_Set}></TextInput>
                                 <TouchableOpacity
                                    activeOPacity={0.8}
                                    style={styles.touchableButton}
                                    onPress={this.renewPasswordVisibility}>

                                    <Image 
                                        source= {this.state.reNewPassword
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
        {/* </ScrollView> */}

        <View style={{width: 330, marginLeft: 20, marginBottom: 235}}>
        <Btn_Blue title="Submit" onPress={() => this.postPassword()} />
        
        </View>
        
        
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  OptionsPeriod: {flexDirection: 'row', marginTop: 5, marginBottom: -15},
  
   labelPlaceHolder: {
    right: 85,
    marginTop: 20, 
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
    left: 315,
  },

  buttonImage: {
    resizeMode: 'contain',
    height: '80%',
    width: '80%',
  },
});

const mapStoreToProps = state => ({
  nasabah: state.nasabah.nasabah,
});
const mapDispatchToProps = dispatch => ({
  getNasabah: mobile => dispatch(getNasabah(mobile)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(mod_Password);
