import React, { useState, useEffect} from 'react';
import AddRoute from "./3_add_route";

const AddTripPage3 = ({page, setPageInputTrip, pageInputTrip}) => {

    return (<>

        <div>
            <AddRoute/>
            <div>
                <button onClick={()=> setPageInputTrip(pageInputTrip - 1)}>back</button>
                <button onClick={()=> setPageInputTrip(pageInputTrip + 1)}>next</button>
            </div>
        </div>

    </>)
}

export default AddTripPage3;