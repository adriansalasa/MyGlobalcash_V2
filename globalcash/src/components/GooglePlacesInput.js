import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IMAGE} from '../constants/Image';

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

class GooglePlacesInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      where: {lat: null, lng: null},
      error: null,
    };
  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    this.setState({ready: false, error: null});
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions,
    );
  }

  geoSuccess = position => {
    this.setState({ready: true});
  };
  geoFailure = err => {
    this.setState({error: err.message});
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.ready && (
          <Text style={styles.big}>Using Geolocation in React Native</Text>
        )}
        {this.state.error && <Text style={styles.big}>{this.state.error}</Text>}
        {this.state.ready && (
          <Text style={styles.big}>{`Latitude: ${this.state.where.lat}
                Longitude: ${this.state.where.lng}`}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big: {
    fontSize: 48,
  },
});
export default GooglePlacesInput;
