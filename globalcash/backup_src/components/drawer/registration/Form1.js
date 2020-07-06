/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Content,
  Text,
  Form,
  Label,
  Input,
  Item,
  StyleProvider,
} from 'native-base';
import Tombol from '../../../constants/Tombol';

export class Form1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      nasabahState,
      mobile,
      nameState,
      titleState,
      locationState,
      addressState,
      lstayState,
      momnameState,
    } = this.props;

    return (
      <>
        <Text style={{color: '#f05d00', fontSize: 18}}>DATA DIRI</Text>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label style={styles.LabelInput}>Nama Lengkap</Label>
              <Input
                style={styles.TextInput}
                value={nameState}
                onChangeText={name =>
                  this.props.handlerChangeValue('name', name)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Gelar Tertinggi</Label>
              <Input
                value={titleState}
                onChangeText={title =>
                  this.props.handlerChangeValue('title', title)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Lokasi</Label>
              <Input
                value={locationState}
                onChangeText={location =>
                  this.props.handlerChangeValue('location', location)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Alamat Lengkap</Label>
              <Input
                value={addressState}
                onChangeText={address =>
                  this.props.handlerChangeValue('address', address)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Lama Tinggal</Label>
              <Input
                value={String(lstayState)}
                onChangeText={lstay =>
                  this.props.handlerChangeValue('lstay', lstay)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Lama Ibu Kandung</Label>
              <Input
                value={momnameState}
                onChangeText={momname =>
                  this.props.handlerChangeValue('momname', momname)
                }
              />
            </Item>
          </Form>
        </Content>
        <View style={{width: '100%'}}>
          <Tombol
            title="NEXT"
            onPress={() => this.props.handlerNextPage('Form2')}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  LabelInput: {},
  TextInput: {},
});
