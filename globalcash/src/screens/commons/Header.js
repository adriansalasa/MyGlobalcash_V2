/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export class Header extends Component {
  render() {
    let {title, isHome} = this.props;
    return (
      <View>
        <StatusBar backgroundColor="#4c669f" barStyle="light-content" />
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.BackHeader}
        />
        <View style={{width: 15, position: 'absolute', left: 5, top: 5}}>
          {!isHome ? 
            <Icon
              name="arrow-back"
              style={{color: 'white'}}
              onPress={() => this.props.navigation.goBack()}
            />
           : null}
        </View>
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
