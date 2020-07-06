/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, {Component} from 'react';
import {View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  Icon,
  CardItem,
  Text,
  Body,
  Form,
  Label,
  Input,
  Item,
  Textarea,
} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';

import HeaderApp from '../../HeaderApp';
import {Form1} from './Form1';
import {Form2} from './Form2';
import {Form3} from './Form3';
import {Form4} from './Form4';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextForm: 'Form1',
      nasabahState: null,
      stateLoading: false,
      mobile: '',
      name: '',
      title: '',
      location: '',
      address: '',
      lstay: '',
      momname: '',
      comname: '',
      comfield: '',
      comaddress: '',
      lwork: '',
      avsalary: '',
      comlocation: '',
      ename1: '',
      erel1: '',
      emobile1: '',
      ename2: '',
      erel2: '',
      emobile2: '',
      idcardurl: '',
      profileurl: '',
      verified: '',
    };

    this.handlerNextPage = this.handlerNextPage.bind(this);
    this.handlerChangeValue = this.handlerChangeValue.bind(this);
    this.handlerLoading = this.handlerLoading.bind(this);
    this.handlersetState = this.handlersetState.bind(this);
    this.handlerInsertDB = this.handlerInsertDB.bind(this);
  }
  componentDidMount() {
    const {nasabah} = this.props;
    // const {getRegisterbyMobile, nasabah, redMobile} = this.props;
    // getRegisterbyMobile(redMobile);
    nasabah && !this.state.nasabahState ? this.handlersetState(nasabah) : '';
  }

  handlerChangeValue(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }
  handlerNextPage(value) {
    this.setState({
      nextForm: value,
    });
  }
  handlerLoading() {
    this.setState({
      stateLoading: false,
    });
  }

  //Memindahkan Nilai Props Ke State
  handlersetState(nasabah) {
    this.setState({
      nasabahState: nasabah,
      name: nasabah.name,
      title: nasabah.title,
      location: nasabah.location,
      address: nasabah.address,
      lstay: nasabah.lstay,
      momname: nasabah.momname,
      comname: nasabah.comname,
      comfield: nasabah.comfield,
      comaddress: nasabah.comaddress,
      lwork: nasabah.lwork,
      avsalary: nasabah.avsalary,
      comlocation: nasabah.comlocation,
      idcardurl: nasabah.idcardurl,
      profileurl: nasabah.profileurl,
      ename1: nasabah.ename1,
      erel1: nasabah.erel1,
      emobile1: nasabah.emobile1,
      ename2: nasabah.ename2,
      erel2: nasabah.erel2,
      emobile2: nasabah.emobile2,
    });
  }

  handlerInsertDB() {
    const {nasabah} = this.props;
    const formData = new FormData();
    formData.append('mobile', this.props.redMobile);
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
    formData.append('verified', '1');
    axios({
      method: 'post',
      url: 'http://192.168.5.27:63003/api/nasabah',
      // url: 'http://182.253.28.197:63003/api/nasabah',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(res => {
        this.props.navigation.goBack();
        console.log(res);
      })
      .catch(err => {
        //handle error
        console.log(err);
      });
  }

  render() {
    const {nasabah} = this.props;
    // {
    //   nasabah && !this.state.nasabahState ? this.handlersetState(nasabah) : '';
    // }
    return (
      <View style={styles.mainWrapper}>
        <HeaderApp title="Registration" navigation={this.props.navigation} />
        <View style={styles.FrontHeader1}>
          <Text style={styles.headerCircleAfter}>1</Text>
          <Text style={styles.headerCircleActive}>2</Text>
          <Text style={styles.headerCircleBefore}>3</Text>
          <Text style={styles.headerCircleBefore}>4</Text>
        </View>
        <View style={styles.FrontHeader2}>
          {this.state.nextForm === 'Form1' && (
            <Form1
              key="1"
              handlerNextPage={this.handlerNextPage}
              handlerChangeValue={this.handlerChangeValue}
              nasabahState={this.state.nasabahState}
              nameState={this.state.name}
              titleState={this.state.title}
              locationState={this.state.location}
              addressState={this.state.address}
              lstayState={this.state.lstay}
              momnameState={this.state.momname}
            />
          )}
          {this.state.nextForm === 'Form2' && (
            <Form2
              key="2"
              handlerNextPage={this.handlerNextPage}
              handlerChangeValue={this.handlerChangeValue}
              comnameState={this.state.comname}
              comfieldState={this.state.comfield}
              comaddressState={this.state.comaddress}
              lworkState={this.state.lwork}
              avsalaryState={this.state.avsalary}
              comlocationState={this.state.comlocation}
            />
          )}
          {this.state.nextForm === 'Form3' && (
            <Form3
              key="3"
              handlerNextPage={this.handlerNextPage}
              handlerChangeValue={this.handlerChangeValue}
              ename1State={this.state.ename1}
              erel1State={this.state.erel1}
              emobile1State={this.state.emobile1}
              ename2State={this.state.ename2}
              erel2State={this.state.erel2}
              emobile2State={this.state.emobile2}
            />
          )}
          {this.state.nextForm === 'Form4' && (
            <Form4
              key="4"
              handlerNextPage={this.handlerNextPage}
              handlerInsertDB={this.handlerInsertDB}
              handlerChangeValue={this.handlerChangeValue}
              idcardurlState={this.state.idcardurl}
              profileurlState={this.state.profileurl}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    position: 'relative',
  },
  FrontHeader1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    top: 30,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  FrontHeader2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    top: 100,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  headerCircleBefore: {
    flex: 1,
    textAlign: 'center',
    borderRadius: 50,
    marginHorizontal: 3,
    borderColor: '#696969',
    borderWidth: 2,
    borderStyle: 'dotted',
    color: '#696969',
  },

  headerCircleAfter: {
    flex: 1,
    textAlign: 'center',
    borderRadius: 50,
    marginHorizontal: 3,
    borderColor: '#696969',
    borderWidth: 2,
    borderStyle: 'dotted',
    color: '#696969',
    backgroundColor: '#fdbe96',
  },

  headerCircleActive: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginHorizontal: 3,
    paddingVertical: 10,
    backgroundColor: '#f05d00',
    borderColor: '#696969',
    borderWidth: 2,
    borderStyle: 'dotted',
    color: '#fff',
  },

  containerInputText: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },

  btnBln: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    padding: 5,
    margin: 2,
  },

  btnBlnActive: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'orange',
    color: 'orange',
    padding: 5,
    margin: 2,
  },
});
