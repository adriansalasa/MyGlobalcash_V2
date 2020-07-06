/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Content, Text, Form, Label, Input, Item} from 'native-base';
import Tombol from '../../../constants/Tombol';

export class Form2 extends React.Component {
  render() {
    const {
      comnameState,
      comfieldState,
      comaddressState,
      lworkState,
      avsalaryState,
      comlocationState,
    } = this.props;
    return (
      <>
        <Text style={{color: '#f05d00', fontSize: 18}}>PEKERJAAN</Text>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nama Perusahaan</Label>
              <Input
                value={comnameState}
                onChangeText={comname =>
                  this.props.handlerChangeValue('comname', comname)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Bidang Pekerjaan</Label>
              <Input
                value={comfieldState}
                onChangeText={comfield =>
                  this.props.handlerChangeValue('comfield', comfield)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Alamat Kantor</Label>
              <Input
                value={comaddressState}
                onChangeText={comaddress =>
                  this.props.handlerChangeValue('comaddress', comaddress)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Lama Bekerja</Label>
              <Input
                value={String(lworkState)}
                onChangeText={lwork =>
                  this.props.handlerChangeValue('lwork', lwork)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Kisaran Gaji</Label>
              <Input
                value={avsalaryState}
                onChangeText={avsalary =>
                  this.props.handlerChangeValue('avsalary', avsalary)
                }
              />
            </Item>
            <Item stackedLabel>
              <Label>Lokasi</Label>
              <Input
                value={comlocationState}
                onChangeText={comlocation =>
                  this.props.handlerChangeValue('comlocation', comlocation)
                }
              />
            </Item>
          </Form>
        </Content>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Tombol
              title="PREV"
              onPress={() => this.props.handlerNextPage('Form1')}
            />
          </View>
          <View style={{flex: 1}}>
            <Tombol
              title="NEXT"
              onPress={() => this.props.handlerNextPage('Form3')}
            />
          </View>
        </View>
      </>
    );
  }
}
