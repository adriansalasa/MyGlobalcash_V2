/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {CustomHeader} from '../CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {getNasabah, setLoading} from '../../redux/action/NasabahAction';
import {connect} from 'react-redux';
import axios from 'axios';

export class BankInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      jwt: null,
      id_bank: null,
      errBankInfo: null,
      no_rek: '',
      nm_bank: '',
    }
    
    this.loadJWT = this.loadJWT.bind(this);
    this.loadJWT();

    // this.handlerChangeValue = this.handlerChangeValue.bind(this);
  }

  // handlerChangeValue(stateName, stateValue) {
  //   this.setState({
  //     [stateName]: stateValue,
  //   });
  // }  
  
  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      console.log(value);
      if (value !== null) {
        this.setState({jwt: value});
        // this.props.getNasabah(this.state.jwt);
        axios({
          method: 'Get',
          url: `http://103.121.149.77:63003/nasabah/${this.state.jwt}`,
        })
        .then(res => {
          const sBankInfo = res.data;

            this.setState({sBankInfo});
            this.setState({errBankInfo: res.status});

            if (this.state.errBankInfo === 200) {
              console.log('bener:' + this.state.errBankInfo);
              // console.log(res.data.nasabah.nama_rekening);
              console.log(sBankInfo);
              this.setState({no_rek: res.data.nasabah.nama_rekening});
              this.setState({id_bank: res.data.nasabah.id_bank});
              // console.log('id bank :' + this.state.id_bank);
              //===================================================================================
                  axios({
                      method: 'Get',
                      url: `http://103.121.149.77:63003/virtualaccount/${this.state.id_bank}`,
                    })
                    .then(res => {
                      const sBankID = res.data;

                        this.setState({sBankID});
                        this.setState({errBankID: res.status});

                        if (this.state.errBankID === 200) {
                          console.log('bener:' + this.state.errBankID);
                          // console.log(res.data.nasabah.nama_rekening);
                          console.log(sBankID);
                          // console.log('id bank :' + this.state.id_bank);
                          this.setState({nm_bank: sBankID.datas.name});
                          
                        }
                    })
                    .catch(err => {
                      this.setState({errBankID: err.response.status});
                    });
              //===================================================================================
            }
        })
        .catch(err => {
          this.setState({errBankInfo: err.response.status});
        });

        // if(this.state.id_bank !== ''){
          //  console.log('id bank 2:' + sBankInfo.nasabah.nama_rekening);
        //}
        
      }      
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }

  componentDidMount() {
    const {getNasabah} = this.props;
    // this.loadJWT();
    const MyTimer2 = setInterval(() => {
      this.loadJWT();
    }, 1000);
  }

  ModifBank(){
    // alert('tessss');
    this.props.navigation.navigate('Edit_BankInfo');
  }

  render() {
    // const{nasabah} = this.props;
    // this.props.getNasabah(this.state.jwt);
    // console.log(this.props.nasabah.id_bank);
    return (
      <View style={{flex: 1, width: 400}}>
        <CustomHeader
          title="Add bank account"
          navigation={this.props.navigation}
        />
        {/* <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#dbdcdc',
          }} /> */}

        <View style={styles.rndSquare}>
          <View style={styles.labelTextRight}>
            <Text style={{color: 'white'}}>Default</Text>
          </View>
          <View style={styles.Label}>
            <Text style={{color: 'white'}}>{this.state.nm_bank}</Text>
            <Text style={{color: 'white', marginTop: 5, fontSize: 20}}>
              {this.state.no_rek}
            </Text>
          </View>
          <View style={styles.labelTextRightBottom} onPress={()=> this.ModifBank()}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}} onPress={()=> this.ModifBank()}>
              Modify >
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rndSquare: {
    backgroundColor: '#888888',
    borderRadius: 10,
    height: 120,
    width: 320,
    padding: 10,
    marginTop: 30,
    marginLeft: 20,
  },

  OptionsBaris: {flexDirection: 'row', marginTop: 20},

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
});

const mapStoreToProps = state => ({
  nasabah: state.nasabah.nasabah,
});
const mapDispatchToProps = dispatch => ({
  getNasabah: mobile => dispatch(getNasabah(mobile)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(BankInfo);