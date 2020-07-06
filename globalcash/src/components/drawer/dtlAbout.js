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

export class dtlAbout extends Component {
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
      tmpSrn: '',
      id_About: 1,
      errCodeAbout: null,
    }
    
      
    // this.loadJWT = this.loadJWT.bind(this);
    // this.loadJWT();
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();

  }

  componentDidMount() {
    const MyTimer = setTimeout(() => {
      this.tesla();
    }, 100);
  }

  tesla() {
    axios({
      method: 'Get',
      url: `http://103.121.149.77:63003/about/${this.state.id_About}`,
    })
      .then(res => {
        const tmpSrn = res.data.datas;
        // this.setState({tmpSrn});
        console.log(tmpSrn);
        this.setState({isiSaran: tmpSrn.Caption})
        
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
            title="Tentang Perusahaan"
            navigation={this.props.navigation}
            />
            
            <List>
                <ListItem>
                    <View style={styles.OptionsPeriod}>
                        <View style={{left: 2, marginBottom: 15}}>
                            <Text style={styles.headSub}>Sejarah Perusahaan</Text> 
                        </View>
                         <View style={{marginTop: 40, marginBottom: 20, right: 50}}>
                            {/* <Text style={styles.labelSub}>Tipe Saran</Text>  */}
                            <Image source={IMAGE.ICON_LOGO} />
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
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text> 
       */}
       {/* {this.tesla()} */}
       <Text>{this.state.isiSaran}</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
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
