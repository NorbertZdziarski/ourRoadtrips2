import React, { useState } from 'react';
// import { GoogleMap, DirectionsRenderer } from '@googlemaps/react-wrapper';

const Gmap = () => {
//     const [origin, setOrigin] = useState({ lat: 50.088094, lng: 19.937210 });
//     const [destination, setDestination] = useState({ lat: 50.086386, lng: 19.936210 });
//
//         const map = new GoogleMap({
//         center: { lat: 50.088094, lng: 19.937210 },
//         zoom: 12,
//     });
//
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
//
    return (
        <div>

        </div>
    );
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