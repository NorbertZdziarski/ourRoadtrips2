import React, { useState } from 'react';
// import { GoogleMap, DirectionsRenderer } from '@googlemaps/react-wrapper';
import {DirectionsRenderer, DirectionsService, GoogleMap, LoadScript} from '@react-google-maps/api';
require('dotenv').config();
const Gmap = () => {

    const googleMapsAPIkey =  process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyCzEi629ZB2TUIp0u8YTj-9FcxBlzK4r0I'
    const mapStyles = {
        height: "100vh",
        width: "100%"
    };
    const [response, setResponse] = React.useState(null);

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
        // lat: 50.0647, lng: 19.9450
        // lat: 41.85,
        // lng: -87.65
    }
console.log(response)
    return (
        <LoadScript
            googleMapsApiKey={googleMapsAPIkey}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                // zoom={13}
                // center={defaultCenter}
                options={{
                    mapId: '9bce0c5043b558bb',
                    mapTypeControl: true,
                    mapTypeId: 'roadmap',
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
                <DirectionsService
                    // required
                    options={{
                        destination: 'Bukareszt, RO',
                        origin: 'Krakow, Pl',
                        travelMode: 'DRIVING',
                        waypoints: [
                            {
                                location: 'Koszyce, SK',
                                stopover: true
                            },
                            {
                                location: 'Cluj-Napoca, RO',
                                stopover: true
                            }
                        ]
                    }}
                    // required
                    callback={directionsCallback}
                />

                {
                    response !== null && (
                        <DirectionsRenderer
                            // required
                            options={{
                                directions: response
                            }}
                        />
                    )
                }
            </GoogleMap>
        </LoadScript>
    )

};

export default Gmap;

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
//         </div>
//     );
// };
//
//
//
// export default Gmap;