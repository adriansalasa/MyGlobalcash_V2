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

export class mnAbout extends Component {
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

  isiDetail() {
    this.props.navigation.navigate('dtlAbout');
    //alert('tesssss');
    
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: ['#eee8e7']}}>
      {/* <ScrollView> */}
        <View style={{backgroundColor: 'white'}}>

            <CustomHeader
            title="Tentang Kami"
            navigation={this.props.navigation}
            />
            
            <List>
                
                    <View style={styles.OptionsPeriod}>
                        <View style={{ marginLeft: 120, marginTop: 20}}>
                            {/* <Text style={styles.labelSub}>Tipe Saran</Text>  */}
                            <Image source={IMAGE.ICON_LOGO} />
                        </View>
                        <View style={{right: 120, marginTop: 140, marginBottom: 30}}>
                            <Text>Globalmulticash V1.0.9 </Text>
                        </View>
                    </View>
                <ListItem>
                </ListItem>
            </List>

            <List>
                <ListItem>
                    <View style={styles.OptionsPeriod}>
                        <View style={{left: 2, marginBottom: 15}}>
                            <Text style={styles.labelSub}>Contact Us</Text> 
                        </View>
                        <View style={{right: -170}}>
                            <Text style={styles.labelBlue}>(021)82408568</Text>
                        </View>
                        {/* <View style={{flex: 1, marginBottom: 10, right: 150, top: 18, width: 300}}>
                            
                        </View> */}
                    </View>
                </ListItem>
            </List>
        </View>
        
            <View style={{marginTop: 10}} />
            <View style={{backgroundColor: 'white', height: 40}}>
                <List>
                    {/* <ListItem onPress={() => this.isiDetail()}> */}
                        <View style={styles.OptionsPeriod}>
                            <View style={{left: 20, marginTop: 5}}>
                                <Text style={styles.labelSub} onPress={() => this.isiDetail()}>Data Publication                                                               ></Text> 
                            </View>
                              {/* <View style={{left: 230, marginTop: 5}}>
                                <Text style={styles.labelSub}> > </Text> 
                            </View> */}
                        </View>
                    {/* </ListItem> */}
                </List>            
            </View>    
            <View style={{marginTop: 10}} />
            <View style={{backgroundColor: 'white', height: 260}}>
               

                        <View style={styles.OptionsPeriod}>
                            <View style={{left: 30, marginTop: 30}}>
                                <Image source={IMAGE.logoInsta} /> 
                            </View>
                             <View style={{left: 70, marginTop: 30}}>
                                <Image source={IMAGE.logoFB} /> 
                            </View>

                             <View style={{left: 110, marginTop: 25}}>
                                <Image source={IMAGE.logoTwitter} /> 
                            </View>

                            <View style={{left: 150, marginTop: 25}}>
                                <Image source={IMAGE.logoYoutube} /> 
                            </View>
                        </View>

                        <View style={{left: 22, top: 15}}>
                            <Text style={styles.labelSub}>Instagram</Text>
                        </View>

                        <View style={{left: 100, top: -4}}>
                            <Text style={styles.labelSub}>Facebook</Text>
                        </View>

                        <View style={{left: 195, top: -23}}>
                            <Text style={styles.labelSub}>Twitter</Text>
                        </View>

                        <View style={{left: 280, top: -42}}>
                            <Text style={styles.labelSub}>Youtube</Text>
                        </View>
                
                          
            </View>
        {/* </ScrollView> */}

        <View style={{width: 330, marginLeft: 20, marginBottom: 235}}>
        {/* <Btn_Blue title="Submit" onPress={() => this.postFeedback()} /> */}
        
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
