import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {getNasabah, setLoading} from '../redux/action/NasabahAction';
import {getPinjaman, getPinjaman2 } from '../redux/action/PinjamanAction';
// import {getVirtualAcc } from '../redux/action/VirtualAcc_Action';
import {getVirtualAccount} from '../redux/action/VirtualAction';
import {connect} from 'react-redux';

import deviceStorage from '../services/deviceStorage';
import MainFresh from './components/MainFresh';
import MainFresh2 from './components/MainFresh2';
import FrmPinjam from './components/FrmPinjam';
import FormVirtualAcc from './components/FormVirtualAcc';
import {Header, Btn} from './commons/';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: null,
      loading: true,
      besarPinjam: '500000',
      tujuanPinjam: '',
      tanggalPinjam: '',    
      statsPjm: '',
      errCode: null,
      img: require('../assets/images/userNotFound.png'),
      imgWait: require('../assets/images/userWaiting.png'),
      usrWait: require('../assets/images/manwait2.png'),
      bnkname: 'BCA',
      statVirtual: 'null',
    };

    // this.newJWT = this.newJWT.bind(this);
    this.loadJWT = this.loadJWT.bind(this);
    this.loadJWT();

    this.pjmJWT = this.pjmJWT.bind(this);
    this.pjmJWT();

    this.approveJWT = this.approveJWT.bind(this);
    this.approveJWT();

    // this.slidingComplete = this.slidingComplete.bind(this);
    this.handlerChangeValue = this.handlerChangeValue.bind(this);
  }

  handlerChangeValue(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }

  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        this.props.getNasabah(value);
        this.setState({
          jwt: value,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }

  async pjmJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        // console.log('ini valuenya' + value);
        //  alert('persiapan pjmJWT');
        this.props.getPinjaman(value);
        this.setState({
          jwt: value,
          loading: false,
        });        
        // alert('pjmJWT nich' + this.state.jwt);
      } else {
        this.setState({
          loading: false,
        });
        // alert('loadingnya' + loading);
      }
    } catch (error) {
      console.log('AsyncStorage Status pinjam 1 Error: ' + error.message);
    }
  }

  async approveJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        // console.log('ini valuenya' + value);
        // alert('persiapan approveJWT');
        this.props.getPinjaman2(value);
        this.setState({
          jwt: value,
          loading: false,
        });
        
        // alert('jwt nich' + this.state.jwt);
      } else {
        this.setState({
          loading: false,
        });
        // alert('loadingnya' + loading);
      }
    } catch (error) {
      console.log('AsyncStorage Status Pinjam 2 Error: ' + error.message);
    }
  }

  componentDidMount() {
    // console.log(deviceStorage.loadJWT());
    // this.props.setLoading(true);
    // this.props.getNasabah('0812832234');
    const {getNasabah, redMobile, getPinjaman, getPinjaman2, getVirtualAccount} = this.props;     
    // this.props.getVirtualAccount('BCA');
      //  this.props.getVirtualAcc('BCA');
    // this.props.getPinjaman(this.props.mobileNum);
    //    this.timerHandle = setInterval(() => {
    //   // ***
    //   this.props.getNasabah(this.state.jwt);
    // }, 3000);
      
      const stsCek = setInterval(() => {this.cekStatus()}, 2000);
    // // // this.intervalID = setInterval(this.getNasabah.bind(this), 5000);        
      const MyTimer = setInterval(() => {this.pinjStatus()}, 5000);
      // setTimeout(() => {this.pinjStatus()}, 6000);
  }

  async pinjStatus(){
    
    // alert(this.state.errCode);
    // if (this.state.errCode !== null || this.state.errCode === 400){
      if (this.state.errCode === 200){
        // clearInterval(MyTimer);
        // clearInterval(stsCek);
      }else{
      const tmrPinjm = setTimeout(() => {
      axios({
              method: 'Get',
              url: `http://103.121.149.77:63003/pinjamk2/${this.state.jwt}`,           
            })
              .then(res => {
                const statsPjm = res.data;
                console.log(statsPjm); 
                // console.log(res.status);           
                this.setState({statsPjm})
                // alert(statsPjm.datas.jmlPinjam);
                errCode = res.status; 
                this.setState({errCode: res.status})   
                // this.props.getPinjaman2(this.state.jwt);  
                // alert(errCode); 
                // pinjaman.status_pinjam;
                // <Spinner visible={this.props.loadings} textContent={'Loading...'} />
                if(errCode === 200){
                    this.props.getPinjaman2(this.state.jwt);
                    clearInterval(MyTimer);
                }  
                console.log(this.state.errCode)     
              })
              // .catch(err => {
              .catch(err => {
                //handle error
                console.log(err.response.status);
                errCode = err.response.status;    
                this.setState({errCode: res.status})
                // alert(errCode);       
                console.log(this.state.errCode)  
              })
          }, 1000)
       
    // tmrPinjm(){
    //   const myInterval = setInterval(() => {
    //     if (this.state.errCode === 200) {
    //       clearInterval(myInterval);
    //     } else {
    //       // this.setState({tempo: this.state.tempo+1});
    //        axios({
    //         method: 'Get',
    //         url: `http://103.121.149.77:63003/pinjamk2/${this.state.jwt}`,           
    //       })
    //         .then(res => {
    //           const statsPjm = res.data;
    //           console.log(statsPjm);    
    //           this.setState({statsPjm})
    //           errCode = res.status; 
    //           this.setState({errCode: res.status})   
    //           console.log(this.state.errCode)     
    //         })
    //         .catch(err => {              
    //           console.log(err.response.status);
    //           errCode = err.response.status;    
    //           this.setState({errCode: res.status})              
    //           console.log(this.state.errCode)  
    //         })
    //     }
    //   }, 1000)
    // }
    
     }
  }

  async cekStatus(){    
      this.props.getNasabah(this.state.jwt);
      if(this.prop.nasabah.verified_status !== null || this.prop.nasabah.verified_status === 1){        
          let looptime = 3000;
          
            const timerHandle = setTimeout(() => {
              if(this.props.nasabah.verified_status === 1)
            {        
                {this.props.getNasabah(this.state.jwt)}
            }
              }, looptime) 
        }     
      // alert(this.props.nasabah.verified_status);   
  }

  async _Ajukan() {
    // eslint-disable-next-line no-lone-blocks
    await this.loadJWT();
    {
      !this.props.nasabah
        ? this.props.navigation.navigate('Registration')
        : this.props.nasabah.verified_status === 1
        ? alert('Menunggu Konfirmasi')
        : alert('Proses Pengajuan anda lagi diproses');
    }
  }

  apply_pinjaman() {
    // eslint-disable-next-line no-lone-blocks
    {
      !this.state.besarPinjam ||
      !this.state.tujuanPinjam ||
      !this.state.tanggalPinjam
        ? alert('Silahkan Pilih Tujuan dan Tanggal Bayar')
        : axios({
            method: 'post',
            // url: `http://192.168.5.27:63003/pinjam/${this.state.jwt}`,
            url: `http://103.121.149.77:63003/pinjam/${this.state.jwt}`,
            headers: {},
            data: {
              jmlPinjam: this.state.besarPinjam,
              tujuanPinjam: this.state.tujuanPinjam,
              tglBayar: this.state.tanggalPinjam,
              status_pinjam: '1',
            },
          })
            .then(res => {
              // this.props.getNasabah(this.state.jwt);
              // alert(res.data.message);
              // console.log(res);

              this.props.getPinjaman(this.state.jwt);
              alert(res.data.message);
              console.log(res);
            })
            .catch(err => {
              //handle error
              console.log(err);
            });
    }
  }

  lengkapi() {
    this.props.navigation.navigate('Registration');
  }

kirimVA(){
    
    // this.props.getVirtualAccount(this.props.nasabah.id_bank);
    // console.log(this.props.virtual.no_va);
    // alert(this.props.nasabah.id_bank);
    // const {virtual} = this.props;
    // if(this.props.nasabah.id_bank !== null){
    // // const {statVirtual, virtual} = this.props;
    
    // }
   
  //   alert('bank' + nasabah.id_bank);
  // alert(this.props.nasabah.id_bank);
   axios({
              method: 'Get',
              // url: `http://103.121.149.77:63003/virtualaccount/${this.state.bnkname}`, 
              url: `http://103.121.149.77:63003/virtualaccount/${this.props.nasabah.id_bank}`,           
            })
              .then(res => {
                const statVirtual = res.data.datas;
                //  console.log(statVirtual.no_va);
                // console.log(res.status); 
            
                this.setState({statVirtual: statVirtual.no_va})
                //  console.log('statVirtual : ' + statVirtual.no_va); 
            
                this.setState({errCode: res.status})   
                // console.log(this.state.errCode)     
              })
           
              .catch(err => {  //handle error
                // console.log(err.response.status);
                console.log(err);
                // errCode = err.response.status;    
                // this.setState({errCode: res.status})
                // console.log(this.state.errCode)  
              })                                       
  }

  render() {
    const {nasabah, pinjaman, virtual} = this.props;
    // const {statVirtual2} = this.props;   
    // console.log('render33' + virtualaccount);
    let virtualNew = this.state.statVirtual;
      // let virtualNew = this.props.virtual.no_va;
    // console.log('virtualNew' + virtualNew);

    return (
      <View>
        {/* <Spinner visible={this.props.loadings} textContent={'Loading...'} /> */}
        <Header title="Home" isHome={true} navigation={this.props.navigation} />
        <View style={styles.Container}>                       
         <>          
              {/* {!this.state.statVirtual ? (
                  // <FrmPinjam
                  //   mobileNum={this.state.jwt}
                  //   navigation={this.props.navigation}
                  // />
                  <Text>{this.state.statVirtual}</Text>
                ) : null} */}
            {!nasabah ? (
              // <Text style={styles.labelText}>
              //   Data anda tidak terdaftar di sistem kami, lengkapi data anda
              //   dengan klik tombol dibawah
              // </Text>
              <Image 
              source={this.state.img} 
              style={{width: 256, height:300}}
              />
            ) : nasabah.verified_status === 1 ? (
              <Image 
                source={this.state.imgWait} 
                style={{width: 256, height:250}}
              />
            // ) : nasabah &&
            //   nasabah.verified_status === 2 &&
            //   pinjaman &&
            //   pinjaman.status_pinjam === '1' ? (
            //   <Text style={styles.labelText}>
            //     Pengajuan pinjaman akan diproses paling lambat 1x24 jam
            //   </Text>
            ) : nasabah && nasabah.verified_status === 4 ? (
              <View>
                <Text style={styles.labelText}>Pengajuan Anda diTolak</Text>
              </View>
            ) : nasabah &&
              nasabah.verified_status === 2 &&
              pinjaman === null ? (
               
                <>
                    <MainFresh
                      handlerChangeValue={this.handlerChangeValue}
                      navigation={this.props.navigation}
                    />                   
                </>
            ) : nasabah &&
              nasabah.verified_status === 2 &&
              pinjaman &&
              pinjaman.status_pinjam === '1' ? (
              // <Text style={styles.labelText}>
              //   Pengajuan pinjaman akan diproses paling lambat 1x24 jam
              // </Text>
              <Image 
                source={this.state.usrWait} 
                style={{width: 268, height:250}}
              />
            ) : nasabah &&
              nasabah.verified_status === 2 &&
              pinjaman &&
              pinjaman.status_pinjam === '2' && virtualNew === 'null' ? (
              <MainFresh2
                handlerChangeValue={this.handlerChangeValue}
                navigation={this.props.navigation}
              />  
     
            ) : nasabah &&
              nasabah.verified_status === 2 &&
              pinjaman &&
              pinjaman.status_pinjam === '2' && virtualNew !== 'null' ? (
                // <Text>{virtualNew}</Text>
              <FormVirtualAcc
                handlerChangeValue={this.handlerChangeValue}
                navigation={this.props.navigation}
              />  
            ) : null}
            
            <View style={{width: '90%', paddingTop: 20}}>
              {!nasabah ? (
                <Btn title="LENGKAPI DATA" onPress={() => this._Ajukan()} />
              ) : nasabah.verified_status === 1 ? (
                <Btn
                  title="MENUNGGU KONFIRMASI DATA"
                />
              ) : nasabah &&
                nasabah.verified_status === 2 &&
                pinjaman === null ? (
                <Btn
                  title="AJUKAN PINJAMAN"
                  onPress={() => this.apply_pinjaman()}
                />
              ) : nasabah &&
                nasabah.verified_status === 2 &&
                pinjaman &&
                pinjaman.status_pinjam === '1' ? (
                <Btn
                  title="PINJAMAN DIPROSES"          
                />
              ) : nasabah &&
              nasabah.verified_status === 2 &&
              pinjaman &&
              pinjaman.status_pinjam === '2' && virtualNew === 'null' ? (                                     
                <Btn
                  title="Bayar Sekarang"
                  onPress={() => this.kirimVA()}
                />             
              ) : null}  
            </View>
          </>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  byrBtn: {
    top: 280,
    width: '95%',
  }
});

// export default MainScreen;

const mapStoreToProps = state => ({
  loadings: state.nasabah.loading,
  nasabah: state.nasabah.nasabah,
  redMobile: state.register.redMobile,
  pinjaman: state.pinjaman.pinjaman,  
  // myVirtual: state.virtual.myVirtual,
  virtual: state.virtual.virtual,
});
const mapDispatchToProps = dispatch => ({
  getNasabah: mobile => dispatch(getNasabah(mobile)),
  getPinjaman: mobile => dispatch(getPinjaman(mobile)),
  getPinjaman2: mobile => dispatch(getPinjaman2(mobile)),
  // getVirtualAcc: bankname => dispatch(getVirtualAcc(bankname)),
  getVirtualAccount: bankname => dispatch(getVirtualAccount(bankname)),
  setLoading: p => dispatch(setLoading(p)),
  
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(MainScreen);
