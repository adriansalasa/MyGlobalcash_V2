import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Content} from 'native-base';
import Reinput from 'reinput';
import {JatuhKebawah, Btn} from '../commons/';

export class RegFormInput3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHubungan: [
        {label: 'Ibu', value: 'Ibu'},
        {label: 'Ayah', value: 'Ayah'},
        {label: 'Kakak', value: 'Adik'},
        {label: 'Teman', value: 'Teman'},
        {label: 'Pacar', value: 'Pacar'},
        {label: 'Istri', value: 'Istri'},
        {label: 'Ayah', value: 'Ayah'},
      ],
    };
    this.handlerCloseDrop = this.handlerCloseDrop.bind(this);
  }

  handlerCloseDrop(stateName, stateValue) {
    this.setState({[stateName]: stateValue});
  }
  render() {
    return (
      <View>
        <Content>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nama ke-1"
              value={this.props.ename1}
              onChangeText={data =>
                this.props.handlerChangeValue('ename1', data)
              }
              error={!this.props.ename1 && ' '}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            {/* <Reinput
              label="Hubungan"
              value={this.props.erel1}
              onChangeText={data =>
                this.props.handlerChangeValue('erel1', data)
              }
              error={!this.props.erel1 && ' '}
            /> */}
            <JatuhKebawah
              label="Hubungan"
              stateName="hubungan"
              onValueChange={this.props.handlerChangeValue}
              title={this.props.hubungan}
              datas={this.state.listHubungan}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nomor Telpon"
              keyboardType="number-pad"
              value={this.props.emobile1}
              onChangeText={data =>
                this.props.handlerChangeValue('emobile1', data)
              }
              error={!this.props.emobile1 && ' '}
              maxLength={12}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nama ke-2"
              value={this.props.ename2}
              onChangeText={data =>
                this.props.handlerChangeValue('ename2', data)
              }
              error={!this.props.ename2 && ' '}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            {/* <Reinput
              label="Hubungan"
              value={this.props.erel2}
              onChangeText={data =>
                this.props.handlerChangeValue('erel2', data)
              }
              error={!this.props.erel2 && ' '}
            /> */}
            <JatuhKebawah
              label="Hubungan2"
              stateName="hubungan2"
              onValueChange={this.props.handlerChangeValue}
              title={this.props.hubungan2}
              datas={this.state.listHubungan}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Nomor Telpon"
              keyboardType="number-pad"
              value={this.props.emobile2}
              onChangeText={data =>
                this.props.handlerChangeValue('emobile2', data)
              }
              error={!this.props.emobile2 && ' '}
              maxLength={12}
            />
          </View>
        </Content>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Btn title="PREV" onPress={() => this.props.handlerNextPage(1)} />
          </View>
          <View style={{flex: 1}}>
            <Btn title="NEXT" onPress={() => this.props.handlerNextPage(3)} />
          </View>
        </View>
      </View>
    );
  }
}
