/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {
  HeaderStyle,
  ContentWrapper,
  ContentStyleDetail,
  Lines,
  CurencyStyle,
  TujuanStyle,
  TujuanStyle2,
  TujuanTextLeft2,
  TujuanTextRight2,
  PickerStyle,
} from './MainStyle';
import Tombol from '../../../constants/Tombol';
import HeaderApp from '../../HeaderApp';
export default class MainDetail extends Component {
  render() {
    return (
      <>
        <HeaderApp title="Detail Pinjaman" navigation={this.props.navigation} />
        <View style={ContentWrapper}>
          <View style={ContentStyleDetail}>
            <Text>Detail Cicilan</Text>
          </View>
          <View style={ContentStyleDetail}>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View
                    style={{
                        backgroundColor: 'red',
                        borderRadius: 50,
                        padding: 5,
                        shadowColor: 'red',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}>
                        <Text>01</Text>
                    </View>
                    <View
                    style={{
                        borderRadius: 50,
                        padding: 5,
                        marignLeft: 5,
                        fontWeight: 'bold',
                    }}>
                        <Text>Periode Pertama</Text>
                    </View>
                </View>
                <View style={{marginHorizontal: 10}}>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Text style={{width: 160, color: '#747474'}}>Tanggal Pembayaran</Text>
                        <Text style={{flex: 1, textAlign: 'right', fontWeight: 'bold'}}>2021-01-09</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Text style={{width: 160, color: '#747474',}}>Bunga</Text>
                        <Text style={{flex: 1, textAlign: 'right', fontWeight: 'bold'}}>Rp, 9.100</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Text style={{width: 160, color: '#747474'}}>Biaya Layanan</Text>
                        <Text style={{flex: 1, textAlign: 'right', fontWeight: 'bold'}}>Rp, 35.280</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Text style={{width: 160, color: '#747474'}}>Jumlah Pembayaran</Text>
                        <Text style={{flex: 1, textAlign: 'right', fontWeight: 'bold'}}>Rp, 174.125</Text>
                    </View>
                </View>
                <View style={Lines} />
            </View>
          </View>
        </View>
      </>
    );
  }
}
