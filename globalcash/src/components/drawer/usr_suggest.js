/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {Text, List, ListItem, Picker, DatePicker} from 'native-base';
import {CustomHeader} from '../CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {JatuhKebawah, Btn, Btn_Blue} from '../../screens/commons/';
import {getNasabah, setLoading} from '../../redux/action/NasabahAction';
import {connect} from 'react-redux';
import axios from 'axios';
import Moment from 'moment';
import deviceStorage from '../../services/deviceStorage.js';

export class usr_suggest extends Component {
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
    }
    
      
    // this.loadJWT = this.loadJWT.bind(this);
    // this.loadJWT();
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  saveWord = (yourword) => {
    this.setState({isiSaran: yourword});
  };

  saveMail = (yourMail) => {
    this.setState({email: yourMail});
  };

  postFeedback() {
    // alert(this.state.jwt);
    // alert(this.state.id_bank);
    // alert('hai' + this.state.occurDt);
    axios({
      method: 'post',
      url: `http://103.121.149.77:63003/ufeed/${this.state.jwt}`,
      headers: {},
      data: {
        tipe_saran: this.state.id_bank,
        tgl: this.state.occurDt,
        isiSaran: this.state.isiSaran,
        email: this.state.email,
      },
    })
      .then(res => {
        // this.props.saveMobile(this.state.newTlp);
        alert(res.data.message);

        // this.loadJWT();
      })
      .catch(err => {
        //handle error
        console.log(err);
      });
    this.delIsiSaran.clear();
    this.delEmail.clear();
    // this.delPicker.clear();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: ['#eee8e7']}}>
      {/* <ScrollView> */}
        <View style={{backgroundColor: 'white'}}>

            <CustomHeader
            title="Saran Pengguna"
            navigation={this.props.navigation}
            />
            
            <List>
                <ListItem>
                    <View style={styles.OptionsPeriod}>
                        <View style={{left: 2}}>
                            <Text style={styles.labelSub}>Tipe Saran</Text> 
                        </View>
                        <View style={{right: 65, marginTop: 20}}>
                            {/* <TextInput placeholder = "Masukan kata sandi lama anda" style={{fontSize: 15}}></TextInput> */}
                             <Picker
                                    // placeholder="pilih yuk"
                                    selectedValue={this.state.id_bank}
                                    style={{height: 50, width: 350}}
                                    // onValueChange={(itemValue, itemIndex) =>
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({id_bank: itemValue})
                                    }>
                                {/* <Picker.Item label="Pilih Kriteria" value="0" />
                                <Picker.Item label="Saran peningkatan layanan" value="014" />
                                <Picker.Item label="Masalah Pembayaran" value="008" />
                                <Picker.Item label="Masalah lainnya" value="009" /> */}
                                <Picker.Item label="Pilih Kriteria" value="0" />
                                <Picker.Item label="Saran peningkatan layanan" value="Saran peningkatan layanan" />
                                <Picker.Item label="Masalah Pembayaran" value="Masalah Pembayaran" />
                                <Picker.Item label="Masalah lainnya" value="Masalah lainnya" />
                            </Picker>
                        </View>
                    </View>
                </ListItem>

                <ListItem>
                    <View style={styles.OptionsPeriod}>
                        <View style={{left: 2}}>
                            <Text style={styles.labelSub}>Pilih Tanggal</Text> 
                        </View>
                        {/* <View style={{right: 80, marginTop: 20}}>
                            <TextInput placeholder = "Masukan kata sandi lama anda" style={{fontSize: 15}}></TextInput>
                        </View> */}
                        <View style={{flex: 1, marginBottom: 10, right: 150, top: 18, width: 300}}>
                            <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date(1970, 1, 1)}
                                maximumDate={new Date()}
                                locale={'en'}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={'fade'}
                                androidMode={'default'}
                                placeHolderText="Select date"
                                textStyle={{color: 'black'}}
                                placeHolderTextStyle={{color: '#d3d3d3'}}
                                //  onChangeText={(date) => this.setState({defaultDate})}
                                onDateChange={(defaultDate) => {this.setState({occurDt: Moment(defaultDate).format('DD-MM-YYYY HH:MM:SS')})}}
                                disabled={false}
                            />
                        </View>
                    </View>
                </ListItem>

                <ListItem>
                    {/* <View style={styles.OptionsPeriod}>
                        <View style={{left: 2, height: 200}}>
                            <TextInput placeholder = "Saran dari anda sangat berarti bagi kami untuk menciptakan layanan yang lebih baik lagi" 
                            style={styles.msgInput}
                            multiline = {true}
                            numberOfLines = {6}
                            maxLength={300}
                            msgCount = {this.state.msgCount}
                            onChangeText={(msgCount) => this.setState({msgCount})}
                            >
                           
                            </TextInput>
                        </View>
                    </View> */}
                    <View style={{marginBottom: 120}}>        
                        <TextInput
                            
                            multiline = {true}
                            numberOfLines = {1}
                            
                            maxLength = {300}
                            placeholder='Saran dari anda sangat berarti bagi kami untuk menciptakan layanan yang lebih baik lagi'
                            msgCount={this.state.msgCount}
                            onChangeText={(msgCount) => this.setState({msgCount}), this.saveWord}
                            ref = {input => {this.delIsiSaran = input}}
                            />
                        {/* <View style={{borderWidth:1, borderColor: 'black'}}> */}
                        <Text style={styles.borderCount}>
                            {this.state.msgCount.length}/300
                        </Text>
                        {/* </View> */}
                    </View>
                </ListItem>

            </List>
        </View>
        
            <View style={{marginTop: 10}} />
            <View style={{backgroundColor: 'white', height: 80}}>
                <List>

                    <ListItem>
                        <View style={styles.OptionsPeriod}>
                            <View style={{left: 2}}>
                                <Text style={styles.labelSub}>Contact Info(Optional)</Text> 
                            </View>
                            <View style={{right: 140, marginTop: 20}} >
                                <TextInput placeholder = "Email/Facebook/Whatsapp" style={{fontSize: 15}} onChangeText={this.saveMail} ref = {input => {this.delEmail = input}}>
                                </TextInput>
                            </View>
                        </View>
                    </ListItem>
                </List>            
            </View>    
        {/* </ScrollView> */}

        <View style={{width: 330, marginLeft: 20, marginBottom: 235}}>
        <Btn_Blue title="Submit" onPress={() => this.postFeedback()} />
        
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
