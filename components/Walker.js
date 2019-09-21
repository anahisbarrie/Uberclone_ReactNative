import React from 'react'
import {
    Image,
    View,

} from 'react-native';
import MapView from 'react-native-maps';
// import { MapView } from 'expo';

export default class Walker extends React.Component {
    constructor(props) {
        super(props);

        // condition that determines if there's a driver around or not
        const walker = this.props.walker ?
            this.props.walker : 
            {
                uid: "noWalkerPassed",
                location: { latitude: 0, longitude: 0 }
            }
        const coordinate = new MapView.AnimatedRegion({
            latitude: walker.location.latitude,
            longitude: walker.location.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0
        })
        this.state = {
            walker: walker,
            coordinate: coordinate
        }
    }
    
    render(){
        return (
            <MapView.Marker.Animated
            coordinate ={this.state.coordinate}
            anchor={{x: 0.35, y: 0.32}} // centers walker.png image
            ref = {marker => {this.marker = marker}}
            style = {{width: 50, height: 50}}>
                <Image
                source={require('../assets/images/walker.png')}
                style= {{
                    width: 32,
                    height: 32,
                }} />
            </MapView.Marker.Animated> 
        )
    }
}

