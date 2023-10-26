import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import {updateData} from "./a_CRUD_service";

function RateModule({ tripId, tripRate, onRatingChange }) {
    const [value, setValue] = useState(tripRate);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        onRatingChange(newValue);

    };
    return (
        <div >
            <Rating
                name="rateMachine"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default RateModule;