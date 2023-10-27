 export function calculateTheAverage(rateArr) {
     let newRateArr = []
     rateArr.map((rate) => {

         newRateArr.push(rate.rate)
     })
     const quantity = rateArr.length;
     const sum = newRateArr.reduce((a, b) => a + b, 0)
     return  Math.round(sum / quantity);
 }