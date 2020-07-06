/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import {CustomHeader} from '../../CustomHeader';
import {WebView} from 'react-native-webview';
import {Header, Btn} from '../../../screens/commons/';

export class Feed extends Component {
  render() {
    return (
      // <Header>
      <View style={{flex: 1}}>
        {/* <CustomHeader
          title="Feed"
          isHome={true}
          navigation={this.props.navigation}
        /> */}
        <WebView
          source={{uri: 'https://www.globalmulticash.com/'}}
          originWhitelist={['https://*', 'http://*']}
        />
      </View>
      // </Header>
    );
  }
}
