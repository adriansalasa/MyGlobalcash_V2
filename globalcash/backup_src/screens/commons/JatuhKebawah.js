/* eslint-disable react-native/no-inline-styles */
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

export class JatuhKebawah extends Component {
  render() {
    let {label, title, stateName, datas} = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
          height: 48,
          paddingTop: 7,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          marginBottom: 20,
        }}>
        <View style={{position: 'absolute', left: 0, right: 0}}>
          <Text style={{fontSize: 12, color: 'gray'}}>{label}</Text>
        </View>
        <Item picker>
          <Picker
            iosIcon={<Icon name="arrow-down" />}
            style={{height: 35, marginTop: 5}}
            selectedValue={title}
            itemStyle={{color: 'yello'}}
            itemTextStyle={{fontSize: 19, color: 'yellow'}}
            onValueChange={data => this.props.onValueChange(stateName, data)}>
            {datas.map((i, index) => (
              <Picker.Item label={i.label} value={i.value} />
            ))}
          </Picker>
        </Item>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BackHeader: {
    position: 'relative',
    backgroundColor: 'orange',
    height: 200,
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    //backgroundColor: 'red',
    transform: [{scaleX: 1.6}],
    flexDirection: 'row',
    paddingHorizontal: 80,
  },
});
