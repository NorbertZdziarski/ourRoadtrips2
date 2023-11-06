import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const Gmap = () => {
    const [origin, setOrigin] = useState({ lat: 50.088094, lng: 19.937210 });
    const [destination, setDestination] = useState({ lat: 50.086386, lng: 19.936210 });
    const [response, setResponse] = useState(null);
    const directionsCallback = (res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res);
            } else {
                console.log('response: ', res);
            }
        }
    };

    return (
        <LoadScript
            id="script-loader"
            googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY_GOES_HERE"
        >
            <GoogleMap
                id='direction-example'
                mapContainerStyle={{
                    height: "400px",
                    width: "800px"
                }}
                zoom={2}
                center={{
                    lat: 0,
                    lng: -180
                }}
            >
                {
                    (
                        destination !== '' &&
                        origin !== ''
                    ) && (
                        <DirectionsService
                            options={{
                                destination: destination,
                                origin: origin,
                                travelMode: 'DRIVING'
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
            <button onClick={() => setOrigin({ lat: 50.086386, lng: 19.936210 })}>
                Zmień punkt początkowy
            </button>
            <button onClick={() => setDestination({ lat: 50.088094, lng: 19.937210 })}>
                Zmień punkt końcowy
            </button>
        </LoadScript>
    );
};

export default Gmap;
