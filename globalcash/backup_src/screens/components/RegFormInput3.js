import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Content} from 'native-base';
import Reinput from 'reinput';
import {Btn} from '../commons/';

export class RegFormInput3 extends Component {
  render() {
    return (
      <View>
        <Content>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Name"
              value={this.props.ename1}
              onChangeText={data =>
                this.props.handlerChangeValue('ename1', data)
              }
              error={!this.props.ename1 && ' '}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Hubungan"
              value={this.props.erel1}
              onChangeText={data =>
                this.props.handlerChangeValue('erel1', data)
              }
              error={!this.props.erel1 && ' '}
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
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Name"
              value={this.props.ename2}
              onChangeText={data =>
                this.props.handlerChangeValue('ename2', data)
              }
              error={!this.props.ename2 && ' '}
            />
          </View>
          <View style={{alignItems: 'center', height: 70}}>
            <Reinput
              label="Hubungan"
              value={this.props.erel2}
              onChangeText={data =>
                this.props.handlerChangeValue('erel2', data)
              }
              error={!this.props.erel2 && ' '}
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
