/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert} from 'react-native';
import {TEXT} from './env';

export default function Alerting({title, OK, OKText, Cancel, CancelText}) {
  return (
    Alert.alert(
    TEXT.TEXT_TITLE_APP,
    {title},
    [
      {
        text: 'Ganti Nomor',
        onPress: () => Cancel,
        style: 'cancel',
      },
      {text: 'Sudah', onPress: () => OK},
    ],
    {cancelable: false},
  )
  )
}
