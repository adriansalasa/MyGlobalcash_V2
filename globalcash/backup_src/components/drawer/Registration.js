/* eslint-disable react-native/no-inline-styles */
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
import HeaderApp from '../HeaderApp';
import Tombol from '../../constants/Tombol';

export class Registration extends Component {
  render() {
    return (
      <View style={styles.mainWrapper}>
        <HeaderApp title="Registration" navigation={this.props.navigation} />
        <View style={styles.FrontHeader1}>
          <Text style={{flex: 1}}>1</Text>
          <Text style={{flex: 1}}>2</Text>
          <Text style={{flex: 1}}>3</Text>
          <Text style={{flex: 1}}>4</Text>
        </View>
        <View style={styles.FrontHeader2}>
          <Text style={{color: '#f05d00', fontSize: 12}}>total pinjaman</Text>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>Nama Lengkap</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Gelar Tertinggi</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Lokasi</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Alamat Lengkap</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Lama Tinggal</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Lama Ibu Kandung</Label>
                <Input />
              </Item>
            </Form>
          </Content>
          <View style={{width: '100%'}}>
            <Tombol
              title="NEXT"
              onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
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
