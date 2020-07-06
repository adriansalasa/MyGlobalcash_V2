/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, List, ListItem, Picker} from 'native-base';
import {CustomHeader} from '../CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {JatuhKebawah, Btn} from '../../screens/commons/';
import {getNasabah, setLoading} from '../../redux/action/NasabahAction';
import {connect} from 'react-redux';
import axios from 'axios';
import Moment from 'moment';

export class His_Pinjam extends Component {
  constructor(props){
    super(props);

    this.state = {
      jwt: null,
      dt_Hist: '',     
      loopDt: [],
      loopDt2: [],
      hisDt: [],
    }
    this.loadJWT = this.loadJWT.bind(this);
    this.loadJWT();
  }

 async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');

      if (value !== null) {
          
        this.setState({jwt: value});
        axios({
          method: 'Get',
          url: `http://103.121.149.77:63003/pinjamhis/${this.state.jwt}`,
        })
        .then(res => {
          const sHisPinjm = res.data.datas;
    
            this.setState({stat_sHisPinjm: res.status});
            this.setState({hisDt: res.data.datas});
            // this.setState({dt_Hist: res.datas.jmlPinjam})

            if (this.state.stat_sHisPinjm === 200) {
              console.log('stats bener:' + this.state.stat_sHisPinjm);
              // console.log(res.data.nasabah.nama_rekening);
            //   console.log(sHisPinjm);

              {sHisPinjm.map((value, index) => {
                    // console.log(value, index);
                    // console.log(value['jmlPinjam']);
                    this.setState({loopDt: value['jmlPinjam']});
                    // console.log(index);
                    // <ListItem key={index}>{value}</ListItem>
                    // <ul>{listItems}</ul>
                })}

              
            //   console.log(sHisPinjm[0].jmlPinjam);
            //   console.log(sHisPinjm[1].jmlPinjam);
            //   console.log(this.state.dt_Hist);
              
            //   this.setState({nm_cust: res.data.nasabah.nama_rekening});
            //   this.setState({norek_cust: res.data.nasabah.no_rekening});
            //   this.setState({tlp_cust: res.data.nasabah.mobile});
              
            }
        })
        .catch(err => {
          this.setState({stat_sHisPinjm: err.response.status});
        });

      }      
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }


  render() {
    return (
      
      <View style={{flex: 1, width: 400}}>

        <CustomHeader
          title="Riwayat Pinjaman"
          navigation={this.props.navigation}
        />
        
          <View >
              {this.state.hisDt.map((item, value) => {
                  // console.log(item['jmlPinjam']);
                  // console.log(item['tglJatuhTempo']);
                  // console.log(item);
                  // this.setState({loopDt2: value['jmlPinjam']});
                  return(
                  <View style={{left: 2}}>
                  <List>
                  <ListItem >
                      <Text style={styles.labelSub} >{item['jmlPinjam']} </Text>
                      {/* <Text style={styles.labelSubRight} >{Moment(Date(item['pinjaman_dt'])).format('DD/MM/YYYY')} </Text> */}
                      <Text style={styles.labelSubRight} >{item['pinjaman_dt'].substring(8,10) + '/' + item['pinjaman_dt'].substring(5,7) + '/' + item['pinjaman_dt'].substring(0,4)} </Text>

                      {/* let sTglPinjam = this.props.pinjaman.tglPinjam;
      let sTglPinjam_yr = sTglPinjam.substring(0,4);
      let sTglPinjam_mm = sTglPinjam.substring(5,7);
      let sTglPinjam_dd = sTglPinjam.substring(8,10);
      let sTglPinjam_hh = sTglPinjam.substring(11,13);
      let sTglPinjam_mmm = sTglPinjam.substring(14,16);
      let sTglPinjam_ss = sTglPinjam.substring(17,19);
      // alert('tgl :'+ sTglPinjam_yr + '-' + sTglPinjam_mm + '-' + sTglPinjam_dd + ' ' + sTglPinjam_hh + ':' + sTglPinjam_mmm + ':' + sTglPinjam_ss);
      // const{sTglPinjam_New} = this.props;
      N_tglPinjam = sTglPinjam_yr + '-' + sTglPinjam_mm + '-' + sTglPinjam_dd + ' ' + sTglPinjam_hh + ':' + sTglPinjam_mmm + ':' + sTglPinjam_ss; */}
                      {/* var newDate = moment(Date(yourDate)).format('DD-MM-YYYY'); */}
                  </ListItem>
                  </List>
                  </View>)
                })}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rndSquare: {
    backgroundColor: '#aeb0b1',
    borderRadius: 10,
    height: 120,
    width: 320,
    padding: 10,
    marginTop: 30,
    marginLeft: 20,
  },

  OptionsBaris: {flexDirection: 'row', marginTop: 20},

  OptionsPeriod: {flexDirection: 'row', marginTop: 15},
  
  LabelPeriod: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    color: '#3e3e3e',
  },

   labelSub: {
    color: '#686969', 
  },

   labelSubRight: {
    color: '#686969', 
    left: 170, 
  },
  
  Title:{
      marginTop: 20,
      marginLeft: 80,
      color: "#99ccff",
  },
  Label: {
    marginTop: 3,
    left: 6,
  },

  labelTextRight: {
    left: 220,
  },

  labelTextRightBottom: {
    left: 220,
  },

  labelWarnInfo: {
    fontSize: 12,
    color: '#a4b4cd',
    marginLeft: 5,
    marginTop: 5,
  },
  
});

// const mapStoreToProps = state => ({
//   nasabah: state.nasabah.nasabah,
// });
// const mapDispatchToProps = dispatch => ({
//   getNasabah: mobile => dispatch(getNasabah(mobile)),
// });

// export default connect(
//   mapStoreToProps,
//   mapDispatchToProps,
// )(His_Pinjam);