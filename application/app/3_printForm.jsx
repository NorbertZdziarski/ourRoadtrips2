import React, { useState } from 'react';
import '../css/main.scss';
const PrintForm = ({form,formData,usersCars,setFormData, setFile}) => {
    const countriesInEurope = ["all", "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"];
    const tripTypes = ["all", "recreation", "sightseeing", "extreme"];
    const carsStyleTypes=["all", "car", "bike", "4x4", "camper", "other"];
    const carsPurposeTypes=["all", "daily", "classic", "forFun"];
    const carsEngineFuelType=["petrol", "electric","hybrid","diesel", "other"];

    const excludedValues = ['tripType', 'tripCountry', 'carStyleType', 'carPurposeType', 'carPhoto','tripPhoto','tripCar', 'tripPublic','tripRate','tripComments', 'cars'];
    const [stan, setStan] = useState(true);

    const zmienStan = () => {
        setStan(!stan);
        setFormData({ ...formData, tripPublic: stan })
    };

    function handleFileChange(event) {
        let fileUpload = (event.target.files[0]);
        setFile(fileUpload)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return(
        <div>
            {form.map((value) => <div key={`line${value}`}>
                {/*// ----------------------------------- rodzaj paliwa, areatext do opisu*/}
                <label>
                    <p>{value}:</p>
                    {(value === 'tripCountry') ? <select value={formData[value]} name={value} onChange={handleChange} className="">
                        {countriesInEurope.map((country) => (
                            <option key={country} value={country} className="testDataImport">
                                {country}
                            </option>
                        ))}
                    </select> : <></>}
                    {(value === 'tripType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {tripTypes.map((triptype) => (
                            <option key={triptype} value={triptype} className="testDataImport">
                                {triptype}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'carStyleType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {carsStyleTypes.map((carStyle) => (
                            <option key={carStyle} value={carStyle} className="testDataImport">
                                {carStyle}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'tripCar')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {usersCars.map((tripCar) => (
                            <option key={tripCar} value={tripCar} className="testDataImport">
                                {tripCar}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'carPurposeType')?(<select value={formData[value]} name={value} onChange={handleChange} className="">
                        {carsPurposeTypes.map((carsPurpose) => (
                            <option key={carsPurpose} value={carsPurpose} className="testDataImport">
                                {carsPurpose}
                            </option>
                        ))}
                    </select>):(<></>)}
                    {(value === 'tripPublic')?(
                        <div>
                            <p>Aktualny stan: {stan ? 'will not be displayed' : 'visible on main page'}</p>
                            <button onClick={zmienStan}>change visibility</button>
                        </div>
                    ):(<></>)}
                    {(value === 'carPhoto')?(
                        <input type="file" onChange={handleFileChange} />
                    ):(<></>)}
                    {(value === 'tripPhoto')?(
                        <input type="file" onChange={handleFileChange} />
                    ):(<></>)}

                    {(excludedValues.includes(value) ? <></> : <input type="text" name={value} value={formData[value] || ''} onChange={handleChange} />)}
                </label>
            </div>)}
        </div>
    )
}

export default PrintForm;