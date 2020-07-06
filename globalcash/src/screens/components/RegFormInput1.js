import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon, Content} from 'native-base';
import Reinput from 'reinput';
import {JatuhKebawah, Btn} from '../commons/';
import DropdownLocation from './DropdownLocation';

export class RegFormInput1 extends Component {
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
      titleDropdown: [
        {label: 'SD', value: 'SD'},
        {label: 'SMP', value: 'SMP'},
        {label: 'SMA', value: 'SMA'},
        {label: 'D3', value: 'D3'},
        {label: 'S1', value: 'S1'},
        {label: 'S2', value: 'S2'},
        {label: 'S3', value: 'S3'},
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
              label="Nama Depan"
              value={this.props.nama_depan}
              onChangeText={data => this.props.handlerChangeValue('nama_depan', data)}
              error={!this.props.nama_depan && ' '}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nama Belakang"
              value={this.props.nama_belakang}
              onChangeText={data =>
                this.props.handlerChangeValue('nama_belakang', data)
              }
              error={!this.props.nama_belakang && ' '}
            />
          </View>
          <JatuhKebawah
            label="Gelar Tertinggi"
            stateName="title"
            onValueChange={this.props.handlerChangeValue}
            title={this.props.title}
            datas={this.state.titleDropdown}
          />
          <View
            style={{alignItems: 'center', height: 70, flexDirection: 'row'}}>
            <Reinput
              label="Lokasi"
              style={{paddingRight: 30}}
              value={this.props.location}
              error={!this.props.location && ' '}
            />
            <Icon
              type="FontAwesome5"
              name="map-marker-alt"
              style={{color: '#f44321', top: 10, right: 0, position: 'absolute', fontSize: 25}}
              onPress={() => this.setState({showDrop: true})}
            />
            <DropdownLocation
              handlerCloseDrop={this.handlerCloseDrop}
              showDrop={this.state.showDrop}
              handlerChangeValue={this.props.handlerChangeValue}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Alamat"
              value={this.props.address}
              style={{padding: 0, margin: 0}}
              onChangeText={data =>
                this.props.handlerChangeValue('address', data)
              }
              error={!this.props.address && ' '}
            />
          </View>
          <JatuhKebawah
            label="Lama Tinggal"
            stateName="lstay"
            onValueChange={this.props.handlerChangeValue}
            title={this.props.lstay}
            datas={this.state.lstayDropdown}
          />
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nama Ibu Kandung"
              value={this.props.momname}
              onChangeText={data =>
                this.props.handlerChangeValue('momname', data)
              }
              error={!this.props.momname && ' '}
            />
          </View>

          <View style={{width: '100%'}}>
            <Btn
              title="NEXT"
              style={{width: 100}}
              onPress={() => this.props.handlerNextPage(1)}
            />
          </View>
        </Content>
      </View>
    );
  }
}
