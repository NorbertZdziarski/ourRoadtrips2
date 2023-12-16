import React, {useMemo, useState, useEffect} from 'react';
import {GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
require('dotenv').config();

const AddRoute = ({country}) => {
const googleMapsAPIkey =  process.env.GOOGLE_MAPS_API_KEY;
const mapStyles = {
    height: "600px",
    width: "100%",
    opacity: 0.9
};
const [center, setCenter] = useState({lat: 50.0647, lng: 19.9450});
const [zoom, setZoom] = useState(4);
const [tripMap, setTripMap] = useState([]);
const [addNewPoint, setAddNewPoint] = useState(false);
const [routeData, setRouteData] = useState(false);

// const [start, setStart] = useState({lat: 51.9194, lng: 19.1451});
// const [meta, setMeta] = useState({lat: 51.05, lng: 18.85});

const [directions, setDirections] = useState(null);

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

useEffect(() => {
    if (country && countryCoordinates[country]) {
        setCenter(countryCoordinates[country]);
        setZoom(7);

    }
}, [country]);

    useEffect(() => {
        console.log(' długość: ' + tripMap.length)
        console.log(' dane json '+ JSON.stringify(tripMap))
        if (tripMap.length > 1) {
            const directionsService = new window.google.maps.DirectionsService();
            const waypoints = tripMap.slice(1, -1).map(location => ({location, stopover: false}));
            directionsService.route(
                {
                    origin: tripMap[0],
                    destination: tripMap[tripMap.length - 1],
                    travelMode: 'DRIVING',
                    waypoints: waypoints
                },
                (result, status) => {
                    console.log('_ result ' + result)
                    console.log('_ result JSON ' + JSON.stringify(result));
                    console.log(' status ' + status)
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        console.log('update directions')
                        setDirections(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [tripMap]); // Dodaj tripMap do listy zależności

// useEffect(() => {
//     // setStart(tripMap[0])
//     // if (tripMap.length > 0) setMeta(tripMap[tripMap.length - 1])
//     // console.log('EFFECT trip map: ' + tripMap);
//     // console.log('EFFECT trip map length: ' + tripMap.length + '<<<<<<<<<');
//     // console.log('EFFECT || trip map json: ' + JSON.stringify(tripMap))
//     // console.log('EFFECT directions: ' + JSON.stringify(directions))
//     tripMap.forEach((point, index) => {
//         console.log('L____' + point.lat + ' | ' + point.lng)
//         if (typeof point.lat !== 'number' || point.lat < -90 || point.lat > 90) {
//             console.error(`Invalid latitude at index ${index}: `, point.lat);
//         }
//         if (typeof point.lng !== 'number' || point.lng < -180 || point.lng > 180) {
//             console.error(`Invalid longitude at index ${index}: `, point.lng);
//         }
//     });
//     console.log('ROUTE DATA: ' + JSON.stringify(routeData));
// }, [tripMap, directions]);

// useEffect(()=>{
//     console.log('EFFECT start: ' + start + '<<');
//     console.log('EFFECT |start json: ' + JSON.stringify(start))
//     console.log('EFFECT meta: ' + meta + '<<<<');
//     console.log('EFFECT |meta json: ' + JSON.stringify(meta))
//
// },[start,meta])

    const addPoint = (point) => {
        console.log('|>> trip map POINT json: ' + JSON.stringify(point))
        setTripMap((prev) =>[...prev, point]);
    }

    const directionsCallback = (response) => {
        console.log('__Response: ', response);
        if (response !== null) {
            if (response.status === 'OK') {
                setDirections(response);
                setRouteData(response)
            } else {
                console.log('Response status not OK: ', response.status);
            }
        } else {
            console.log('Response is null');
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
onClick={ev => {
let llat = ev.latLng.lat();
let llng = ev.latLng.lng();
addPoint({ lat: llat, lng: llng});
}}
>
{/*{tripMap.length[0] && !tripMap.length[1] &&  <Marker position={tripMap[0]} /> }*/}

{/*{tripMap.length > 1 &&*/}
{/*<DirectionsService*/}
{/*options={{*/}
{/*destination: tripMap[tripMap.length - 1],*/}
{/*origin: tripMap[0],*/}
{/*travelMode: 'DRIVING',*/}
{/*waypoints: tripMap.slice(1, -1).map(location => ({location}))*/}
{/*}}*/}
{/*callback={directionsCallback}*/}
{/*/>*/}
{/*}*/}
{directions && <DirectionsRenderer directions={directions} />}

</GoogleMap>
<section>
<button disabled onClick={()=>{setAddNewPoint(true)}}> Add first point </button>
<button disabled onClick={()=>{setAddNewPoint(true)}}> Add next point </button>
<div>
<p>Your route:</p>
{tripMap ? <>{tripMap.map((pointOnMap)=>{<div> {pointOnMap} </div>}) }</> : <>none</>}

</div>
</section>
</div>
), [center, zoom, tripMap, directions]);

    return (
        <>
            <LoadScript
                googleMapsApiKey={googleMapsAPIkey}>
                {map}
            </LoadScript>
        </>
    )
};
export default AddRoute;
