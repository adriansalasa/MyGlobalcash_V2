/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export default class HeaderApp extends Component {
  render() {
    let {title, isHome} = this.props;
    return (
      <>
        <StatusBar backgroundColor="#f05d00" barStyle="light-content" />
        <LinearGradient
          colors={['#f05d00', '#ff9f26']}
          style={styles.BackHeader}>
          <View style={{width: 15}}>
            {isHome ? (
              <Icon
                name="menu"
                style={{color: 'white'}}
                onPress={() => this.props.navigation.openDrawer()}
              />
            ) : (
              <Icon
                name="arrow-back"
                style={{color: 'white'}}
                onPress={() => this.props.navigation.goBack()}
              />
            )}
          </View>
        </LinearGradient>
      </>
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
