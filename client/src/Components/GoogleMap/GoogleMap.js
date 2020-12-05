import React from 'react';
import GoogleMapReact from 'google-map-react';

const API_KEY = 'AIzaSyAFTYK6VvpgQEmKt5W2iGjNfw-Ode1TR3c';

const MapContainerComponent = ({ text }) => <div>{text}</div>;

const renderMarker = (map, maps, center, locationName) => {
    new maps.Marker({
        position: center,
        map,
        title: locationName
    });
};


const GoogleMap = (props) => {
    return (
        <GoogleMapReact
            
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
            onGoogleApiLoaded={({map, maps}) => renderMarker(map, maps, props.center, props.location)}>
            <MapContainerComponent
                lat={props.center.latitude}
                lng={props.center.longitude}
                text={props.location}
            />
        </GoogleMapReact>
    );
}

export default GoogleMap