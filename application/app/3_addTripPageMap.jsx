import React, { useState, useEffect} from 'react';
import AddRoute from "./3_add_route";

function AddTripPageMap({setPageInputTrip, pageInputTrip, country, formData, setFormData}) {

    const [routeToSave, setRouteToSave] = useState(null)
    useEffect(()=>{
        if (routeToSave) {
            let tripDataToSave = {
                tripMap: {
                    start_address: routeToSave.routes[0].legs[0].start_address,
                    end_address: routeToSave.routes[0].legs[0].end_address,
                    distance: routeToSave.routes[0].legs[0].distance,
                    summary: routeToSave.routes[0].summary,
                    travelMode: routeToSave.request.travelMode,
                    waypoints: routeToSave.geocoded_waypoints,
                    geocode: routeToSave.routes[0]
                }
            }
            setFormData(tripDataToSave)
        }
    },[routeToSave])
    return (<>

        <div>
            <AddRoute country={country} routeToSave={routeToSave} setRouteToSave={setRouteToSave}/>
            <div>
                <button onClick={()=> setPageInputTrip(pageInputTrip - 1)}>back</button>
                <button onClick={()=> setPageInputTrip(pageInputTrip + 1)}>next</button>
            </div>
        </div>

    </>)
}

export default AddTripPageMap;