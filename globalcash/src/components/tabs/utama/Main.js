/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Picker} from 'native-base';
import {HeaderStyle, ContentWrapper, ContentStyle, Lines, CurencyStyle, TujuanStyle, TujuanStyle2, TujuanTextLeft2, TujuanTextRight2, PickerStyle} from './MainStyle';
import Tombol from '../../../constants/Tombol';
import HeaderApp from '../../HeaderApp';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

class Main extends Component {
    constructor(props) {
    super(props);

    this.state = {
      activeBln: 1,
      bln: null,
      text1: '',
      text2: '',
      language: '',
      tujuanPinjam: [
        'konsumtif',
        'bertani/berkebun',
        'berternak',
        'perikanan',
        'tagihan listrik',
        'tagihan gas',
        'tagihan air',
        'biaya katering',
        'pendidikan',
        'berobat',
        'kebutuhan sehari-hari',
      ],
    };
  }

  componentDidMount() {
    const {getRegisterbyMobile, redMobile} = this.props;
    getRegisterbyMobile(redMobile);
  }

  setPinjam(){
    const {getPinjaman, redMobile} = this.props;
    {this.props.pinjam
    ?
        alert('Anda Sudah Mengajukan, silahkan tunggu')
    :
        axios.post('http://182.253.28.197:63003/api/pinjam', {
            mobile: this.props.redMobile,
            jmlpinjam: '400000',
            tglbayar: '2020/01/20',
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        getPinjaman(redMobile);
    }
  }

  onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
    }

  render() {
      const {bln, tujuanPinjam} = this.state;
      const {nasabah} = this.props;
    return (
        <>
            <HeaderApp title="Home" isHome={true} navigation={this.props.navigation} />
            {/* <Spinner
                visible={this.props.loading}
                textContent={'Loading...'}
                /> */}
            {nasabah && nasabah.verified === '3' 
            ?
                <View style={ContentWrapper}>
                    <View style={ContentStyle}>
                        <Text style={{fontSize: 25, height:40}}>Detail Pinjaman</Text>
                        <View style={{flexDirection: 'row', height: 25}}>
                            <Text style={{flex: 1}}>Total Pinjaman</Text>
                            <Text>Rp, 400.000</Text>
                        </View>
                        <View style={{flexDirection: 'row', height: 25}}>
                            <Text style={{flex: 1}}>Tanggal Pembayaran</Text>
                            <Text>2020/01/20</Text>
                        </View>
                        <View style={{flexDirection: 'row', height: 25}}>
                            <Text style={{flex: 1}}>Bunga Pinjaman</Text>
                            <Text>Rp, 9.100</Text>
                        </View>
                        <View style={{flexDirection: 'row', height: 25}}>
                            <Text style={{flex: 1}}>Biaya Layanan</Text>
                            <Text>Rp, 35.280</Text>
                        </View>
                        <View style={{flexDirection: 'row', height: 25}}>
                            <Text style={{flex: 1}}>Total Bayar</Text>
                            <Text>Rp, 444.000</Text>
                        </View>
                    </View>
                </View>
            :
            <View style={ContentWrapper}>
                <View style={ContentStyle}>
                    <Text>Jumlah Pinjaman</Text>
                    <Text style={CurencyStyle}>Rp, 400.000</Text>
                    <View style={Lines} />
                    <View
                        style={TujuanStyle}>
                        <Text>Tujuan Pinjaman</Text>
                        <View style={PickerStyle}>
                        <Picker
                            style={{width: '100%', backgroundColor: '#f3f3f3', height: 20}}
                            selectedValue={this.state.language}
                            onValueChange={itemValue => this.setState({language: itemValue})}>
                            {tujuanPinjam.map((i, index) => (
                                <Picker.Item key={index} label={i} value={i} />
                            ))}
                        </Picker>
                        </View>
                    </View>
                    <View
                        style={TujuanStyle2}>
                        <Text style={TujuanTextLeft2}>Jumlah Bayar</Text>
                        <Text style={TujuanTextRight2} onPress={() => this.props.navigation.navigate('UtamaDetail')}>Rp, 420.000 ></Text>
                    </View>
                    <View style={{width: '90%'}}>
                        {nasabah ?
                            [
                            nasabah.verified === '1' ?
                                <Tombol
                                    key="1"
                                    title="MENUNGGU KONFORMASI DATA"
                                    // onPress={() => this.props.handlerNextPage('Form2')}
                                />
                            :
                                <Tombol
                                    key="2"
                                    title="AJUKAN"
                                    onPress={() => this.setPinjam()}
                                />,
                            ]
                        :
                        <Tombol
                            key="3"
                            title="LENGKAPI DATA"
                            onPress={() => this.props.navigation.navigate('Registration')}
                        />
                        }
                    </View>
                </View>
            </View>
            }
        </>
    );
  }
}

export default Main;
