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
import DropdownLocationCom from './DropdownLocationCom';

export class RegFormInput2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDrop: false,
     
      listBank: [
        {label: 'Pilih Bank', value: '000'},
        {label: 'BCA', value: '014'},
        {label: 'MANDIRI', value: '008'},
        {label: 'BNI', value: '009'},
        {label: 'BRI', value: '002'},
        {label: 'PERMATA', value: '013'},
      ],
    };
    
  }

  
  render() {
    return (
      <View>
        <Content>
  
          <View style={{alignItems: 'center', height: 70}}>
            <JatuhKebawah
              label="Nama Bank"
              stateName="id_bank"
              onValueChange={this.props.handlerChangeValue}
              title={this.props.id_bank}
              datas={this.state.listBank}
            />
          </View>
        </Content>
      </View>
    );
  }
}
