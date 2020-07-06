/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SnapSlider from 'react-native-snap-slider';
import ModalDropdown from 'react-native-modal-dropdown';
import {Btn} from '../commons/';
import {getOpinjam} from '../../redux/action/OpsiAction';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import Moment from 'moment';

class MainFresh extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: '',
      loading: true,
      defaultItem: '500000',
      sliderOptions: [
        {id: 0, label: '500000'},
        {id: 1, label: '600000'},
        {id: 2, label: '700000'},
        {id: 4, label: '800000'},
        {id: 5, label: '900000'},
        {id: 6, label: '1000000'},
      ],
      dropdown_4_options: null,
      dropdown_4_defaultValue: 'loading...',
      dropdown_6_icon_heart: true,
      selectItem: '',
      OpsiTglBayar: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
      ],
      datesCollection: [],
    };

    this.slidingComplete = this.slidingComplete.bind(this);
    // const { startDate } = this.props.pageData.parcelDetails.parcelDetails;
    // const date = new Date(2020,7,1);
    // console.log('mydate :' + date);
    const today = new Date();
    //const date2=today.getDate() + "/"+ parseInt(today.getMonth()+2) +"/"+ today.getFullYear();
    // console.log(date2);
    const lastDate= new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastDateNew = Moment(lastDate).format("DD");
    //console.log('lastDateNew : ' + lastDateNew);
    const date = new Date(today.getFullYear(),parseInt(today.getMonth()+1),1);
    const nowM = Moment();
    // let datesCollection = []
      for (var i = 0; i < lastDateNew; i++) {
      const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);      
      // console.log('newDate' + newDate);
      // this.state.datesCollection.push(`${newDate.getDate()}`);
      this.state.datesCollection.push(`${Moment(newDate).add(1, 'month').format("DD")}`);
    }
  }

  // addDays = () => {
  //   const { startDate } = this.props.pageData.parcelDetails.parcelDetails;
  //   const date = new Date(startDate);
  //   let datesCollection = []
  
  //   for (var i = 1; i < 12; i++) {
  //     const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
  //     datesCollection.push(`${newDate.getDate()}`);
  //   }
  //   return datesCollection
  // }

  componentDidMount() {
    const {getRegisterbyMobile, nasabah, redMobile} = this.props;
    this.props.getOpinjam(redMobile);
    // let newDate = new Date();
    // const sHisBayar = [1, 2];

    // function daysInMonth (month, year) { 
    //   return new Date(year, month, 0).getDate(); 
    // }
    // let lastDay = new Date(
    //   newDate.getFullYear(),
    //   newDate.getMonth(),
    //   daysInMonth(newDate.getMonth() + 1, newDate.getFullYear()),
    // );
    // let newLastDay = lastDay.getDate();
    // console.log('lastDay' + newLastDay);
    // for (let a = 0; a < 10; a++) {
      
    //   console.log('test:'+a);
    // }

  }

  slidingComplete(itemSelected) {
    // console.log(this.state.sliderOptions[itemSelected].label);
    this.setState({defaultItem: this.state.sliderOptions[itemSelected].label});
    this.props.handlerChangeValue(
      'besarPinjam',
      this.state.sliderOptions[itemSelected].label,
    );
  }

  tujuanPinjamSelect(idx, value) {
    this.props.handlerChangeValue('tujuanPinjam', value);
  }

  tanggalBayarSelect(idx, value) {
    this.props.handlerChangeValue('tanggalPinjam', value);
  }

  render() {
    const {defaultItem, OpsiPinjam, OpsiTglBayar} = this.state;

    return (
      <>
        <Text>Nilai Pinjaman</Text>
        <Text style={styles.Currency}>
          <NumberFormat
            value={this.state.defaultItem}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp '}
            renderText={value => <Text>{value}</Text>}
          />
        </Text>
        <SnapSlider
          ref="slider"
          containerStyle={styles.snapsliderContainer}
          style={styles.snapslider}
          itemWrapperStyle={styles.snapsliderItemWrapper}
          itemStyle={styles.snapsliderItem}
          items={this.state.sliderOptions}
          labelPosition="off"
          defaultItem="0"
          onSlidingComplete={this.slidingComplete}
        />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            paddingBottom: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.labelText}>Rp, 500.000</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={styles.labelText}>Rp, 1.000.000</Text>
          </View>
        </View>

        <View style={styles.OptionsPinjam}>
          <View style={styles.Label}>
            <Text style={styles.labelText}>Tujuan Pinjam</Text>
          </View>
          <Text style={styles.labelText}>:</Text>
          <View>
            <ModalDropdown
              style={styles.dropdownStyle}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              options={
                this.props.opinjam &&
                this.props.opinjam.map((i, index) => i.title)
              }
              onSelect={(idx, value) => this.tujuanPinjamSelect(idx, value)}
            />
          </View>
        </View>
        <View style={styles.OptionsPinjam}>
          <View style={styles.Label}>
            <Text style={styles.labelText}>Tanggal Pembayaran</Text>
          </View>
          <Text style={styles.labelText}>:</Text>
          <View>
            <ModalDropdown
              style={styles.dropdownStyle}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              options={this.state.datesCollection}
              onSelect={(idx, value) => this.tanggalBayarSelect(idx, value)}
            />
          </View>
        </View>
        <View style={styles.OptionsPinjam}>
          <View style={styles.Label}>
            <Text style={styles.labelText}>Simulasi Bayar</Text>
          </View>
          <Text style={styles.labelText}>:</Text>
          <View style={{width: 160, alignItems: 'flex-end', paddingRight: 20}}>
            <NumberFormat
              value={this.state.defaultItem}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp '}
              renderText={value => <Text>{value}</Text>}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  warnaBG: {
    backgroundColor: 'white',
  },
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
  redMobile: state.register.redMobile,
  loading: state.opsi.loading,
  opinjam: state.opsi.opinjam,
});
const mapDispatchToProps = dispatch => ({
  getOpinjam: () => dispatch(getOpinjam()),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(MainFresh);
