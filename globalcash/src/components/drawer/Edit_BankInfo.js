/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, List, ListItem, Picker} from 'native-base';
import {CustomHeader} from '../CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {JatuhKebawah, Btn, Btn_Blue} from '../../screens/commons/';
import {getNasabah, setLoading} from '../../redux/action/NasabahAction';
import {connect} from 'react-redux';
import axios from 'axios';
// import BankInfo from './BankInfo';

export class Edit_BankInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      jwt: null,
      id_bank: null,
      nm_cust: '',
      norek_cust: '',
      tlp_cust: '',
      F_Clear: 'true',
      choosenIndex: 0,

    }
    // this.loadJWT = BankInfo.loadJWT.bind(this);
    // this.loadJWT();
  }

//   this.handlerChangeValue = this.handlerChangeValue.bind(this);

 async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      console.log(value);
      if (value !== null) {
        this.setState({jwt: value});
        axios({
          method: 'Get',
          url: `http://103.121.149.77:63003/nasabah/${this.state.jwt}`,
        })
        .then(res => {
          const Edit_sBankInfo = res.data;

            this.setState({Edit_sBankInfo});
            this.setState({Edit_errBankInfo: res.status});

            if (this.state.Edit_errBankInfo === 200) {
              // console.log('edit bener:' + this.state.Edit_errBankInfo);
              // console.log(res.data.nasabah.nama_rekening);
              // console.log(Edit_sBankInfo);
              this.setState({nm_cust: res.data.nasabah.nama_rekening});
              this.setState({norek_cust: res.data.nasabah.no_rekening});
              this.setState({tlp_cust: res.data.nasabah.mobile});
              // console.log('id bank :' + res.data.nasabah.id_bank);
              this.setState({id_bank: res.data.nasabah.id_bank});
              
            }
        })
        .catch(err => {
          this.setState({Edit_errBankInfo: err.response.status});
        });

      }      
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }

  modRekBank() {
    axios({
      method: 'put',
      url: `http://103.121.149.77:63003/rekeningUpdate/${this.state.jwt}`,
      headers: {},
      data: {
        no_rekening: this.state.norek_cust,
        id_bank: this.state.id_bank,
      },
    })
      .then(res => {
        alert(res.data.message);
        console.log(res.data.data.no_rekening);
      })
      .catch(err => {
        //handle error
        console.log(err);
      });
    // alert(this.state.norek_cust);
    this.props.navigation.navigate('BankInfo');
  }

  componentDidMount() {
    const {getNasabah} = this.props;

    const MyTimer2 = setTimeout(() => {
      this.loadJWT();
    }, 100);
  }

  clearTxt = ()=> {
    if(this.state.F_Clear == true) {
      this.setState({F_Clear: false});
    }else{
      this.setState({F_Clear: true});
    }
  }

 updtNoRek = (latestRek) => {
   this.setState({norek_cust: latestRek});
 }

  generateOTP() {
    this.setState({disableOTP: true});
    let OTP = Math.floor(1000 + Math.random() * 9000);
    this.setState({otpGenerate: OTP});
    // this.setState({Countdown: 60});
    // setInterval(() => this.startTimer(60), 1000);
    this.setState({disableMobile: true});
    alert(
      `Kode OTP sudah dikirim ke ${
        this.state.mobile
      }, jangan berikan kode ke orang lain. ${OTP}`,
    );
    axios.get(
      `http://103.121.149.77/index.php?app=ws&u=fadli&h=98b5123f9036db51c6e601e9daeb949d&op=pv&to=${
        this.state.mobile
      }&msg=${OTP}, jangan berikan kode ini ke orang lain`,
    );
    //send SMS
  }

  render() {
    // const{nasabah} = this.props;
    // this.props.getNasabah(this.state.jwt);
    // console.log(this.props.nasabah.id_bank);
    return (
      <View style={{flex: 1, width: 400}}>

        <CustomHeader
          title="Modify Bank Information"
          navigation={this.props.navigation}
        />

        <View>
         <Text style={styles.Title}> Bank account information </Text>
        </View>
        <List>
        <ListItem>
        <View style={styles.OptionsPeriod}>
            <View style={{left: 2}}>
                <Text style={styles.labelSub} >Nama</Text>
            </View>
            
            <View style={{left: 170}}>
                <Text style={{color: '#ced0d1'}}>{this.state.nm_cust}</Text>
            </View>
            
        </View>
        </ListItem>

        <ListItem>
        <View style={styles.OptionsPeriod}>
           <View style={{right: 5, left: 2}}>
                <Text style={styles.labelSub}>Nama Bank</Text>
            </View>
                <View style={{height: 30, right: 75, marginTop: 25}}>
                    {/* <Text>BCA</Text> */}
                    {/* <Picker
                      selectedValue={this.state.id_bank}
                      style={{height: 50, width: 350}}
                      // {this.setState({id_Bank: '009'})}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({id_bank: itemIndex})
                      }
                      >
                      <Picker.Item label="BCA" value="014" />
                      <Picker.Item label="MANDIRI" value="008" />
                      <Picker.Item label="BNI" value="009" />
                      <Picker.Item label="BRI" value="002" />
                      <Picker.Item label="PERMATA" value="013" />
                    </Picker> */}
                    <Picker
                      
                      selectedValue={this.state.id_bank}
                      style={{height: 50, width: 350}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({id_bank: itemValue, choosenIndex: itemIndex})
                      }>
                      <Picker.Item label="BCA" value="014" />
                      <Picker.Item label="MANDIRI" value="008" />
                      <Picker.Item label="BNI" value="009" />
                      <Picker.Item label="BRI" value="002" />
                      <Picker.Item label="PERMATA" value="013" />
                    </Picker>
                    {/* <Text>{this.state.id_bank}</Text> */}
                </View>
            
            
        </View>
        </ListItem>

        <ListItem>
      <View style={styles.OptionsPeriod}>
          <View style={{left: 2, height: 45}}>
              <Text style={styles.labelSub} >Nomor Rekening</Text>
              <View style={{right: 5, marginTop: 10}}>
                <TouchableOpacity>
                  {/* <TextInput onChangeText={this.updtNoRek}>
                    {this.state.norek_cust}
                  </TextInput> */}
                   <TextInput keyboardType="number-pad" onChangeText={this.updtNoRek}>
                  {this.state.norek_cust}
                  </TextInput>
                </TouchableOpacity>
              </View>
          </View>
            
        </View>
        </ListItem>

        <ListItem>
        <View style={styles.OptionsPeriod}>
            <View style={{left: 2, top: 10, height: 35}}>
                <Text style={styles.labelSub} >Nomor Telepon</Text>
                <View style={{right: 10}}>
                    <Text>
                        
                    </Text>
                </View>
            </View>
             <View style={{left: 100, top: 10}}>
                <Text style={{color: '#ced0d1'}}>{this.state.tlp_cust}</Text>
            </View>            
        </View>
        </ListItem>
        </List>
        
        <View style={styles.OptionsPeriod}>
            <View style={{left: 15, height: 75}}>
                <Text style={styles.labelSub} >* SMS kode verifikasi</Text>
                 <View style={{ marginLeft: 40, left: 180, marginTop: 15, backgroundColor: '#e8f5fd', width: 80, position: 'absolute'}}>
                    <Text style={{textAlign: 'center', color: '#4891ff', height: 25}} onPress={()=> this.generateOTP()}>
                       Send
                    </Text>
                </View>
                <View style={{left: 2}}>
                 <TextInput placeholder= "Masukan kode verifikasi" ></TextInput>
                 {/* {this.state.clearTxt ? (
                    <TouchableOpacity><Text>xx</Text></TouchableOpacity>
                 ):null} */}
                </View>
            </View>
        </View>

        <View style={{marginLeft: 15, marginTop: 2, backgroundColor: '#e7f0ff', width: 330, height: 30}}>
          <Text style={styles.labelWarnInfo}>Pastikan Nomor Rekening yang anda masukan benar </Text>
          
        </View>
        
        <View style={{width: 320, marginLeft: 20, marginTop: 15}}>
            <Btn_Blue title="Submit" onPress={ ()=> this.modRekBank() } />        
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

  OptionsPeriod: {flexDirection: 'row', marginTop: 10},
  
  LabelPeriod: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    color: '#3e3e3e',
  },

   labelSub: {
    color: '#686969',
    fontSize: 14,
    
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
// )(Edit_BankInfo);