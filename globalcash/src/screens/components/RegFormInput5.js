import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Content,
  Text,
  Form,
  Label,
  Input,
  Item,
  StyleProvider,
  Picker,
  Icon,
  Button,
} from 'native-base';
import Reinput from 'reinput';
import {JatuhKebawah, Btn} from '../commons/';

export class RegFormInput5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lstayDropdown: [
        {
          label: 'Kurang dari 1 Tahun',
          value: 'Kurang dari 1 Tahun',
        },
        {
          label: '1 Tahun s/d 4 Tahun',
          value: '1 Tahun s/d 4 Tahun',
        },
        {
          label: 'Diatas 4 Tahun',
          value: 'Diatas 4 Tahun',
        },
      ],
      titleDropdown: [
        {label: 'SD', value: 'SD'},
        {label: 'SMP', value: 'SMP'},
        {label: 'SMA', value: 'SMA'},
        {label: 'D3', value: 'D3'},
        {label: 'S1', value: 'S1'},
        {label: 'S2', value: 'S2'},
      ],
    };
  }
  render() {
    return (
      <>
        <View style={{alignItems: 'center', height: 70}}>
          <Text>Test</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  formWrapper: {
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
