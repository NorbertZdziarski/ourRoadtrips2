import React, { useState } from 'react';
import '../css/main.scss';
import {useStoreActions, useStoreState} from "easy-peasy";
const PrintForm = ({form,formData,usersCars, setFormData, setFile, type}) => {
    const countriesInEurope = ["all", "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"];
    const tripTypes = ["all", "recreation", "sightseeing", "extreme"];
    const carsStyleTypes=["all", "car", "bike", "4x4", "camper", "other"];
    const carsPurposeTypes=["all", "daily", "classic", "forFun"];

    const carsEngineFuelType=["petrol", "electric","hybrid","diesel", "other"];

    const loggedUser = useStoreState(state => state.loggedUser);

    const excludedValues = ['password', 'repeat password','regulations', 'tripCarStyleType','userPhoto', 'tripDate', 'carId', 'tripUserId', 'tripType', 'tripCountry', 'carStyleType', 'carPurposeType', 'carPhoto','tripPhoto','tripCar', 'tripPublic','tripRate','tripComments', 'cars'];
    const excludedValuesTitle = ['cars','carId', 'tripUserId','tripCarStyleType'];
    const [stan, setStan] = useState(true);
    const [choseCar, setChoseCar] = useState(false);

    const temporaryPass1 = useStoreState(state => state.temporaryPass1);
    const setTemporaryPass1 = useStoreActions(actions => actions.setTemporaryPass1);
    const temporaryPass2 = useStoreState(state => state.temporaryPass2);
    const setTemporaryPass2 = useStoreActions(actions => actions.setTemporaryPass2);

    let slicePoint;
    let commentsValue;
    let tripRateData;
    console.log(usersCars)
    // console.log(usersCarId)
    // console.log(usersCarStyleType)
    const zmienStan = () => {
        setStan(!stan);
        setFormData({ ...formData, tripPublic: stan })
    };
    const rullesStan = () => {
        setStan(!stan);
        setFormData({ ...formData, regulations: stan })
    };

    function handleFileChange(event) {
        console.log(event.target.files)
        console.log(typeof event.target.files)
        let filesArr = event.target.files;
        console.log(filesArr)

        setFile(filesArr)

        // filesArr.map((file) => {
        //     console.log(file)
        // })

        // let fileUpload = (event.target.files[0]);
        // setFile(fileUpload)
    }

    const handleChange = (e) => {
                setFormData({ ...formData, [e.target.name]: JSON.parse(e.target.value) });
    };

    if (type === 'user') {
        slicePoint = 0;
        if (!loggedUser._id && (!form.includes('password' && 'regulations'))) {
            form.push('password');
            form.push('regulations');
            formData.password = '';
            formData.regulations = '';
        }
        if ((loggedUser._id) && (!form.includes('password' && 'repeat password'))) {
            form.push('password');
            form.push('repeat password');
        }
    }
    if (type === 'trip') slicePoint = 4;
    if (type === 'car') slicePoint = 3;

    console.log(formData)
    console.log(form)


    if (formData.tripComments) commentsValue = formData.tripComments.length;
    if (formData.tripRate) {
        let rateSum = formData.tripRate.reduce((suma, obj )=> suma + obj.rate,0);
        let rateMax = Math.max(...formData.tripRate.map(obj => obj.rate));

        tripRateData = { nrOfVotes: formData.tripRate.length,
                         average: rateSum / formData.tripRate.length,
                         max: rateMax};
    }

    return(
        <div className="imputForm_container">
            {form.map((value) => <div key={`line${value}`}>
                {/*// ------------------------- ------ ----!!!!!!! TO DO !!!!!!!!!!!!!------- rodzaj paliwa, areatext do opisu*/}
                <label className="imputForm_box">
                    {(excludedValuesTitle.includes(value) ? null : <p >{value.slice(slicePoint,value.length)}:</p>)}
                    {(value === 'tripCountry') ? <select value={formData[value]} name={value} onChange={handleChange} className="">
                        {countriesInEurope.map((country) => (
                            <option key={country} value={country} >
                                {country}
                            </option>
                        ))}
                    </select> : <></>}
                    {(value === 'tripType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {tripTypes.map((triptype) => (
                            <option key={triptype} value={triptype} >
                                {triptype}
                            </option>
                        ))}
                    </select>):(<></>)}

                    {/*---------------------------------------------------------------------------------------*/}

                    {(value === 'carStyleType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {carsStyleTypes.map((carStyle) => (
                            <option key={carStyle} value={carStyle} >
                                {carStyle}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {value === 'tripCar' ? <>
                    {choseCar ?
                            (<select value={formData[value[0]]} name={value} onChange={handleChange} className="">
                                {usersCars.map((tripCar) => (
                                    <option key={tripCar[0]} value={JSON.stringify(tripCar)} >
                                        {tripCar[0]} - {tripCar[2]}
                                    </option>
                                ))}
                            </select>) : <input type="text" name={value} value={formData[value] || ''} onChange={handleChange} className="imputForm_inputData"/>}
                        <button type="button" className="main_button" onClick={() => setChoseCar(!choseCar)}>change</button>
                        </>
                        :(<></>)}
                    {(value === 'carPurposeType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {carsPurposeTypes.map((carsPurpose) => (
                            <option key={carsPurpose} value={carsPurpose} >
                                {carsPurpose}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'tripPublic')?(
                        <div className="imputForm_visibility">
                            <div className="imputForm_visibility_txt">{stan ? 'will not be displayed' : 'visible on main page'}</div>
                            <button type="button" className="main_button" onClick={zmienStan}>change visibility</button>
                        </div>
                    ):(<></>)}
                    {(value === 'regulations')?(
                        <div className="imputForm_visibility">
                            <div className="imputForm_visibility_txt">{stan ? 'you do not accept the regulations' : 'you accept the regulations'}</div>
                            <button type="button" className="main_button" onClick={rullesStan}>change</button>
                        </div>
                    ):(<></>)}
                    {(value === 'tripDate')?(<input type="date" className="date-input" />):(<></>)}

                    {(value === 'carPhoto')?(
                        <input type="file" onChange={handleFileChange} className="imputForm_inputFile"/>
                    ):(<></>)}
                    {(value === 'tripPhoto')?(
                        <input type="file" onChange={handleFileChange} className="imputForm_inputFile" multiple/>
                    ):(<></>)}
                    {(value === 'userPhoto')?(
                        <input type="file" onChange={handleFileChange} className="imputForm_inputFile"/>
                    ):(<></>)}
                    {(value === 'tripRate')?(
                        <div className="imputForm_txt">Number of votes: {tripRateData.nrOfVotes} | Average: {tripRateData.average} | Best: {tripRateData.max}</div>
                    ):(<></>)}
                    {(value === 'tripComments')?(<p>{commentsValue}</p>
                    ):(<></>)}
                    {(value === 'password')?(
                    <input type="text" name={value} value={temporaryPass1 || ''} onChange={(e)=> {setTemporaryPass1(e.target.value)} } className="imputForm_inputData"/>
                    ):(<></>)}
                    {(value === 'repeat password')?(
                        <input type="text" name={value} value={temporaryPass2 || ''} onChange={(e)=> {setTemporaryPass2(e.target.value)} } className="imputForm_inputData"/>
                    ):(<></>)}
                    {(excludedValues.includes(value) ? null : <input type="text" name={value} value={formData[value] || ''} onChange={handleChange} className="imputForm_inputData"/>)}
                </label>
            </div>)}
        </div>
    )
}

export default PrintForm;