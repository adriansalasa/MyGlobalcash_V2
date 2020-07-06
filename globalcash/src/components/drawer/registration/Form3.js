/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Content, Text, Form, Label, Input, Item} from 'native-base';
import Tombol from '../../../constants/Tombol';

export class Form3 extends React.Component {
  render() {
    const {
      ename1State,
      erel1State,
      emobile1State,
      ename2State,
      erel2State,
      emobile2State,
    } = this.props;
    return (
      <>
        <Text style={{color: '#f05d00', fontSize: 18}}>KONTAK DARURAT</Text>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nama</Label>
              <Input
                value={ename1State}
                onChangeText={ename1 =>
                  this.props.handlerChangeValue('ename1', ename1)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Hubungan</Label>
              <Input
                value={erel1State}
                onChangeText={erel1 =>
                  this.props.handlerChangeValue('erel1', erel1)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>No. Handphone</Label>
              <Input
                value={emobile1State}
                onChangeText={emobile1 =>
                  this.props.handlerChangeValue('emobile1', emobile1)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Nama</Label>
              <Input
                value={ename2State}
                onChangeText={ename2 =>
                  this.props.handlerChangeValue('ename2', ename2)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Hubungan</Label>
              <Input
                value={erel2State}
                onChangeText={erel2 =>
                  this.props.handlerChangeValue('erel2', erel2)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>No. Handphone</Label>
              <Input
                value={emobile2State}
                onChangeText={emobile2 =>
                  this.props.handlerChangeValue('emobile2', emobile2)
                }
              />
            </Item>
          </Form>
        </Content>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Tombol
              title="PREV"
              onPress={() => this.props.handlerNextPage('Form2')}
            />
          </View>
          <View style={{flex: 1}}>
            <Tombol
              title="NEXT"
              onPress={() => this.props.handlerNextPage('Form4')}
            />
          </View>
        </View>
      </>
    );
  }
}
