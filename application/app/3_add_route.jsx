import React, {useMemo, useState, useEffect} from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    DirectionsService,
    DirectionsRenderer,
    OverlayView
} from '@react-google-maps/api';
import Anim_loading from "./anim_loading";
require('dotenv').config();

function AddRoute({country, routeToSave, setRouteToSave}) {
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

const [directions, setDirections] = useState(null);
const [tripPoint, setTripPoint] = useState(false);
const [addPointClass, setAddPointClass] = useState('');

    const [routeInfoKM, setRouteInfoKM] = useState(false);
    const [routeInfoTime, setRouteInfoTime] = useState(false);
    const [routeInfoSummary, setRouteInfoSummary] = useState(false);
    const [routeInfoPoints, setRouteInfoPoints] = useState([]);


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

useEffect(()=>{
    console.log(' _use Effect _ add new point ' + addNewPoint)
},[addNewPoint]);

useEffect(() => {
    if (country && countryCoordinates[country]) {
        setCenter(countryCoordinates[country]);
        setZoom(7);

    }
}, [country]);

    useEffect(() => {
        console.log(' _długość: ' + tripMap.length)
        if (tripMap.length === 1) {setTripPoint(true)} else {setTripPoint(false)}
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
                    console.log(result)
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        console.log('update directions ' + result)
                        setDirections(result);
                        setRouteData(result)
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }

    }, [tripMap]);


    useEffect(()=>{
        setRouteToSave(routeData)
        console.log('==================================')
        // console.log(routeData.geocoded_waypoints)
        // console.log(routeData.routes)
        // console.log('----------------------------------')


        // if (routeData.geocoded_waypoints) console.log(routeData.geocoded_waypoints.length)


        // console.log('----------------------------------')
        if (routeData.routes) {
            console.log(routeData.routes[0].summary)
            // console.log(routeData.routes[0].legs[0].distance)
            // console.log(routeData.routes[0].legs[0].duration)
            console.log(routeData.routes[0].legs[0].end_address)
            console.log(routeData.routes[0].legs[0].start_address)
            // console.log(routeData.routes[0].legs[0].start_address)
            // console.log('----------------------------------')
            setRouteInfoKM(routeData.routes[0].legs[0].distance.text);
            setRouteInfoTime(routeData.routes[0].legs[0].duration.text);
            setRouteInfoSummary(routeData.routes[0].summary);
            // setRouteInfoPoints()

        }


    },[routeData])

    const addPoint = (point) => {
        console.log('|>> trip map POINT json: ' + JSON.stringify(point))
        setTripMap((prev) =>[...prev, point]);
        setAddNewPoint(false)

    }

    useEffect(()=>{
        if (addNewPoint) {setAddPointClass('addTrip-newPoint')} else {setAddPointClass('')}
    },[addNewPoint])

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
                // console.log(' ___ onClick _ add new point ' + addNewPoint)
                if (addNewPoint) {
                    // console.log(' ___ IF onClick _ add new point ' + addNewPoint)
                    let llat = ev.latLng.lat();
                    let llng = ev.latLng.lng();
                    addPoint({ lat: llat, lng: llng});
                }
            }}
        >

        {tripPoint && <Marker position={tripMap[0]} />}

        {directions && <DirectionsRenderer directions={directions} />}
        {/*<OverlayView*/}
        {/*    position= {{ lat: 52.2297, lng: 21.0122 }}*/}
        {/*    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}*/}
        {/*>*/}
        {/*    <div style={{ cursor: 'pointer' }}> /!* Tutaj zmieniamy kursor *!/*/}
        {/*        <h1>OverlayView</h1>*/}
        {/*        <button type='button'>Click me</button>*/}
        {/*    </div>*/}
        {/*</OverlayView>*/}
        </GoogleMap>

    </div>
), [mapStyles, center, zoom, addNewPoint, tripPoint, tripMap, directions]);
console.log('tripMap.length: ' + tripMap.length)
    return (
        <>
            <div className={addPointClass}>
                <LoadScript
                    googleMapsApiKey={googleMapsAPIkey}>
                    {map}
                </LoadScript>
            </div>
            <section className={`layout_flex-sb addTrip_inputCont addTrip_inputMap addTrip_inputBox2 `}>
                {(tripMap.length===0) ? <button className={addPointClass} onClick={()=>setAddNewPoint(true)} > Add first point </button> : <button onClick={()=>setAddNewPoint(true)} > Add next point </button>}
                {/*<button disabled={} onClick={()=>{setAddNewPoint(true)}}> Add next point </button>*/}
                <div>
                    {routeInfoSummary ? <p className={`fnt_subtitle`}>Your route:</p>:  <p> no trip </p>}
                    {/*{(tripMap.length>0) ? <>{tripMap.map((pointOnMap, index)=>{<div> <p>{index}</p>  </div>}) }</> : <></>}*/}
                    {routeInfoKM ? <p> length: {routeInfoKM}</p>  : <></>}
                    {routeInfoTime ? <p> czas: {routeInfoTime}</p> : <></>}
                </div>
                <div>
                    {routeData ?
                        <>
                            <p>{routeData.routes[0].summary}</p>
                            <p>{routeData.routes[0].legs[0].start_address}</p>
                            <p>{routeData.routes[0].legs[0].end_address}</p>
                        </> : <p> no data </p>}
                </div>
            </section>
        </>
    )
};
export default AddRoute;