import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import {Content, DatePicker} from 'native-base';
import Reinput from 'reinput';
import {JatuhKebawah, InputKTP, Btn, Img} from '../commons/';
import ImagePicker from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';

const {width} = Dimensions.get('screen');

export class RegFormInput4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      chosenDate: new Date(),
      jklamindrop: [
        {
          label: 'Laki - Laki',
          value: 'Laki - Laki',
        },
        {
          label: 'Perempuan',
          value: 'Perempuan',
        },
      ],
      agamadrop: [
        {
          label: 'Islam',
          value: 'Islam',
        },
        {
          label: 'Katolik',
          value: 'Katolik',
        },
        {
          label: 'Protestan',
          value: 'Protestan',
        },
        {
          label: 'Hindu',
          value: 'Hindu',
        },
        {
          label: 'Budha',
          value: 'Budha',
        },
      ],
      marrieddrop: [
        {
          label: 'Single',
          value: 'Single',
        },
        {
          label: 'Menikah',
          value: 'Menikah',
        },
        {
          label: 'Bercerai',
          value: 'Bercerai',
        },
      ],
      img: require('../../assets/images/icon.png'),
      show: false,
      ktp: false,
      cMode: 'back',
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  handleChoosePhoto = p => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response', response);
      if (response.uri) {
        // eslint-disable-next-line no-lone-blocks
        {
          p === 'ktp'
            ? this.props.handlerChangeValue('idcardurl', response)
            : this.props.handlerChangeValue('profileurl', response);
        }
        // this.setState({photo: response});
      }
    });
  };

  async capture(p) {
    const img = await this.refs.cam.takePictureAsync({quality: 0.5});
    this.setState({show: false});
    {
      p === 'ktp'
        ? this.props.handlerChangeValue('idcardurl', img)
        : this.props.handlerChangeValue('profileurl', img);
    }
  }
  
  changeMode(){
    if(this.state.cMode === 'back'){
      this.setState({cMode: 'front'});
    }else{
      this.setState({cMode: 'back'});
    }
  }

  render() {
    const {photo} = this.state;
    const {idcardurl, profileurl} = this.props;
    return (
      <View>
        <Content>
          {this.state.show && (
            <Modal>
              <View style={{flex: 1}}>
                <RNCamera
                  ref="cam"
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                  type={RNCamera.Constants.Type[this.state.cMode]}
                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                  androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                  onGoogleVisionBarcodesDetected={({barcodes}) => {
                    console.log(barcodes);
                  }}
                />
                <View style={styles.frame}>
                  <View
                    style={{
                      marginHorizontal: 20,
                      height: '30%',
                      borderWidth: 2,
                      borderColor: 'gray',
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.switchs}
                  onPress={() => this.changeMode()}>
                  {this.state.cMode === 'front' ? <Text>Belakang</Text> : <Text>Depan</Text>}
                </TouchableOpacity>
                {this.state.ktp ? (
                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => this.capture('ktp')}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => this.capture('selfie')}
                  />
                )}
              </View>
            </Modal>
          )}
          <View>
            <TouchableOpacity
              onPress={() => this.setState({show: true, ktp: true})}>
              {idcardurl ? (
                <Image
                  source={{uri: idcardurl.uri}}
                  style={{width: 300, height: 200}}
                />
              ) : (
                <Image
                  source={Img.IMG_NOIMAGE}
                  style={{width: 300, height: 200}}
                />
              )}
            </TouchableOpacity>
          </View>
          <InputKTP
            label="Nomor KTP"
            sts="noktp"
            value={this.props.noktp}
            handlerChangeValue={this.props.handlerChangeValue}
          />

          <View style={styles.InputWrap}>
            <View>
              <Text style={{width: 100, top: 0, marginTop: -10, color: 'gray'}}>
                Tanggal Lahir
              </Text>
            </View>
            <Text style={{marginTop: -10}}>: </Text>
            <View style={{flex: 1, marginBottom: 10}}>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(1970, 1, 1)}
                maximumDate={new Date()}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="Select date"
                textStyle={{color: 'black'}}
                placeHolderTextStyle={{color: '#d3d3d3'}}
                onDateChange={data =>
                  this.props.handlerChangeValue(
                    'tgllhr',
                    data.toString().substr(4, 12),
                  )
                }
                disabled={false}
              />
            </View>
          </View>

          <View style={styles.InputWrap}>
            <View>
              <Text style={{width: 100, top: 0, marginTop: -10, color: 'gray'}}>
                Agama
              </Text>
            </View>
            <Text style={{marginTop: -10}}>: </Text>
            <View style={{flex: 1, marginBottom: 0}}>
              <JatuhKebawah
                stateName="agama"
                onValueChange={this.props.handlerChangeValue}
                title={this.props.agama}
                datas={this.state.agamadrop}
              />
            </View>
          </View>

          <View style={styles.InputWrap}>
            <View>
              <Text style={{width: 100, top: 0, marginTop: -10, color: 'gray'}}>
                Jenis Kelamin
              </Text>
            </View>
            <Text style={{marginTop: -10}}>: </Text>
            <View style={{flex: 1, marginBottom: 0}}>
              <JatuhKebawah
                stateName="jkelamin"
                onValueChange={this.props.handlerChangeValue}
                title={this.props.jkelamin}
                datas={this.state.jklamindrop}
              />
            </View>
          </View>

          <View style={styles.InputWrap}>
            <View>
              <Text style={{width: 100, top: 0, marginTop: -10, color: 'gray'}}>
                Status
              </Text>
            </View>
            <Text style={{marginTop: -10}}>: </Text>
            <View style={{flex: 1, marginBottom: 0}}>
              <JatuhKebawah
                stateName="married"
                onValueChange={this.props.handlerChangeValue}
                title={this.props.married}
                datas={this.state.marrieddrop}
              />
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.setState({show: true, ktp: false})}>
              {profileurl ? (
                <Image
                  source={{uri: profileurl.uri}}
                  style={{width: 300, height: 200}}
                />
              ) : (
                <Image
                  source={Img.IMG_NOIMAGE}
                  style={{width: 300, height: 200}}
                  onPress={this.handleChoosePhoto}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Btn title="PREV" onPress={() => this.props.handlerNextPage(2)} />
            </View>
            <View style={{flex: 1}}>
              <Btn
                title="SELESAI"
                onPress={() => this.props.handlerInsertDB()}
              />
            </View>
          </View>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  InputWrap: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 40,
  },
  frame: {
    top: 0,
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  switchs: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    left: width / 2 - 30,
    backgroundColor: 'white',
    borderRadius: 30,
  },
});
