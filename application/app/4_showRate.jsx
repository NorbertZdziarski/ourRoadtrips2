import React from 'react';

function ShowRate({rateArr}) {
    const quantity = rateArr.length;
    let rateValue = 5;

    return (
        <p>{'*'.repeat(rateValue)}</p>
    )
}

export default ShowRate;