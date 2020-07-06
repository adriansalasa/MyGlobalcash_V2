import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Content} from 'native-base';
import {
  getProvinces,
  delProvinces,
  getRegencies,
  delRegencies,
  getDistricts,
  delDistricts,
  getVillages,
  delVillages,
} from '../../redux/action/OpsiAction';
import {connect} from 'react-redux';

class DropdownLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      provinceSelect: '',
      regencySelect: '',
      districtSelect: '',
      villageSelect: '',
    };
  }

  componentDidMount() {
    this.props.getProvinces();
  }

  getRegencies(provinceID, provinceName) {
    this.props.delProvinces();
    this.props.getRegencies(provinceID);
    this.setState({provinceSelect: provinceName});
  }

  getDistricts(regencyID, regencyName) {
    this.props.delRegencies();
    this.props.getDistricts(regencyID);
    this.setState({regencySelect: regencyName});
  }

  getVillages(districtID, districtName) {
    this.props.delDistricts();
    this.props.getVillages(districtID);
    this.setState({districtSelect: districtName});
  }

  doneDrop(villageName) {
    this.props.delVillages();
    const {provinceSelect, regencySelect, districtSelect} = this.state;
    this.props.delVillages();
    this.props.handlerChangeValue(
      'location',
      `${provinceSelect}, ${regencySelect}, ${districtSelect}, ${villageName}`,
    );
    this.props.handlerCloseDrop('showDrop', false);
  }

  render() {
    return (
      this.props.showDrop && (
        <Modal transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
            }}>
            <View style={{height: 100}} />
            <View
              style={{
                height: '100%',
                maxHeight: '90%',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: 'white',
              }}>
              <Content>
                <View>
                  <Button
                    onPress={() =>
                      this.props.handlerCloseDrop('showDrop', false)
                    }
                    title="Kembali"
                    color="#841584"
                  />
                </View>
                <View>
                  {this.props.provinces
                    ? this.props.provinces.map((i, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.sub_Category_Text}
                          onPress={() => this.getRegencies(i.id, i.name)}>
                          <Text> {i.name} </Text>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#000',
                            }}
                          />
                        </TouchableOpacity>
                      ))
                    : this.props.regencies
                    ? this.props.regencies.map((i, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.sub_Category_Text}
                          onPress={() => this.getDistricts(i.id, i.name)}>
                          <Text> {i.name} </Text>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#000',
                            }}
                          />
                        </TouchableOpacity>
                      ))
                    : this.props.districts
                    ? this.props.districts.map((i, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.sub_Category_Text}
                          onPress={() => this.getVillages(i.id, i.name)}>
                          <Text> {i.name} </Text>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#000',
                            }}
                          />
                        </TouchableOpacity>
                      ))
                    : this.props.villages
                    ? this.props.villages.map((i, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.sub_Category_Text}
                          onPress={() => this.doneDrop(i.name)}>
                          <Text> {i.name} </Text>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#000',
                            }}
                          />
                        </TouchableOpacity>
                      ))
                    : null}
                </View>
              </Content>
            </View>
          </View>
        </Modal>
      )
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#F5FCFF',
  },

  iconStyle: {
    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    tintColor: '#fff',
  },

  sub_Category_Text: {
    fontSize: 18,
    color: '#000',
    padding: 10,
  },

  category_Text: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 21,
    padding: 10,
  },

  category_View: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0091EA',
  },

  Btn: {
    padding: 10,
    backgroundColor: '#FF6F00',
  },
  Container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  Header: {
    top: 100,
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  Content: {},
});

const mapStoreToProps = state => ({
  loading: state.opsi.loading,
  provinces: state.opsi.provinces,
  regencies: state.opsi.regencies,
  districts: state.opsi.districts,
  villages: state.opsi.villages,
});
const mapDispatchToProps = dispatch => ({
  getProvinces: () => dispatch(getProvinces()),
  delProvinces: () => dispatch(delProvinces()),
  getRegencies: provinceID => dispatch(getRegencies(provinceID)),
  delRegencies: () => dispatch(delRegencies()),
  getDistricts: regencyID => dispatch(getDistricts(regencyID)),
  delDistricts: () => dispatch(delDistricts()),
  getVillages: districtID => dispatch(getVillages(districtID)),
  delVillages: () => dispatch(delVillages()),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(DropdownLocation);
