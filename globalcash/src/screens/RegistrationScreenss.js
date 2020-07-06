import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  Text,
} from 'react-native';
import {Button} from 'native-base';
import {getNasabah, setLoading} from '../redux/action/NasabahAction';
import {insertData} from '../redux/action/TempAction';
import {connect} from 'react-redux';
import StepIndicator from 'react-native-step-indicator';
import {Header} from './commons/';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  RegFormInput1,
  RegFormInput2,
  RegFormInput3,
  RegFormInput4,
  DropProvince,
} from './components/';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 3,
      mobile: '',
      name: '',
      title: 'SD',
      location: '',
      address: '',
      lstay: 'Kurang 1th',
      momname: '',
      comname: '',
      comfield: '',
      comaddress: '',
      lwork: 'Kurang 1th',
      avsalary: 'Dibawah 3jt',
      comlocation: '',
      ename1: '',
      erel1: '',
      emobile1: '',
      ename2: '',
      erel2: '',
      emobile2: '',
      idcardurl: '',
      profileurl: '',
      noktp: '',
      tgllhr: '',
      agama: 'Islam',
      jkelamin: 'Laki - Laki',
      married: 'Single',
      verified_status: '',
    };

    this.handlerChangeValue = this.handlerChangeValue.bind(this);
    this.handlerNextPage = this.handlerNextPage.bind(this);
    this.handlerInsertDB = this.handlerInsertDB.bind(this);
    this.loadJWT = this.loadJWT.bind(this);
    this.loadJWT();
  }

  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        this.props.getNasabah(value);
        this.setState({
          mobile: value,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }

  handlerChangeValue(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }

  handlerNextPage(value) {
    const {
      currentPage,
      name,
      title,
      location,
      address,
      lstay,
      momname,
      comname,
      comfield,
      comaddress,
      lwork,
      avsalary,
      comlocation,
      ename1,
      erel1,
      emobile1,
      ename2,
      erel2,
      emobile2,
      idcardurl,
      profileurl,
      noktp,
      tgllhr,
      agama,
      jkelamin,
      married,
    } = this.state;
    if (currentPage === 0) {
      if (!name || !title || !location || !address || !lstay || !momname) {
        Alert.alert('Mohon Lengkapi Data terlebih dahulu');
      } else {
        this.setState({
          currentPage: value,
        });
      }
    } else if (currentPage === 1) {
      if (
        !comname ||
        !comfield ||
        !comaddress ||
        !lwork ||
        !avsalary ||
        !comlocation
      ) {
        Alert.alert('Mohon Lengkapi Data terlebih dahulu');
      } else {
        this.setState({
          currentPage: value,
        });
      }
    } else if (currentPage === 2) {
      if (!ename1 || !erel1 || !emobile1 || !ename2 || !erel2 || !emobile2) {
        Alert.alert('Mohon Lengkapi Data terlebih dahulu');
      } else {
        this.setState({
          currentPage: value,
        });
      }
    } else if (currentPage === 3) {
      if (
        idcardurl ||
        profileurl ||
        noktp ||
        tgllhr ||
        agama ||
        jkelamin ||
        married
      ) {
        Alert.alert('Mohon Lengkapi Data terlebih dahulu');
      } else {
        this.setState({
          currentPage: value,
        });
      }
    } else {
      this.setState({
        currentPage: value,
      });
    }
  }

  handlerInsertDB() {
    const {nasabah} = this.props;
    const formData = new FormData();
    formData.append('mobile', this.state.mobile);
    formData.append('name', this.state.name);
    formData.append('title', this.state.title);
    formData.append('location', this.state.location);
    formData.append('address', this.state.address);
    formData.append('lstay', this.state.lstay);
    formData.append('momname', this.state.momname);
    formData.append('comname', this.state.comname);
    formData.append('comfield', this.state.comfield);
    formData.append('comaddress', this.state.comaddress);
    formData.append('lwork', this.state.lwork);
    formData.append('avsalary', this.state.avsalary);
    formData.append('comlocation', this.state.comlocation);
    formData.append('ename1', this.state.ename1);
    formData.append('erel1', this.state.erel1);
    formData.append('emobile1', this.state.emobile1);
    formData.append('ename2', this.state.ename2);
    formData.append('erel2', this.state.erel2);
    formData.append('emobile2', this.state.emobile2);
    formData.append('uploadimg', {
      uri: this.state.idcardurl.uri,
      type: 'image/jpeg', // or photo.type
      name: 'idcardurl.jpg',
    });
    formData.append('uploadimg', {
      uri: this.state.profileurl.uri,
      type: 'image/jpeg', // or photo.type
      name: 'profileurl.jpg',
    });
    formData.append('noktp', this.state.noktp);
    formData.append('tgllhr', this.state.tgllhr);
    formData.append('agama', this.state.agama);
    formData.append('jkelamin', this.state.jkelamin);
    formData.append('married', this.state.married);
    formData.append('verified_status', '1');
    axios({
      method: 'post',
      // url: 'http://192.168.5.27:63003/nasabah',
      url: 'http://103.121.149.77:63003/nasabah',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        //handle error
        console.log(err);
      });
    this.props.navigation.navigate('app');
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <Spinner visible={this.props.loadings} textContent={'Loading...'} />
        <Header
          title="Home"
          isHome={false}
          navigation={this.props.navigation}
        />
        <SafeAreaView style={styles.Container}>
          <StepIndicator
            stepCount={4}
            customStyles={firstIndicatorStyles}
            currentPosition={this.state.currentPage}
            labels={[
              'Info Pribadi',
              'Data Perusahaan',
              'Kontak Darurat',
              'Data KTP',
            ]}
            renderLabel={this.renderLabel}
            onPress={this.onStepPress}
          />
          <View style={styles.formWrapper}>
            {this.state.currentPage === 0 && (
              <RegFormInput1
                name={this.state.name}
                title={this.state.title}
                location={this.state.location}
                address={this.state.address}
                lstay={this.state.lstay}
                momname={this.state.momname}
                handlerChangeValue={this.handlerChangeValue}
                handlerNextPage={this.handlerNextPage}
              />
            )}
            {this.state.currentPage === 1 && (
              <RegFormInput2
                comname={this.state.comname}
                comfield={this.state.comfield}
                comaddress={this.state.comaddress}
                lwork={this.state.lwork}
                avsalary={this.state.avsalary}
                comlocation={this.state.comlocation}
                handlerChangeValue={this.handlerChangeValue}
                handlerNextPage={this.handlerNextPage}
              />
            )}
            {this.state.currentPage === 2 && (
              <RegFormInput3
                ename1={this.state.ename1}
                erel1={this.state.erel1}
                emobile1={this.state.emobile1}
                ename2={this.state.ename2}
                erel2={this.state.erel2}
                emobile2={this.state.emobile2}
                handlerChangeValue={this.handlerChangeValue}
                handlerNextPage={this.handlerNextPage}
              />
            )}
            {this.state.currentPage === 3 && (
              <RegFormInput4
                idcardurl={this.state.idcardurl}
                profileurl={this.state.profileurl}
                noktp={this.state.noktp}
                tgllhr={this.state.tgllhr}
                agama={this.state.agama}
                jkelamin={this.state.jkelamin}
                married={this.state.married}
                handlerChangeValue={this.handlerChangeValue}
                handlerNextPage={this.handlerNextPage}
                handlerInsertDB={this.handlerInsertDB}
                idcardurlState={this.state.idcardurl}
                profileurlState={this.state.profileurl}
              />
            )}
          </View>
        </SafeAreaView>
        <DropProvince />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  },
  formWrapper: {
    maxHeight: '70%',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
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

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f',
};

const mapStoreToProps = state => ({
  redMobile: state.register.redMobile,
  loadings: state.nasabah.loading,
  nasabah: state.nasabah.nasabah,
  address: state.temp.address,
});
const mapDispatchToProps = dispatch => ({
  getNasabah: mobile => dispatch(getNasabah(mobile)),
  setLoading: p => dispatch(setLoading(p)),
  insertData: (prams, data) => dispatch(insertData(prams, data)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(RegistrationScreen);
