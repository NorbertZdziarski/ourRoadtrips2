import React, {useMemo, useState, useEffect, useRef} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
require('dotenv').config();

const ShowMap = ({country, tripMap, tripPoint}) => {
    const [isMapsLoaded, setMapsLoaded] = useState(false);
    const [isTripMapLoaded, setTripMapLoaded] = useState(false);
    const mapRef = useRef(null);

    useEffect(()=>{
        if (tripMap) {
            if (tripMap.geocode.overview_path)  setTripMapLoaded(true)
        }
    },[isMapsLoaded])

    const countryCoordinates = {
        'Poland': {lat: 51.9194, lng: 19.1451},
        'Finland': {lat: 70.10, lng: 31.58},
    };
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
            setZoom(3);
        }
    }, [country]);

    const map = useMemo(() => (
        <div style={{zIndex:1000, width: '100%', height: '100%'}}>
            <GoogleMap
                ref={mapRef}
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
                onLoad={map => {
                    mapRef.current = map;
                    if (isTripMapLoaded) {
                        new window.google.maps.Polyline({
                            path: tripMap.geocode.overview_path,
                            geodesic: true,
                            strokeColor: "#fb3c02",
                            strokeOpacity: 1.0,
                            strokeWeight: 3
                        }).setMap(mapRef.current)
                    }
                }}
            />
        </div>
    ), [center, zoom, tripMap, isMapsLoaded, isTripMapLoaded]);

    return (
        <LoadScript googleMapsApiKey={googleMapsAPIkey} onLoad={() => setMapsLoaded(true)}>
            {map}
        </LoadScript>
    );
};
export default ShowMap;
