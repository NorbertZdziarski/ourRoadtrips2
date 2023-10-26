import React from 'react';

function ShowRate({rateArr}) {
    let rateValue = 0;
    if (rateArr) {
        let newRateArr = []
        if (Object.keys(rateArr).length !== 0) {
            rateArr.map((rate)=>{newRateArr.push(rate.rate)})
            const quantity = rateArr.length;
            const sum = newRateArr.reduce((a, b) => a + b, 0)
            rateValue =  Math.round(sum / quantity);}
    }
    return (
        <p>{'*'.repeat(rateValue)}</p>
    )
}

export default ShowRate;