import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Reinput from 'reinput';

export class InputKTP extends Component {
  render() {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          marginTop: 10,
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 20,
          height: 40,
        }}>
        <View>
          <Text style={{width: 100, top: 0, marginTop: -15, color: 'gray'}}>
            {this.props.label}
          </Text>
        </View>
        <Text style={{marginTop: -15}}>: </Text>
        <View style={{flex: 1, marginTop: 20, marginBottom: 0}}>
          <Reinput
            placeholder="Input Nik"
            marginBottom={0}
            paddingBottom={5}
            paddingTop={5}
            paddingLeft={5}
            value={this.props.value}
            keyboardType="number-pad"
            onChangeText={data =>
              this.props.handlerChangeValue(this.props.sts, data)
            }
          />
        </View>
      </View>
    );
  }
}
