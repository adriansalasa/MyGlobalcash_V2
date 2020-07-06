/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SnapSlider from 'react-native-snap-slider';
import ModalDropdown from 'react-native-modal-dropdown';
import {Btn} from '../commons/';
import {getOpinjam} from '../../redux/action/OpsiAction';
import {getPinjaman} from '../../redux/action/PinjamanAction';
// import FormVirtualAcc from './FormVirtualAcc';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import {
  ContentStyleDetail,
  ContentStyleDetail2,
  ContentStyleDetail3,
} from '../../components/tabs/utama/MainStyle';
import {ContentWrapper} from '../../components/tabs/utama/MainStyle';

class MainFresh2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: null,
      toDate: '',
      toMonth: '',
      toYear: '',
      tDMY: '',
    };
  }

  componentDidMount() {
    const {getRegisterbyMobile, nasabah, redMobile, getPinjaman} = this.props;
    this.props.getOpinjam(redMobile);
    // this.props.getPinjaman(this.props.mobileNum);
    let toDate = new Date().getDate();
    let toMonth = new Date().getMonth() + 1;
    let toYear = new Date().getFullYear();

    let nxtMonth = toMonth + 1;
    let nxtDate = toDate + 1;
    let nxtYear = toYear + 1;

    // tgl bulan depan
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 30);

    if (toMonth < 9) {
      toMonth = '0' + toMonth;
    }

    if (toDate < 9) {
      toDate = '0' + toDate;
    }

    if (nxtMonth < 9) {
      nxtMonth = '0' + nxtMonth;
    }

    if (nxtDate < 9) {
      nxtDate = '0' + nxtDate;
    }
    // let getDaysInMonth = function(month, year) {
    //   // Here January is 1 based
    //   //Day 0 is the last day in the previous month
    //   return new Date(year, month, 0).getDate();
    //   // Here January is 0 based
    //   // return new Date(year, month+1, 0).getDate();
    // };
    // alert(getDaysInMonth(3, 2020));

    this.setState({
      toDate: toDate,
      toMonth: toMonth,
      toYear: toYear,
      // tDMY: toDate + '/' + toMonth + '/' + toYear,
      tDMY: toDate + '/' + toMonth + '/' + toYear,
      nxtMonth: nxtMonth,
      nxtDate: nxtDate,
      nxtYear: nxtYear,
      tnDMY: nxtMonth + '/' + nxtDate + '/' + nxtYear,
      ttnDMY:
        toDate +
        '/' +
        toMonth +
        '/' +
        toYear +
        '-' +
        nxtDate +
        '/' +
        nxtMonth +
        '/' +
        nxtYear,
    });
  }

  bayarVA(){
    alert('bayar');
  }

  render() {
    const {pinjaman} = this.props;

    return (
      <>
        {pinjaman && pinjaman.status_pinjam === '2' ? (
          <>            
            <View style={ContentStyleDetail}>
              <Text style={styles.OptionsPinjamJdl}>Total Pembayaran (Rp)</Text>
              <Text style={styles.Currency}>
                <NumberFormat
                  value={pinjaman.jmlPinjam}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp '}
                  renderText={value => <Text>{value}</Text>}
                />
              </Text>
            </View>

            <View style={ContentStyleDetail2}>
              <View style={styles.OptionsPeriod}>
                <View style={styles.LabelPeriod}>
                  <Text style={styles.labelSub}>Periode 1</Text>
                </View>
                {/* <Text style={styles.labelText}>:</Text> */}
                <View style={styles.labelText}>
                  <Text style={styles.labelTextPeriod}>
                    {this.state.ttnDMY}
                  </Text>
                </View>
              </View>

              <View style={styles.OptionsBaris}>
                <View style={styles.Label}>
                  <Text style={styles.labelText}>Pokok Pinjaman</Text>
                </View>
                {/* <Text style={styles.labelText}>:</Text> */}
                <View style={styles.Label}>
                  <Text style={styles.LilCurrency}>
                    <NumberFormat
                      value={pinjaman.jmlPinjam}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp '}
                      renderText={value => <Text>{value}</Text>}
                    />
                  </Text>
                </View>
              </View>

              <View style={styles.OptionsBaris}>
                <View style={styles.Label}>
                  <Text style={styles.labelText}>Bunga</Text>
                </View>
                <View style={styles.Label}>
                  <Text style={styles.LilCurrency}>
                    <NumberFormat
                      value={50000}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp '}
                      renderText={value => <Text>{value}</Text>}
                    />
                  </Text>
                </View>
              </View>

              <View style={styles.OptionsBaris}>
                <View style={styles.Label}>
                  <Text style={styles.labelText}>Biaya Layanan</Text>
                </View>
                <View style={styles.Label}>
                  <Text style={styles.LilCurrency}>
                    <NumberFormat
                      value={10000}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp '}
                      renderText={value => <Text>{value}</Text>}
                    />
                  </Text>
                </View>
              </View>

              <View style={styles.OptionsBaris}>
                <View style={styles.Label}>
                  <Text style={styles.labelText}>Tanggal Pembayaran</Text>
                </View>
                <View style={styles.Label}>
                  <Text style={styles.textTgl}>09/02/2020</Text>
                </View>
              </View>

              <View style={styles.OptionsBarisPemb}>
                <View style={styles.Label}>
                  <Text style={styles.labelText}>Jumlah Pembayaran</Text>
                </View>
                <View style={styles.Label}>
                  <Text style={styles.LilCurrency}>
                    <NumberFormat
                      value={
                        parseInt(pinjaman.jmlPinjam) +
                        parseInt(50000) +
                        parseInt(10000)
                      }
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp '}
                      renderText={value => <Text>{value}</Text>}
                    />
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : null}
        {/* <Btn
                  title="Bayar Sekarang juga"
                   onPress={() => this.bayarVA()}
              
                /> */}
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
  LilCurrency: {
    fontSize: 14,
    color: 'grey',
    fontWeight: 'bold',
    marginHorizontal: 25,
  },
  textTgl: {
    color: 'grey',
    fontWeight: 'bold',
    marginHorizontal: 25,
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
  OptionsBaris: {flexDirection: 'row', marginTop: 10},
  OptionsBarisPemb: {flexDirection: 'row', marginTop: 10, marginBottom: 40},
  OptionsPeriod: {flexDirection: 'row', marginTop: 15, marginBottom: 10},
  OptionsPinjamJdl: {flexDirection: 'row', marginTop: 5, marginLeft: 10},

  ContentStyleDetail: {
    borderRadius: 10,
  // marginHorizontal: 20,
  padding: 10,
  position: 'absolute',
  top: 2,
  left: 0,
  right: 0,
  alignItems: 'center',
  },

  Label: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
    left: 6,
  },
  LabelPeriod: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
    color: '#3e3e3e',
    fontWeight: 'bold',
  },
  dropdownDropdown: {
    width: 150,
    height: 300,
    borderWidth: 2,
    borderRadius: 3,
  },
  labelSub: {
    color: '#3e3e3e',
    fontWeight: 'bold',
  },
  labelSubBayar: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  labelText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  labelTextPeriod: {
    color: '#3e3e3e',
    fontWeight: 'bold',
    marginRight: 3,
  },
  labelHeadTitle: {
    color: 'grey',
    fontWeight: '800',
    textAlign: 'center',
    marginLeft: 80,
  },
  snapsliderContainer: {marginTop: 10},
  snapslider: {},
  snapsliderItemWrapper: {},
  snapsliderItem: {},
});

const mapStoreToProps = state => ({
  redMobile: state.register.redMobile,
  loading: state.opsi.loading,
  pinjaman: state.pinjaman.pinjaman,
  nasabah: state.nasabah.nasabah,
});
const mapDispatchToProps = dispatch => ({
  getOpinjam: () => dispatch(getOpinjam()),
  getPinjaman: mobile => dispatch(getPinjaman(mobile)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(MainFresh2);
