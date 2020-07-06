/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, SafeAreaView, ScrollView} from 'react-native';
import {Text, List, ListItem} from 'native-base';
import {IMAGE} from '../constants/Image';
import deviceStorage from '../services/deviceStorage';

export class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
  }

  logout(){
    this.deleteJWT();
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <SafeAreaView style={{flex: 2}}>
        <View
          style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={IMAGE.ICON_USER_DEFAULT}
            style={{height: 120, width: 120, borderRadius: 60}}
          />
        </View>
        <ScrollView>
          <List>
          {/* <ListItem onPress={() => this.props.navigation.navigate('Setting')}>
              <Text>History Pembayaran</Text>
            </ListItem> */}
            <ListItem >
              <Text>History Pembayaran</Text>
            </ListItem>
            <ListItem >
              <Text>History Pinjaman</Text>
            </ListItem>
             <ListItem >
              <Text>Info Rekening Bank</Text>
            </ListItem>
            <ListItem >
              <Text>Ubah kata sandi</Text>
            </ListItem>
            <ListItem >
              <Text>Ubah nomor telpon</Text>
            </ListItem>
          </List>
        </ScrollView>
        <List>
          <ListItem onPress={() => this.logout()}>
            <Text>Logout</Text>
          </ListItem>
        </List>
      </SafeAreaView>
    );
  }
}
