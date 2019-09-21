import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Constants, Location } from 'expo';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
// import {Permissions, Location} from 'react-native-maps';
// import {Permissions} from 'react-native-permissions';
// import {Location} from 'react-native-location';
// import {Location} from 'expo-location';
// import {Permissions, Location} from 'expo';
// var MapView = require('react-native-maps');
import {DestinationButton} from './components/DestinationButton'
import {CurrentLocationButton} from './components/CurrentLocationButton'
import Walker from './components/Walker'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
    }
    this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted')
    console.log('Permission to access location was denied')

    let location = await location.getCurrentPositionAsync({accuracy: "low"});
    console.log(location)
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }
    this.setState({region: region})
  }


  //Function that will be called everytime we press current location 
centerMap() {
  const { latitude, 
    longitude, 
    latitudeDelta, 
    longitudeDelta} = this.state.region;

  this.map.animateToRegion({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  })
}

  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        <DestinationButton />
        <CurrentLocationButton cb= {() => {this.centerMap()}} />
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={false}
          ref={(map) => {this.map = map}}
          style={{ flex: 1, zIndex:0}} >
            <Walker walker={{ 
              uid: 'null', 
              location: {
                latitude:40.696431,
                longitude:-73.909620,}}}/>
          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
