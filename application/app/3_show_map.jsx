import React, {useMemo, useState, useEffect, useRef} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import {Link, useNavigate} from 'react-router-dom';
require('dotenv').config();

function ShowMap({country, tripMap, tripPoint, locations}) {
    const navigate = useNavigate();
    const [isMapsLoaded, setMapsLoaded] = useState(false);
    const [isTripMapLoaded, setTripMapLoaded] = useState(false);
    const mapRef = useRef(null);
    let mapH;
    let mapZoom = 4.2;
    // if (tripMap)
    //
    // console.log(' |locations| ' + locations)
    // console.log(' | JSON | ' + JSON.stringify(locations))
    // console.log(typeof locations)

    if (!locations) {
        mapH = `600px`;
        mapZoom = 5.5;
        locations = [];
    } else {
        mapH = `100%`}

    // { console.log(' |||||||||||||||||||||||||| ');  }


    useEffect(()=>{
        if (tripMap) {
            if (tripMap.geocode.overview_path)  setTripMapLoaded(true)
        }
    },[isMapsLoaded])
    const countryCoordinates = {
        'Albania': {'lat': 41.14135330604877, 'lng': 20.03242643144321},
        'Austria': {'lat': 47.58549439, 'lng': 14.1264761},
        'Belgium': {'lat': 50.64896455, 'lng': 4.64065114},
        'Bulgaria': {'lat': 42.76829173, 'lng': 25.21552909},
        'Croatia': {'lat': 45.08047631, 'lng': 16.40412899},
        'Cyprus': {'lat': 35.00444793, 'lng': 33.0060022},
        'Czech Republic': {'lat': 49.73341233, 'lng': 15.31240163},
        'Denmark': {'lat': 55.98125296, 'lng': 10.02800992},
        'Estonia': {'lat': 58.67192961, 'lng': 25.54248537},
        'Finland': {'lat': 64.49884603, 'lng': 26.2746656},
        'France': {'lat': 46.63758005, 'lng': 2.53635431},
        'Greece': {'lat': 39.07469623, 'lng': 22.95555794},
        'Spain': {'lat': 40.24448698, 'lng': -3.64755047},
        'Netherlands': {'lat': 52.1007899, 'lng': 5.28144793},
        'Ireland': {'lat': 53.1754487, 'lng': -8.13793569},
        'Iceland': {'lat': 64.98418203, 'lng': -18.57396167},
        'Lithuania': {'lat': 55.32610984, 'lng': 23.88719355},
        'Luxembourg': {'lat': 49.76725361, 'lng': 6.07182201},
        'Latvia': {'lat': 56.85085163, 'lng': 24.91235983},
        'North Macedonia': {'lat': 41.59530839, 'lng': 21.68211346},
        'Malta': {'lat': 35.92149632, 'lng': 14.40523316},
        'Moldova': {'lat': 47.19498804, 'lng': 28.45673372},
        'Germany': {'lat': 51.10698181, 'lng': 10.38578051},
        'Norway': {'lat': 64.3010672, 'lng': 15.34834656},
        'Poland': {'lat': 52.12759564, 'lng': 19.39012835 },
        'Portugal': {'lat': 39.59550671, 'lng': -8.50104361},
        'Romania': {'lat': 45.85243127, 'lng': 24.97293039},
        'Slovakia': {'lat': 48.70547528, 'lng': 19.47905218},
        'Slovenia': {'lat': 46.11554772, 'lng': 14.80444238},
        'Switzerland': {'lat': 46.8181877, 'lng': 8.20867471},
        'Sweden': {'lat': 62.77966519, 'lng': 16.74558049},
        'Turkey': {'lat': 39.0616029, 'lng': 35.16895346},
        'Ukraine': {'lat': 48.99656673, 'lng': 31.38326469},
        'Hungary': {'lat': 47.16277506, 'lng': 19.39559116},
        'United Kingdom': {'lat': 54.12387156, 'lng': -2.86563164},
        'Italy': {'lat': 42.79662641, 'lng': 12.07001339}
    }
    const googleMapsAPIkey =  process.env.GOOGLE_MAPS_API_KEY;
    const mapStyles = {
        height: mapH,
        width: "100%",
        opacity: 0.9
    };
    const [center, setCenter] = useState({lat: 50.0647, lng: 19.9450});
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        if (country && countryCoordinates[country]) {
            setCenter(countryCoordinates[country]);
            setZoom(mapZoom);
        }
    }, [country]);
    function MarkerWithInfoWindow({ item }) {
        const [isOpen, setIsOpen] = useState(false);
        if (item.location) return (<Marker
                                        position={item.location}
                                        onClick={() => navigate(item.url)}
                                        onMouseOver={()=> setIsOpen(true)}
                                        onMouseOut={()=> setIsOpen(false)}
                                        icon={{
                                            url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png"
                                        }}
                                        // onMouseOut={() => setIsOpen(false)}
                                    >
                                        {isOpen && (
                                            <InfoWindow
                                                position={item.location}
                                                onCloseClick={() => setIsOpen(false)}
                                            >
                                                <div className={'windowItem'}><p>{item.name}</p>
                                                <p>by {item.user}</p></div>
                                            </InfoWindow>
                                        )}
                                    </Marker>)
        return (
            <Marker
                position={countryCoordinates[item.country]}
                // title={item.name}
                onClick={() => navigate(item.url)}
                onMouseOver={()=> setIsOpen(true)}
                onMouseOut={()=> setIsOpen(false)}
                icon={{
                    url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_white.png"
                }}
            >
                {isOpen && (
                    <InfoWindow
                        position={item.location}
                        onCloseClick={() => setIsOpen(false)}
                    >
                        <div className={'windowItem'}>
                            <p>{item.name}</p>
                            <p>by {item.user}</p>
                        </div>
                    </InfoWindow>
                )}
            </Marker>
        );
    }
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
                        const polyline = new window.google.maps.Polyline({
                            path: tripMap.geocode.overview_path,
                            geodesic: true,
                            strokeColor: "#fb3c02",
                            strokeOpacity: 1.0,
                            strokeWeight: 3
                        });
                        polyline.setMap(mapRef.current);
                        let bounds = new window.google.maps.LatLngBounds();
                        tripMap.geocode.overview_path.forEach((point) => {
                            bounds.extend(point);
                        });
                        map.fitBounds(bounds);
                    }
                }}
            >
                {locations.map((item, i) => (
                    <MarkerWithInfoWindow key={i} item={item} />
                ))}
            </GoogleMap>
        </div>
    ), [center, zoom, tripMap, isMapsLoaded, isTripMapLoaded]);
    return (
        <LoadScript googleMapsApiKey={googleMapsAPIkey} onLoad={() => setMapsLoaded(true)}>
            {map}
        </LoadScript>
    );
};
export default ShowMap;