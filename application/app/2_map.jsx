import React, {useMemo, useState} from 'react';
import {DirectionsRenderer, DirectionsService, GoogleMap, LoadScript} from '@react-google-maps/api';
require('dotenv').config();
const Gmap = () => {

    const googleMapsAPIkey =  process.env.GOOGLE_MAPS_API_KEY || '';
    const mapStyles = {
        height: "500px",
        width: "100%",
        opacity: 0.9
    };
    const [response, setResponse] = React.useState(null);
    const [start, setStart] = React.useState(null);
    const [meta, setMeta] = React.useState(null);
    const [przez, setPrzez] = React.useState([]);

    const directionsCallback = (res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res);
            } else {
                console.log('response: ', res);
            }
        }
    }
    const defaultCenter = {
        lat: 50.0647, lng: 19.9450
    }
console.log(przez + ' | ' + response)
    const map = useMemo(() => {
        function addPoint(pointToAdd) {
            if (!start) {
                setStart(pointToAdd)
            } else if (!meta) {
                setMeta(pointToAdd)
            } else {
                setPrzez((prev) => [...prev, {location: pointToAdd, stopover: false}]);
            }
        }
        return (
            <div style={{zIndex:100, position: 'relative'}}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                // center= {defaultCenter}
                // zoom={10}
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
                onClick={ev => {
                    let llat = ev.latLng.lat();
                    let llng = ev.latLng.lng();
                    addPoint({ lat: llat, lng: llng});
                }}
            >
                {
                    start && meta && (
                        <DirectionsService
                            options={{
                                destination: meta,
                                origin: start,
                                travelMode: 'DRIVING',
                                waypoints: przez
                            }}
                            callback={directionsCallback}
                        />
                    )
                }
                {
                    response !== null && (
                        <DirectionsRenderer
                            options={{
                                directions: response
                            }}
                        />
                    )
                }
            </GoogleMap>
            </div>
        );
    }, [meta, start, przez, response]);

    return (
        <LoadScript
            googleMapsApiKey={googleMapsAPIkey}>
            {map}
        </LoadScript>
    )
};

export default Gmap;
//
//             G map
//             <GoogleMap
//                 ref={map}
//                 center={{ lat: 50.088094, lng: 19.937210 }}
//                 zoom={12}
//             />
//             <DirectionsRenderer ref={directionsRenderer} />
//
//             <button onClick={() => setOrigin({ lat: 50.086386, lng: 19.936210 })}>
//                 Zmień punkt początkowy
//             </button>
//             <button onClick={() => setDestination({ lat: 50.088094, lng: 19.937210 })}>
//                 Zmień punkt końcowy
//             </button>

// import React, { useState } from 'react';
// import { GoogleMap, DirectionsRenderer } from '@googlemaps/react-wrapper';
//
// const Gmap = () => {
//     const [origin, setOrigin] = useState({ lat: 50.088094, lng: 19.937210 });
//     const [destination, setDestination] = useState({ lat: 50.086386, lng: 19.936210 });
//     console.log('g map');
//
//
//     const map = new GoogleMap({
//         center: { lat: 50.088094, lng: 19.937210 },
//         zoom: 12,
//     });
//
//     const directionsRenderer = new DirectionsRenderer({
//         map,
//         directions: [],
//     });
//
//     const handleClick = (event) => {
//         const { lat, lng } = event.latLng;
//
//         // Dodaj nową pozycję do trasy.
//         if (lat !== origin.lat || lng !== origin.lng) {
//             directionsRenderer.directions.push({
//                 origin,
//                 destination: { lat, lng },
//             });
//         }
//
//         // Wyrenderuj trasę.
//         directionsRenderer.render();
//     };
//     map.addEventListener('click', handleClick);
//
//
//     return (
//         <div>
//         <LoadScript
//                        googleMapsApiKey={googleMapsAPIkey}>
//             <GoogleMap
//                 ref={map}
//                 center={{ lat: 50.088094, lng: 19.937210 }}
//                 zoom={12}
//             />
//             <DirectionsRenderer ref={directionsRenderer} />
//         </LoadScript>
//             <button onClick={() => setOrigin({ lat: 50.086386, lng: 19.936210 })}>
//                 Zmień punkt początkowy
//             </button>
//             <button onClick={() => setDestination({ lat: 50.088094, lng: 19.937210 })}>
//                 Zmień punkt końcowy
//             </button>
//         </div>
//     );
// };
//
//
//
// export default Gmap;