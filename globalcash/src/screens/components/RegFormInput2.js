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
      listBank: [
        // {label: 'BCA', value: 'BCA'},
        // {label: 'MANDIRI', value: 'MANDIRI'},
        // {label: 'BNI', value: 'BNI'},
        // {label: 'BRI', value: 'BRI'},
        // {label: 'PERMATA', value: 'PERMATA'},
        {label: 'Pilih Bank', value: '000'},
        {label: 'BCA', value: '014'},
        {label: 'MANDIRI', value: '008'},
        {label: 'BNI', value: '009'},
        {label: 'BRI', value: '002'},
        {label: 'PERMATA', value: '013'},
      ],
      listUsaha: [
        {label: 'Keuangan', value: 'Keuangan'},
        {label: 'Pertanian', value: 'Pertanian'},
        {label: 'Perbankan', value: 'Perbankan'},
        {label: 'Perikanan', value: 'Perikanan'},
        {label: 'Industri', value: 'Industri'},
        {label: 'Informasi Teknologi', value: 'Informasi Teknologi'},
        {label: 'Otomotif', value: 'Otomotif'},
        {label: 'Lain-Lain', value: 'Lain-Lain'},
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
            {/* <Reinput
              label="Bidang Usaha"
              value={this.props.comfield}
              onChangeText={data =>
                this.props.handlerChangeValue('comfield', data)
              }
              error={!this.props.comfield && ' '}
            /> */}
            <JatuhKebawah
              label="Bidang Usaha"
              stateName="comfield"
              onValueChange={this.props.handlerChangeValue}
              title={this.props.comfield}
              datas={this.state.listUsaha}
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
              // name="arrow-down"
              // style={{color: 'gray', top: 8, right: 0, position: 'absolute'}}
              type="FontAwesome5"
              name="map-marker-alt"
              style={{color: '#f44321', top: 10, right: 0, position: 'absolute', fontSize: 25}}
              onPress={() => this.setState({showDrop: true})}
            />
            <DropdownLocationCom
              handlerCloseDrop={this.handlerCloseDrop}
              showDrop={this.state.showDrop}
              handlerChangeValue={this.props.handlerChangeValue}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            {/* <Reinput
              label="Nama Bank"
              value={this.props.rekbank}
              onChangeText={data =>
                this.props.handlerChangeValue('rekbank', data)
              }
              error={!this.props.rekbank && ' '}
            /> */}
            <JatuhKebawah
              label="Nama Bank"
              stateName="id_bank"
              onValueChange={this.props.handlerChangeValue}
              title={this.props.id_bank}
              datas={this.state.listBank}
            />
          </View>

          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nomor Rekening"
              keyboardType="number-pad"
              value={this.props.no_rekening}
              onChangeText={data =>
                this.props.handlerChangeValue('no_rekening', data)
              }
              error={!this.props.no_rekening && ' '}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nama Rekening"
              value={this.props.nama_rekening}
              onChangeText={data =>
                this.props.handlerChangeValue('nama_rekening', data)
              }
              error={!this.props.nama_rekening && ' '}
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
