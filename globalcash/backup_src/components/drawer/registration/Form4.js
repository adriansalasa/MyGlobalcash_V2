/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Button, TouchableOpacity} from 'react-native';
import {Content, Text, Form, Label, Input, Item} from 'native-base';
import Tombol from '../../../constants/Tombol';
import ImagePicker from 'react-native-image-picker';
import {IMAGE} from '../../../constants/Image';

export class Form4 extends React.Component {
  state = {
    photo: null,
  };

  handleChoosePhoto = p => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response', response);
      if (response.uri) {
        {
          p === 'ktp'
            ? this.props.handlerChangeValue('idcardurl', response)
            : this.props.handlerChangeValue('profileurl', response);
        }
        // this.setState({photo: response});
      }
    });
  };
  render() {
    const {photo} = this.state;
    const {idcardurlState, profileurlState} = this.props;
    return (
      <>
        <Text style={{color: '#f05d00', fontSize: 18}}>
          KARTU TANDA PENDUDUK
        </Text>

        <Content>
          <TouchableOpacity onPress={() => this.handleChoosePhoto('ktp')}>
            {idcardurlState ? (
              <Image
                source={{uri: idcardurlState.uri}}
                style={{width: 300, height: 200}}
              />
            ) : (
              <Image
                source={IMAGE.IMG_NOIMAGE}
                style={{width: 300, height: 200}}
              />
            )}
          </TouchableOpacity>
        </Content>

        <Content style={{marginTop: 10, borderWidth: 0.5,
  borderColor: '#747474',}}>
          <TouchableOpacity onPress={() => this.handleChoosePhoto('profile')}>
            {profileurlState ? (
              <Image
                source={{uri: profileurlState.uri}}
                style={{width: 300, height: 200}}
              />
            ) : (
              <Image
                source={IMAGE.IMG_NOIMAGE}
                style={{width: 300, height: 200}}
                onPress={this.handleChoosePhoto}
              />
            )}
          </TouchableOpacity>
        </Content>

        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Tombol
              title="PREV"
              onPress={() => this.props.handlerNextPage('Form3')}
            />
          </View>
          <View style={{flex: 1}}>
            <Tombol title="DONE" onPress={() => this.props.handlerInsertDB()} />
          </View>
        </View>
      </>
    );
  }
}
