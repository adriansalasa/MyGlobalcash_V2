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
      salaryDropdown: [
        {
          label: 'Kurang dari 3jt',
          value: 'Kurang dari 1 Tahun',
        },
        {
          label: '3jt s/d 6jt',
          value: '1 Tahun s/d 4 Tahun',
        },
        {
          label: 'Diatas 6jt',
          value: 'Diatas 4 Tahun',
        },
      ],
    };
    this.handlerCloseDrop = this.handlerCloseDrop.bind(this);
  }

  handlerCloseDrop(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }
  render() {
    return (
      <View>
        <Content>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nama Perusahaan"
              value={this.props.comname}
              onChangeText={data =>
                this.props.handlerChangeValue('comname', data)
              }
              error={!this.props.comname && ' '}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Bidang Usaha"
              value={this.props.comfield}
              onChangeText={data =>
                this.props.handlerChangeValue('comfield', data)
              }
              error={!this.props.comfield && ' '}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Alamat Perusahaan"
              value={this.props.comaddress}
              style={{padding: 0, margin: 0}}
              onChangeText={data =>
                this.props.handlerChangeValue('comaddress', data)
              }
              error={!this.props.comaddress && ' '}
            />
          </View>
          <JatuhKebawah
            label="Lama Bekerja"
            stateName="lwork"
            onValueChange={this.props.handlerChangeValue}
            title={this.props.lwork}
            datas={this.state.lstayDropdown}
          />
          <JatuhKebawah
            label="Kisaran Gaji"
            stateName="avsalary"
            onValueChange={this.props.handlerChangeValue}
            title={this.props.avsalary}
            datas={this.state.salaryDropdown}
          />

          <View
            style={{alignItems: 'center', height: 70, flexDirection: 'row'}}>
            <Reinput
              label="Lokasi Kantor"
              style={{paddingRight: 30}}
              value={this.props.comlocation}
              onChangeText={data =>
                this.props.handlerChangeValue('location', data)
              }
              error={!this.props.comlocation && ' '}
            />
            <Icon
              name="arrow-down"
              style={{color: 'gray', top: 8, right: 0, position: 'absolute'}}
              onPress={() => this.setState({showDrop: true})}
            />
            <DropdownLocationCom
              handlerCloseDrop={this.handlerCloseDrop}
              showDrop={this.state.showDrop}
              handlerChangeValue={this.props.handlerChangeValue}
            />
          </View>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Btn title="PREV" onPress={() => this.props.handlerNextPage(0)} />
            </View>
            <View style={{flex: 1}}>
              <Btn title="NEXT" onPress={() => this.props.handlerNextPage(2)} />
            </View>
          </View>
        </Content>
      </View>
    );
  }
}
