/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native';
import {Text, List, ListItem, Picker, DatePicker} from 'native-base';
import {CustomHeader} from '../CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {JatuhKebawah, Btn, Btn_Blue} from '../../screens/commons/';
import {getNasabah, setLoading} from '../../redux/action/NasabahAction';
import {connect} from 'react-redux';
import axios from 'axios';
import Moment from 'moment';
import deviceStorage from '../../services/deviceStorage.js';
import {IMAGE} from '../../constants/Image';

export class PPen extends Component {
  constructor(props){
    super(props);

    this.state = {
      jwt: null,
      msgCount: 0,
      occurDt: '',
      NewDt: '',
      tipe_saran: '',
      tgl: '',
      isiSaran: '',
      email: '',
      id_bank: '',
      id_pend: 1,
      tmp_pend: '',
      isiPer: '',
    }
    
      
    // this.loadJWT = this.loadJWT.bind(this);
    // this.loadJWT();
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  componentDidMount() {
    const MyTimer = setTimeout(() => {
      this.showPendaftaran();
    }, 100);
  }

  showPendaftaran() {
    axios({
      method: 'Get',
      url: `http://103.121.149.77:63003/penduser/${this.state.id_pend}`,
    })
      .then(res => {
        const tmp_pend = res.data.datas;
        // this.setState({tmpSrn});
        console.log(tmp_pend);
        this.setState({isiPer: tmp_pend.Caption})
        
      })
      .catch(err => {
        this.setState({errCodeAbout: err.response.status});
      });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: ['#eee8e7']}}>
      {/* <ScrollView> */}
        <View style={{backgroundColor: 'white'}}>

            <CustomHeader
            title="Perjanjian Pendaftaran Pengguna"
            navigation={this.props.navigation}
            />
            
            <List>
                <ListItem>
                    <View style={styles.OptionsPeriod}>
                        <View style={{left: 2, marginBottom: 15}}>
                            <Text style={styles.headSub}>Perjanjian Pendaftaran</Text> 
                        </View>
                    </View>
                </ListItem>

                 <ListItem>
                    {/* <View style={styles.OptionsPeriod}> */}
                        <View style={{left: 2, marginBottom: 15}}>
                            {/* <Text style={styles.labelSub}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>  */}
      <Text>{this.state.isiPer}</Text>
                        </View>
                    {/* </View> */}
                </ListItem>
            </List>

        </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  OptionsPeriod: {flexDirection: 'row', marginTop: 5, marginBottom: -15},
  
   labelPlaceHolder: {
    right: 85,
    marginTop: 20, 
  },

   labelSub: {
    color: '#686969', 
    fontSize: 14,
  },

  headSub: {
    color: 'black', 
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 70,
  },

  labelPublication: {
    color: '#686969', 
    fontSize: 14,
  },

   labelBlue: {
    color: '#4891ff', 
    fontSize: 14,
  },

  borderCount: {
      borderWidth: 1, 
      borderColor: '#cccccc',
      borderRadius: 15,
      backgroundColor: '#f4f4f4',
      color: '#707070',
    //   padding: 4,
     paddingHorizontal: 8,
      top: 120,
      left: 130,
  },
  
});
