/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Btn} from '../commons/';
import {getPinjaman} from '../../redux/action/PinjamanAction';
import {getNasabah} from '../../redux/action/NasabahAction';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import NumberFormat from 'react-number-format';
import axios from 'axios';

class FrmPinjam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: '',
    };
  }

  componentDidMount() {
    // const {getRegisterbyMobile, nasabah, redMobile} = this.props;
    this.props.getNasabah(this.props.mobileNum);
    this.props.getPinjaman(this.props.mobileNum);
  }

  confirmasiBayar() {
    this.props.getNasabah(this.props.mobileNum);
    this.props.getPinjaman(this.props.mobileNum);
  }

  ajukanlagi() {
    axios({
      method: 'put',
      // url: `http://192.168.5.27:63003/nasabahDone/${this.props.mobileNum}`,
      url: `http://103.121.149.77:63003/nasabahDone/${this.props.mobileNum}`,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    this.props.getNasabah(this.props.mobileNum);
  }

  total() {
    const {pinjaman} = this.props;
    let total =
      parseInt(pinjaman.jmlPinjam) +
      (parseInt(pinjaman.jmlPinjam) * parseInt(pinjaman.bunga)) / 100 +
      (parseInt(pinjaman.jmlPinjam) * parseInt(pinjaman.bunga)) / 100;
    return (
      <Text style={styles.labelText}>
        <NumberFormat
          value={total}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp '}
          renderText={value => <Text>{value}</Text>}
        />
      </Text>
    );
  }

  render() {
    const {pinjaman} = this.props;
    return (
      <>
        {pinjaman && pinjaman.status_pinjam === '1' ? (
          <>
            <Text>Nilai Pinjaman</Text>
            <Text style={styles.Currency}>
              <NumberFormat
                value={pinjaman.jmlPinjam}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp '}
                renderText={value => <Text>{value}</Text>}
              />
            </Text>

            <View style={styles.OptionsPinjam}>
              <View style={styles.Label}>
                <Text style={styles.labelText}>Tujuan Pinjam</Text>
              </View>
              <Text style={styles.labelText}>:</Text>
              <View style={styles.dropdownStyle}>
                <Text>{pinjaman.tujuanPinjam}</Text>
              </View>
            </View>
            <View style={styles.OptionsPinjam}>
              <View style={styles.Label}>
                <Text style={styles.labelText}>Tanggal Pinjam</Text>
              </View>
              <Text style={styles.labelText}>:</Text>
              <View style={styles.dropdownStyle}>
                <Text>{pinjaman.tglPinjam.split('T')[0]}</Text>
              </View>
            </View>
            <View style={styles.OptionsPinjam}>
              <View style={styles.Label}>
                <Text style={styles.labelText}>Bunga ({pinjaman.bunga}%)</Text>
              </View>
              <Text style={styles.labelText}>:</Text>
              <View style={styles.dropdownStyle}>
                <Text>
                  <NumberFormat
                    value={
                      (parseInt(pinjaman.jmlPinjam) *
                        parseInt(pinjaman.bunga)) /
                      100
                    }
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp '}
                    renderText={value => <Text>{value}</Text>}
                  />
                </Text>
              </View>
            </View>
            <View style={styles.OptionsPinjam}>
              <View style={styles.Label}>
                <Text style={styles.labelText}>
                  Biaya Admin ({pinjaman.bunga}%)
                </Text>
              </View>
              <Text style={styles.labelText}>:</Text>
              <View style={styles.dropdownStyle}>
                <Text>
                  <NumberFormat
                    value={
                      (parseInt(pinjaman.jmlPinjam) *
                        parseInt(pinjaman.bunga)) /
                      100
                    }
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp '}
                    renderText={value => <Text>{value}</Text>}
                  />
                </Text>
              </View>
            </View>
            <View style={styles.OptionsPinjam}>
              <View style={styles.Label}>
                <Text style={styles.labelText}>Jatuh Tempo</Text>
              </View>
              <Text style={styles.labelText}>:</Text>
              <View style={styles.dropdownStyle}>
                <Text>{pinjaman.tglJatuhTempo}</Text>
              </View>
            </View>
            <View style={styles.OptionsPinjam}>
              <View style={styles.Label}>
                <Text style={styles.labelText}>Total Bayar</Text>
              </View>
              <Text style={styles.labelText}>:</Text>
              <View style={styles.dropdownStyle}>{this.total()}</View>
            </View>
            <View style={styles.OptionsPinjam}>
              <Text style={{color: 'red'}}>
                {pinjaman.keterangan && pinjaman.keterangan}
              </Text>
            </View>
            <View style={{width: '90%', paddingTop: 10}}>
              <Btn
                title="KONFIRMASI BAYAR"
                onPress={() => this.confirmasiBayar()}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                width: '90%',
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Anda Sudah Melunasi tagihan</Text>
              <Text>Terimakasih Sudah mengunakan Jasa kami</Text>
              <Text>silahkan klik tombol dibawah</Text>
              <View style={{width: '90%'}}>
                <Btn
                  title="AJUKAN PINJAMAN LAGI"
                  onPress={() => this.ajukanlagi()}
                />
              </View>
            </View>
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  Currency: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdownStyle: {
    width: 160,
    borderRadius: 3,
    fontSize: 18,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  dropdownText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  OptionsPinjam: {flexDirection: 'row', marginTop: 20},
  Label: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  dropdownDropdown: {
    width: 150,
    height: 300,
    borderWidth: 2,
    borderRadius: 3,
  },
  labelText: {
    color: '#3e3e3e',
    fontWeight: 'bold',
  },
  snapsliderContainer: {marginTop: 10},
  snapslider: {},
  snapsliderItemWrapper: {},
  snapsliderItem: {},
});

const mapStoreToProps = state => ({
  loading: state.pinjaman.loading,
  pinjaman: state.pinjaman.pinjaman,
  nasabah: state.nasabah.nasabah,
});
const mapDispatchToProps = dispatch => ({
  getPinjaman: mobile => dispatch(getPinjaman(mobile)),
  getNasabah: mobile => dispatch(getNasabah(mobile)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(FrmPinjam);
