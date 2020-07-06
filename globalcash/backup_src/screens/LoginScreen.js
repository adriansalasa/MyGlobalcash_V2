/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StatusBar, Alert, Text} from 'react-native';
import {Button} from 'native-base';
import {saveMobile} from '../redux/action/RegisterAction';
import {connect} from 'react-redux';
import axios from 'axios';

import {TEXT} from '../constants/env';

import deviceStorage from '../services/deviceStorage.js';
import Spinner from 'react-native-loading-spinner-overlay';
import {LoginInput} from './components/LoginInput';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      otpInput: '',
      otpGenerate: '',
      Countdown: 0,
      disableMobile: false,
      disableOTP: false,
      jwt: '',
      loading: true,
    };

    this.handlerChangeValue = this.handlerChangeValue.bind(this);
    this.isMobile = this.isMobile.bind(this);
    this.handlerLogin = this.handlerLogin.bind(this);
    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwts) {
    this.setState({
      jwt: jwts,
    });
  }

  isMobile() {
    if (!this.state.mobile) {
      Alert.alert(
        TEXT.TEXT_TITLE_APP,
        'Silahkan Masukan nomor telepon terlebih dahulu?',
        [
          {
            text: 'Input Nomor',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else {
      if (this.state.Countdown <= 0) {
        Alert.alert(
          TEXT.TEXT_TITLE_APP,
          `Apakah Nomor ${this.state.mobile} sudah benar?`,
          [
            {
              text: 'Ganti Nomor',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Sudah', onPress: () => this.generateOTP()},
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          TEXT.TEXT_TITLE_APP,
          `Silahkan Tunggu OTP dikirim melalui sms ke Nomor ${
            this.state.mobile
          }`,
          [
            {
              text: 'OTP',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
      }
    }
  }

  componentWillUnmount() {
    // Make sure to clear the interval, on unmount
    clearInterval(this.state.Countdown);
  }

  generateOTP() {
    this.setState({disableOTP: true});
    let OTP = Math.floor(1000 + Math.random() * 9000);
    this.setState({otpGenerate: OTP});
    this.setState({Countdown: 60});
    setInterval(() => this.startTimer(60), 1000);
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

  startTimer() {
    if (this.state.Countdown > 0) {
      this.setState({
        Countdown: this.state.Countdown - 1,
      });
    }
  }

  handlerLogin() {
    // this.props.navigation.navigate('app');
    this.props.saveMobile(this.state.mobile);

    const {otpInput, otpGenerate} = this.state;
    if (otpGenerate === '') {
      alert('Click send OTP first');
    } else {
      if (Number(otpInput) === Number(otpGenerate)) {
        deviceStorage.saveKey('id_token', this.state.mobile);
        this.newJWT(this.state.mobile);
        // this.props.navigation.navigate('app');
        this.props.saveMobile(this.state.mobile);
      } else {
        alert('your OTP is not Valid');
      }
    }
  }

  handlerChangeValue(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }

  navigate = route => {
    setTimeout(
      function() {
        this.props.navigation.navigate(route);
      }.bind(this),
      100,
    );
  };

  render() {
    const {
      loading,
      jwt,
      mobile,
      otpInput,
      disableMobile,
      Countdown,
    } = this.state;
    return (
      <>
        <StatusBar backgroundColor="#4c669f" barStyle="light-content" />
        {loading ? (
          <Spinner visible={true} textContent={'Loading...'} />
        ) : (
          [
            jwt ? (
              this.navigate('app')
            ) : (
              <LoginInput
                key="login"
                jwt={jwt}
                deleteJWT={this.deleteJWT}
                handlerChangeValue={this.handlerChangeValue}
                handlerOTP={this.handlerOTP}
                handlerLogin={this.handlerLogin}
                isMobile={this.isMobile}
                mobile={mobile}
                otpInput={otpInput}
                disableMobile={disableMobile}
                Countdown={Countdown}
              />
            ),
          ]
        )}
      </>
    );
  }
}

const mapStoreToProps = state => ({
  redMobile: state.register.redMobile,
});
const mapDispatchToProps = dispatch => ({
  saveMobile: mobile => dispatch(saveMobile(mobile)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(LoginScreen);
