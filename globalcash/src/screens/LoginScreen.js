/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StatusBar, Alert, Text, AppState} from 'react-native';
import {Button} from 'native-base';
import {saveMobile} from '../redux/action/RegisterAction';
import {connect} from 'react-redux';
import axios from 'axios';

import {TEXT} from '../constants/env';

import deviceStorage from '../services/deviceStorage.js';
import Spinner from 'react-native-loading-spinner-overlay';
import {LoginInput} from './components/LoginInput';
import BackgroundTimer from 'react-native-background-timer';

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
      appState: AppState.currentState,
      fgYn: false,
      Bgyn: false,
      cntA: 0,
      id_bgy: 98,
      tmp_bgy: '',
      isibgy: '',
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

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    // Make sure to clear the interval, on unmount
    clearInterval(this.state.Countdown);
    this.chechk();
   //AppState.removeEventListener('change', this._handleAppStateChange);
  }

  chechk() {
   // AppState.removeEventListener('change', this._handleAppStateChange);
   console.log('kokokokok');
  }

  myNewTimer() {
    //BackgroundTimer.runBackgroundTimer(() => { 
      //code that will be called every 3 seconds 
      //console.log('oke bg');
      //  this.setState({cntA: 10}),
      //console.log('cnta2 : ' + this.state.cntA);
      //}, 
      //1000);
      // BackgroundTimer.stopBackgroundTimer();

      let a = 0;
      let Anew = 0;
      const newTmrID = BackgroundTimer.setInterval(() => {
          // this will be executed every 200 ms
          // even when app is the the background
          //console.log('tic'),
          a = a + 1,
          console.log('bbb' + a);

          if (a===5) {
            Anew = a;
            a = 0;
            BackgroundTimer.clearInterval(newTmrID);

            axios({
              method: 'post',
              url: `http://103.121.149.77:63003/recbgyn/${this.state.id_bgy}`,
              headers: {},
              data: {
                Bgtime: Anew,
                bgklik: 'y',
              },
            })
              .then(res => {
                const tmp_bgy = res.data.datas;
              console.log(res);
              })
              .catch(err => {
                this.setState({errCodeAbout: err.response.status});
              });
          }
     
      }, 1000);

        // axios({
        //   method: 'post',
        //   url: `http://103.121.149.77:63003/recbgyn/${this.state.id_bgy}`,
        //   headers: {},
        //   data: {
        //     Bgtime: '4',
        //     bgklik: 'y',
        //   },
        // })
        //   .then(res => {
        //     const tmp_bgy = res.data.datas;
        //    console.log(res);
        //   })
        //   .catch(err => {
        //     this.setState({errCodeAbout: err.response.status});
        //   });
  }

   _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App State: ' + 'App has come to the foreground!');
      //alert('App State: ' + 'App has come to the foreground!');
    }
    console.log('App State 4: ' + nextAppState);
    //alert('App State 4: ' + nextAppState);
    this.setState({ appState: nextAppState });
   
    if(nextAppState === 'background') { 
      this.myNewTimer();
    }else if(nextAppState === 'active'){
      
      console.log('jwt : ' + this.state.jwt);
      console.log('Bgyn : ' + this.state.Bgyn);
      BackgroundTimer.stopBackgroundTimer();
      
      console.log('nx44: ' + nextAppState);

      // axios({
      //   method: 'get',
      //   url: `http://103.121.149.77:63003/recbgyn`,
      // })
      //   .then(res => {
      //   console.log(res.data.datas.Bgtime);
      //   const tmp_bgy = res.data.datas.Bgtime;
      //   this.setState({tmp_bgy: tmp_bgy});
      //   console.log('tmp_bgy 2 : ' + tmp_bgy)
      //   })
      //   .catch(err => {
      //     this.setState({errCodeAbout: err.response.status});
      //   });

      // this.getBGY();

      // console.log('tmp_bgy 2 : ' + this.state.tmp_bgy)
     
    }
  };

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
              // console.log('fgyn : ' + this.state.fgYn),
              // console.log('cnta :' + this.state.cntA)
            ) : (
              // console.log('tmp bgy false' + this.state.tmp_bgy),
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
            )
            // jwt && !this.state.fgYn  ? (
            //   console.log('fgyn2:' + !this.state.fgYn),
            //   <LoginInput
            //   key="login"
            //   jwt={jwt}
            //   deleteJWT={this.deleteJWT}
            //   handlerChangeValue={this.handlerChangeValue}
            //   handlerOTP={this.handlerOTP}
            //   handlerLogin={this.handlerLogin}
            //   isMobile={this.isMobile}
            //   mobile={mobile}
            //   otpInput={otpInput}
            //   disableMobile={disableMobile}
            //   Countdown={Countdown}
            // />
            // ) : (
            //   this.navigate('app')
            // ),
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
