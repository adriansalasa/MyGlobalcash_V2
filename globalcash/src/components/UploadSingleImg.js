import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Content, Text, Form, Label, Input, Item, Button} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {IMAGE} from '../constants/Image';
import axios from 'axios';

class UploadSingleImg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
        console.log('Response', response);
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  handleUpload = () => {
    const formData = new FormData();
    formData.append('mobile', '081374956161');
    formData.append('name', 'aulia rahman');
    formData.append('title', 'D3');
    formData.append('location', 'Riau');
    formData.append('address', 'Jl. Siak 1 no.83');
    formData.append('lstay', '5');
    formData.append('momname', 'Mahyulaini');
    formData.append('comname', 'Apotek Rahman');
    formData.append('comfield', 'Farmation');
    formData.append('comaddress', 'Jl. siak 3 no 33');
    formData.append('lwork', '6');
    formData.append('avsalary', '9jt');
    formData.append('comlocation', 'asdaslas');
    formData.append('ename1', 'andri');
    formData.append('erel1', 'brother');
    formData.append('emobile1', '082343245435');
    formData.append('ename2', 'mike');
    formData.append('erel2', 'wife');
    formData.append('emobile2', '0818232');
    formData.append('uploadimg', {
      uri: this.state.photo.uri,
      type: 'image/jpeg', // or photo.type
      name: 'uploadimg.jpg',
    });
    formData.append('uploadimg', {
      uri: this.state.photo.uri,
      type: 'image/jpeg', // or photo.type
      name: 'uploadimg.jpg',
    });
    formData.append('verified', '1');

    axios({
      method: 'post',
      url: 'http://192.168.5.27:63003/api/nasabah',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function(response) {
        //handle success
        console.log(response);
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  render() {
    const {photo} = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
          {photo ? (
            <Image
              source={{uri: photo.uri}}
              style={{width: 300, height: 200}}
            />
          ) : (
            <Image
              source={IMAGE.IMG_NOIMAGE}
              style={{width: 300, height: 200}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleUpload()}>
          <Text> Light </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default UploadSingleImg;
