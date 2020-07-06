/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export function Btn_Blue({title, onPress}) {
  const styles = StyleSheet.create({
    containerInputText: {
      marginVertical: 10,
      backgroundColor: 'white',
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 3,
    },
  });

  return (
    <LinearGradient
      // colors={['#f05d00', '#ff9f26']}
      colors={['#218aff', '#549ef1']}
      style={styles.containerInputText}>
      <TouchableOpacity
        style={{
          height: 40,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}
          onPress={onPress}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
