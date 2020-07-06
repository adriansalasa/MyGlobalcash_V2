/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {Content, Text, Button, Picker, Icon, Form} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import HeaderApp from '../../HeaderApp';
import Spinner from 'react-native-loading-spinner-overlay';

class Utama extends Component {
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
      selected: 'key1',
    };
  }

  componentDidMount() {
    const {getRegisterbyMobile, redMobile} = this.props;
    this.setState({bln: [1, 2, 3, 4, 5, 6]});
    console.log(this.state.bln);
    getRegisterbyMobile(redMobile);
  }

  btnBulan() {
    return (
      this.state.bln &&
      this.state.bln.map((data, index) => {
        return (
          <Text
            key={index}
            style={
              this.state.activeBln === data
                ? styles.btnBlnActive
                : styles.btnBln
            }
            onPress={() => this.setState({activeBln: data})}>
            {data}
          </Text>
        );
      })
    );
  }

  render() {
    const {bln, tujuanPinjam} = this.state;
    console.log(this.state.bln);
    return (
      <View style={styles.mainWrapper}>
        <Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <HeaderApp title="Home" navigation={this.props.navigation} />
        <View style={styles.FrontHeader}>
          <Text style={{color: '#f05d00', color: '#404040', fontSize: 12}}>
            total pinjaman
          </Text>
          <Text
            style={{
              fontSize: 35,
              fontWeight: 'bold',
              color: '#404040',
              paddingBottom: 12,
            }}>
            Rp, 2.000.000
          </Text>
          <Text>Pilih Tenor / Bulan</Text>
          <View style={{flexDirection: 'row'}}>{this.btnBulan()}</View>
          <View
            style={{
              borderWidth: 0.5,
              width: '100%',
              borderColor: '#404040',
              margin: 10,
            }}
          />
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 5,
            }}>
            <Text style={{flex: 1, textAlign: 'left', fontSize: 15}}>
              Tujuan Peminjaman
            </Text>
            <Picker
              style={{width: '100%', backgroundColor: '#f5f5f5'}}
              selectedValue={this.state.language}
              onValueChange={itemValue => this.setState({language: itemValue})}>
              {tujuanPinjam.map((i, index) => (
                <Picker.Item key={index} label={i} value={i} />
              ))}
            </Picker>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 5,
            }}>
            <Text style={{flex: 1, textAlign: 'left', fontSize: 15}}>
              Tanggal Pembayaran
            </Text>
            <Picker
              iosIcon={
                <Icon
                  name="arrow-dropdown-circle"
                  style={{color: '#007aff', fontSize: 25}}
                />
              }
              style={{width: '100%', backgroundColor: '#f5f5f5'}}
              selectedValue={`${this.state.language} (pilih)`}
              onValueChange={itemValue => this.setState({language: itemValue})}>
              {tujuanPinjam.map((i, index) => (
                <Picker.Item key={index} label={i} value={i} />
              ))}
            </Picker>
          </View>
          <View style={{flexDirection: 'row', width: '100%', paddingBottom: 5}}>
            <Text style={{flex: 1, textAlign: 'left', fontSize: 13}}>
              Jumlah Pembayaran
            </Text>
            <Text style={{flex: 1, textAlign: 'right', fontSize: 13}}>
              Tujuan Peminjaman
            </Text>
          </View>
          <LinearGradient
            colors={['#f05d00', '#ff9f26']}
            style={styles.containerInputText}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 300,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  textAlign: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Registration')}>
                APPLY NOW
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    position: 'relative',
  },
  BackHeader: {
    backgroundColor: 'orange',
    height: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    //backgroundColor: 'red',
    transform: [{scaleX: 1.2}],
    flexDirection: 'row',
    paddingHorizontal: 40,
  },
  FrontHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    top: 30,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

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

  btnBln: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    padding: 5,
    margin: 2,
  },

  btnBlnActive: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'orange',
    color: 'orange',
    padding: 5,
    margin: 2,
  },
});

export default Utama;
