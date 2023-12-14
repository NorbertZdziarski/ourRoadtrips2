import React, {useMemo, useState, useEffect} from 'react';
import {GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
require('dotenv').config();

const ShowMap = ({country, tripMap, tripPoint}) => {

    const countryCoordinates = {
        'Poland': {lat: 51.9194, lng: 19.1451},
        'Finland': {lat: 70.10, lng: 31.58},
        'Sweden': {lat: 69.06, lng: 24.16},
        'United Kingdom': {lat: 60.85, lng: 1.76},
        'Estonia': {lat: 59.68, lng: 28.21},
        'Latvia': {lat: 58.08, lng: 28.24},
        'Denmark': {lat: 57.75, lng: 15.16},
        'Lithuania': {lat: 56.45, lng: 26.87},
        'Ireland': {lat: 55.39, lng: -6.00},
        'Germany': {lat: 55.06, lng: 15.04},
        'Netherlands': {lat: 53.51, lng: 7.23},
        'Belgium': {lat: 51.51, lng: 6.40},
        'France': {lat: 51.09, lng: 9.56},
        'Czech Republic': {lat: 51.05, lng: 18.85},
        'Luxembourg': {lat: 50.18, lng: 6.53},
        'Slovakia': {lat: 49.60, lng: 22.57},
        'Austria': {lat: 49.02, lng: 17.16},
        'Hungary': {lat: 48.59, lng: 22.91},
        'Romania': {lat: 48.27, lng: 29.69},
        'Italy': {lat: 47.10, lng: 18.51},
        'Slovenia': {lat: 46.88, lng: 16.57},
        'Bulgaria': {lat: 44.22, lng: 28.61},
        'Spain': {lat: 43.79, lng: 4.32},
        'Portugal': {lat: 42.15, lng: -6.18},
        'Greece': {lat: 41.76, lng: 28.25},
        'Malta': {lat: 36.08, lng: 14.58},
        'Cyprus': {lat: 35.70, lng: 34.60}
    };

    console.log('country: ' + country + countryCoordinates[country]);
    console.log('country: ' + JSON.stringify(countryCoordinates[country]));

    const googleMapsAPIkey =  process.env.GOOGLE_MAPS_API_KEY;
    const mapStyles = {
        height: "600px",
        width: "100%",
        opacity: 0.9
    };
    const [center, setCenter] = useState({lat: 50.0647, lng: 19.9450});
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        if (country && countryCoordinates[country]) {
            setCenter(countryCoordinates[country]);
            setZoom(5); // Adjust zoom level as needed

            console.log('center: ' + center + 'zoom: ' + zoom)
            console.log('center: ' + JSON.stringify(center))
        }
    }, [country]);
    tripPoint = {lat: 50.0614, lng: 19.9366};
    tripMap =  [
 { lat: 50.0614, lng: 19.9366 },

           { lat: 44.4325, lng: 26.1039 },
 { lat: 48.7238, lng: 21.2571 }
    ];

    const [directions, setDirections] = useState(null);

    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirections(response);
            } else {
                console.log('response: ', response);
            }
        }
    }

    const map = useMemo(() => (
        <div style={{zIndex:1000, width: '100%', height: '100%'}}>

            <GoogleMap
                mapContainerStyle={mapStyles}
                center={center}
                zoom={zoom}
                options={{
                    mapId: '9bce0c5043b558bb',
                    mapTypeControl: true,
                    mapTypeId: 'roadmap',
                    backgroundColor: 'hsla(0, 0%, 0%, 0)',
                    mapTypeControlOptions: {
                        style: 'ourRoadTrips2_style',
                        position: 'TOP_RIGHT',
                        mapTypeIds: [
                            'roadmap',
                            'satellite',
                            'hybrid',
                            'terrain',
                            'styled_map'
                        ]
                    }
                }}
            >
                {/*{tripPoint && <Marker position={tripPoint} />}*/}
                {/*{tripMap && <Polyline path={tripMap} options={{strokeColor: "#02bbfb"}}/>}*/}

                {tripMap &&
                    <DirectionsService
                        options={{
                            destination: tripMap[tripMap.length - 1],
                            origin: tripMap[0],
                            travelMode: 'DRIVING',
                            waypoints: tripMap.slice(1, -1).map(location => ({location}))
                        }}
                        callback={directionsCallback}
                    />
                }
                {directions && <DirectionsRenderer directions={directions} />}



            </GoogleMap>
        </div>
    ), [center, zoom, tripPoint, tripMap]);

    return (
        <>
            <LoadScript
                googleMapsApiKey={googleMapsAPIkey}>
                {map}
            </LoadScript>
        </>
    )
};

export default ShowMap;




//     onClick={ev => {
//         let llat = ev.latLng.lat();
//         let llng = ev.latLng.lng();
//         addPoint({ lat: llat, lng: llng});
//     }}
// >
//     {
//         start && meta && (
//             <DirectionsService
//                 options={{
//                     destination: meta,
//                     origin: start,
//                     travelMode: 'DRIVING'
//                 }}
//                 callback={directionsCallback}
//             />
//         )
//     }
//     {
//         response !== null && (
//             <DirectionsRenderer
//                 options={{
//                     directions: response
//                 }}
//             />
//         )
//     }