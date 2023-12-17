import React, { useState, useEffect} from 'react';
import AddTripPage2 from "./3_addTripPage2";
import AddTripPage1 from "./3_addTripPage1";
import AddTripPage3 from "./3_addTripPage3";
import AddTripPage4 from "./3_addTripPage4";

const AddTrip = () => {
    const [pageInputTrip, setPageInputTrip] = useState(1)
    return (<>
        <section>
            <div>
                {(pageInputTrip === 1) ? <AddTripPage1 /> : <></>}
                {(pageInputTrip === 2) ? <AddTripPage2 /> : <></>}
                {(pageInputTrip === 3) ? <AddTripPage3 /> : <></>}
                {(pageInputTrip === 4) ? <AddTripPage4 /> : <></>}
            </div>
            <div>
                <button onClick={()=> setPageInputTrip(1)}>1</button>
                <button onClick={()=> setPageInputTrip(2)}>2</button>
                <button onClick={()=> setPageInputTrip(3)}>3</button>
                <button onClick={()=> setPageInputTrip(4)}>4</button>
            </div>
        </section>
    </>)
}

export default AddTrip;