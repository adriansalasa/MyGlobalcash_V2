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
  Button,
  Alert,
} from 'react-native';
import {Content, DatePicker} from 'native-base';
import Reinput from 'reinput';
import {JatuhKebawah, InputKTP, Btn, Img} from '../commons/';
import ImagePicker from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';

const {width} = Dimensions.get('screen');

export class RegFormInput4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      chosenDate: new Date(),
      // tgl: Moment(),
      tgl: Moment().subtract(17, 'years'),
      showDate: true,
      isVisible: false,
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

  showModal(show, tgl) {
    this.setState({isVisible: show});
    // this.props.handlerChangeValue('tgllhr', tgllhr.toString().substr(4, 12));
    // alert('ok');
    // data =>
    this.props.handlerChangeValue('tgllhr', this.state.tgl.format('MMM DD YYYY'));
    // alert(this.state.tgl.format('MMM DD YYYY'));
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

  changeDt = () => {
    const BLUE = '#2196F3';
    const WHITE = '#FFFFFF';
    const GREY = '#BDBDBD';
    const BLACK = '#424242';
    const LIGHT_GREY = '#F5F5F5';
    this.setState({showDate: !this.state.showDate});

    this.state.showDate ? 
    alert('true') 
   
    : alert('false');
  };

  render() {
    const {photo} = this.state;
    const {idcardurl, profileurl} = this.props;
    const BLUE = '#2196F3';
    const WHITE = '#FFFFFF';
    const GREY = '#BDBDBD';
    const BLACK = '#424242';
    const LIGHT_GREY = '#F5F5F5';

    return (
      // <Modal
      //       animationType = {"slide"}
      //       transparent={false}
      //       visible={this.state.isVisible}
      //       onRequestClose={() => {
      //         Alert.alert('Modal has now been closed.');
      //         this.showModal(!this.state.isVisible);
      //       }}>

      //           <Text style = { styles.text }>
      //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      //             Maecenas eget tempus augue, a convallis velit.</Text>
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
              {/* <DatePicker
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
              /> */}
              <View>
                <Text style={styles.dateText}>
                  {this.state.tgl ?
              // this.state.tgl.format('DD-MM-YYYY h:mm a') :
              // this.state.tgl.format('DD-MM-YYYY') :
                      this.state.tgl.format('DD-MM-YYYY')
                    : null}
                </Text>
              </View>
              <Modal
                animationType = {"slide"}
                transparent={false}
                visible={this.state.isVisible}
                onRequestClose={() => {
                  this.showModal(!this.state.isVisible);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{height: 30, marginLeft: 25}}></View>
                  <Calendar
                    onChange={(tgl) => this.setState({tgl})}
                    selected={this.state.tgl}
                    // We use Moment.js to give the minimum and maximum dates.
                    // minDate={Moment().startOf('day')}
                    // maxDate={Moment().add(10, 'years').startOf('day')}
                    maxDate={Moment().startOf('day')}
                    minDate={Moment().subtract(200, 'years').startOf('day')}
                    //General Styling}
                    style={{
                      borderWidth: 1,
                      borderColor: GREY,
                      borderRadius: 5,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    barView={{
                      backgroundColor: BLUE,
                      padding: 10,
                    }}
                    barText={{
                      fontWeight: 'bold',
                      color: WHITE,
                    }}
                    stageView={{
                      padding: 0,
                    }}
                    // Day selector styling
                    dayHeaderView={{
                      backgroundColor: LIGHT_GREY,
                      borderBottomColor: GREY,
                    }}
                    dayHeaderText={{
                      fontWeight: 'bold',
                      color: BLACK,
                    }}
                    dayRowView={{
                      borderColor: LIGHT_GREY,
                      height: 40,
                    }}
                    dayText={{
                      color: BLACK,
                    }}
                    dayDisabledText={{
                      color: GREY,
                    }}
                    dayTodayText={{
                      fontWeight: 'bold',
                      color: BLUE,
                    }}
                    daySelectedText={{
                      fontWeight: 'bold',
                      backgroundColor: BLUE,
                      color: WHITE,
                      borderRadius: 15,
                      borderColor: 'transparent',
                      overflow: 'hidden',
                    }}
                    // Styling month selector.
                    monthText={{
                      color: BLACK,
                      borderColor: BLACK,
                    }}
                    monthDisabledText={{
                      color: GREY,
                      borderColor: GREY,
                    }}
                    monthSelectedText={{
                      fontWeight: 'bold',
                      backgroundColor: BLUE,
                      color: WHITE,
                      overflow: 'hidden',
                    }}
                    // Styling year selector.
                    yearMinTintColor={BLUE}
                    yearMaxTintColor={GREY}
                    yearText={{
                      color: BLACK,
                    }}
                  />
                </View>
                <View style={{width: '40%', left: 100, top:10}}>
                  <Button title="Confirm Date" onPress={() => {
                    this.showModal(!this.state.isVisible, this.state.tgl);}}>
                  </Button>
                </View>
              </Modal>
              <View style={{borderBottomWidth: 1, borderBottomColor: 'gray'}} onPress={() => this.showModal(true)}>
              <Text onPress={() => this.showModal(true)} title='Pilih' />
              </View>
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
  dateText: {
    top: 12,
    left: 5
  },
  InputWrap: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 40,
  },
  newDt: {
    flexDirection: 'row',
    backgroundColor: 'blue',
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
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  NewButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
});
