/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Image, Alert} from 'react-native';
import {Input, Button, Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import {Btn, Img} from '../commons/';

export class LoginInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {mobile, otpInput, disableMobile, Countdown} = this.props;
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.LinearGradients}>
        <Image
          source={Img.ICON_LOGO}
          style={{width: 60, height: 60, borderRadius: 60}}
        />
        <Text style={styles.TextIn}>Global Multi Cash</Text>
        <View style={{width: '80%'}}>
          <View style={styles.NumberInput}>
            <Input
              disabled={disableMobile}
              value={mobile}
              onChangeText={mobile =>
                this.props.handlerChangeValue('mobile', mobile)
              }
              placeholder="Nomor Handphone"
              keyboardType="number-pad"
            />
          </View>
          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <Input
                value={otpInput}
                onChangeText={otpInput =>
                  this.props.handlerChangeValue('otpInput', otpInput)
                }
                placeholder="Masukan Kode OTP"
                keyboardType="number-pad"
              />
            </View>
            <View
              style={{
                backgroundColor: '#f05d00',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <Button transparent onPress={() => this.props.isMobile()}>
                <Text style={{fontSize: 15, color: 'white'}}>
                  {Countdown ? `${Countdown} Second` : 'Kirim OTP'}
                </Text>
              </Button>
            </View>
          </View>
          <Btn title="MASUK" onPress={() => this.props.handlerLogin()} />
          {/* <Text>{mobile}</Text> */}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  LinearGradients: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  TextIn: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
    marginBottom: '10%',
  },
  NumberInput: {
    height: 45,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
