/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Image, Alert} from 'react-native';
import {Content, Item, Input, Button, Text} from 'native-base';
import {saveMobile} from '../../redux/action/RegisterAction';
import {connect} from 'react-redux';
import axios from 'axios';

import Alerting from '../../constants/Alerting';
import Tombol from '../../constants/Tombol';
import {IMAGE} from '../../constants/Image';
import {TEXT} from '../../constants/env';

import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: null,
      otpInput: null,
      otpGenerate: null,
      Countdown: 0,
      disableMobile: false,
      disableOTP: false,
    };
  }

  componentDidMount() {}

  askCorrect() {
    if (!this.state.mobile) {
      Alert.alert(
        TEXT.TEXT_TITLE_APP,
        `Silahkan Masukan nomor telepon terlebih dahulu?`,
        [
          {
            text: 'Input Nomor',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else {
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
    alert(
      `Kode OTP sudah dikirim ke ${
        this.state.mobile
      }, jangan berikan kode ke orang lain. ${OTP}`,
    );
    axios.get(
      `http://sms.gmtech.id/index.php?app=ws&u=fadli&h=98b5123f9036db51c6e601e9daeb949d&op=pv&to=${
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

  tryLogin() {
    // this.props.navigation.navigate('app');
    this.props.saveMobile(this.state.mobile);

    const {otpInput, otpGenerate} = this.state;
    if (otpGenerate === null) {
      alert('Click send OTP first');
    } else {
      if (Number(otpInput) === Number(otpGenerate)) {
        this.props.navigation.navigate('app');
        this.props.saveMobile(this.state.mobile);
      } else {
        alert('your OTP is not Valid');
      }
    }
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#f05d00" barStyle="light-content" />
        <LinearGradient colors={['#f05d00', '#fff']} style={styles.MainWrapper}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
              source={IMAGE.ICON_LOGO}
              style={{width: 60, height: 60, borderRadius: 60}}
            />
          </View>
          <View style={{flex: 2, width: '90%'}}>
            <Content>
              <Item>
                <Input
                  disabled={this.state.disableMobile}
                  value={this.state.mobile}
                  onChangeText={mobile => this.setState({mobile})}
                  placeholder="Nomor Handphone"
                  keyboardType="number-pad"
                />
              </Item>
              <Item>
                <Input
                  value={this.state.otpInput}
                  onChangeText={otpInput => this.setState({otpInput})}
                  placeholder="Masukan Kode OTP"
                  keyboardType="number-pad"
                />
                <Button
                  disabled={this.state.disableOTP}
                  transparent
                  onPress={() => this.askCorrect()}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {`Kirim OTP ${this.state.Countdown} s`}
                  </Text>
                </Button>
              </Item>
              <Tombol title="MASUK" onPress={() => this.tryLogin()} />
            </Content>
            {/* <Text>{this.state.mobile}</Text> */}
          </View>
          <Text>{`ini otp generate ${this.state.Countdown}, ini otp input ${
            this.state.otpInput
          }`}</Text>
        </LinearGradient>
      </>
    );
  }
}

const styles = StyleSheet.create({
  MainWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  containerBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    height: 40,
    alignItems: 'stretch',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  textLine: {
    borderBottomColor: '#d6d7da',
    borderBottomWidth: 1,
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
)(Login);
