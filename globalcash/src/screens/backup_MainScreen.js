import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getNasabah, setLoading} from '../redux/action/NasabahAction';
import {connect} from 'react-redux';

import deviceStorage from '../services/deviceStorage';
import MainFresh from './components/MainFresh';
import FrmPinjam from './components/FrmPinjam';
import {Header, Btn} from './commons/';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: null,
      loading: true,
      besarPinjam: '500000',
      tujuanPinjam: '',
      tanggalPinjam: '',
    };

    // this.newJWT = this.newJWT.bind(this);
    this.loadJWT = this.loadJWT.bind(this);
    this.loadJWT();

    // this.slidingComplete = this.slidingComplete.bind(this);
    this.handlerChangeValue = this.handlerChangeValue.bind(this);
  }

  handlerChangeValue(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }

  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        this.props.getNasabah(value);
        this.setState({
          jwt: value,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }

  componentDidMount() {
    // console.log(deviceStorage.loadJWT());
    // this.props.setLoading(true);
    // this.props.getNasabah('0812832234');
    const {getNasabah, redMobile} = this.props;
  }

  async _Ajukan() {
    // eslint-disable-next-line no-lone-blocks
    await this.loadJWT();
    {
      !this.props.nasabah
        ? this.props.navigation.navigate('Registration')
        : this.props.nasabah.verified_status === 1
        ? alert('Menunggu Konfirmasi')
        : alert('Proses Pengajuan anda lagi diproses');
    }
  }

  apply_pinjaman() {
    // eslint-disable-next-line no-lone-blocks
    {
      !this.state.besarPinjam ||
      !this.state.tujuanPinjam ||
      !this.state.tanggalPinjam
        ? alert('Silahkan Pilih Tujuan dan Tanggal Bayar')
        : axios({
            method: 'post',
            // url: `http://192.168.5.27:63003/pinjam/${this.state.jwt}`,
            url: `http://103.121.149.77:63003/pinjam/${this.state.jwt}`,
            headers: {},
            data: {
              jmlPinjam: this.state.besarPinjam,
              tujuanPinjam: this.state.tujuanPinjam,
              tglBayar: this.state.tanggalPinjam,
              status_pinjam: '1',
            },
          })
            .then(res => {
              this.props.getNasabah(this.state.jwt);
              alert(res.data.message);
              console.log(res);
            })
            .catch(err => {
              //handle error
              console.log(err);
            });
    }
  }

  lengkapi() {
    this.props.navigation.navigate('Registration');
  }

  render() {
    const {nasabah} = this.props;
    return (
      <View>
        <Spinner visible={this.props.loadings} textContent={'Loading...'} />
        <Header title="Home" isHome={true} navigation={this.props.navigation} />
        <View style={styles.Container}>
          {nasabah && nasabah.verified_status === 3 ? (
            <FrmPinjam
              mobileNum={this.state.jwt}
              navigation={this.props.navigation}
            />
          ) : nasabah && nasabah.verified_status === 4 ?(
            <View>
              <Text>Pengajuaan Anda diTolak</Text>
            </View>
          ) : <MainFresh
              handlerChangeValue={this.handlerChangeValue}
              navigation={this.props.navigation}
            />
          }
          <View style={{width: '90%', paddingTop: 10}}>
            {!nasabah ? (
              <Btn title="LENGKAPI DATA" onPress={() => this._Ajukan()} />
            ) : nasabah.verified_status === 1 ? (
              <Btn
                title="MENUNGGU KONFIRMASI DATA"
                onPress={() => this.props.getNasabah(this.state.jwt)}
              />
            ) : nasabah.verified_status === 2 ? (
              <Btn
                title="AJUKAN PINJAMAN"
                onPress={() => this.apply_pinjaman()}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

// export default MainScreen;

const mapStoreToProps = state => ({
  loadings: state.nasabah.loading,
  nasabah: state.nasabah.nasabah,
  redMobile: state.register.redMobile,
});
const mapDispatchToProps = dispatch => ({
  getNasabah: mobile => dispatch(getNasabah(mobile)),
  setLoading: p => dispatch(setLoading(p)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(MainScreen);
