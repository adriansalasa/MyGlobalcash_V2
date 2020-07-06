/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import {CustomHeader} from '../../CustomHeader';

export class Search extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader
          title="search"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Search Screen</Text>
          <Button
            light
            onPress={() => this.props.navigation.navigate('SearchDetail')}>
            <Text>go to Search detail</Text>
          </Button>
        </View>
      </View>
    );
  }
}
