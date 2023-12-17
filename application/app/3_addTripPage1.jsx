import React, { useState, useEffect} from 'react';

const AddTripPage1 = () => {
    const countriesInEurope = ["all", "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"];
    return (<>

            <div>
                page 1
                <select value={formData[value]} name={value} onChange={handleChange} className="">
                    {countriesInEurope.map((country) => (
                        <option key={country} value={country} >
                            {country}
                        </option>
                <div className="imputForm_visibility">
                    <div className="imputForm_visibility_txt">{stan ? 'will not be displayed' : 'visible on main page'}</div>
                    <button type="button" className="main_button" onClick={zmienStan}>change visibility</button>
                </div>
                <textarea
                    name={value}
                    value={formData[value] || ''}
                    onChange={handleChange}
                    maxLength='2000'
                    rows="3"
                    className="imputForm_inputData"
                />
                <input type="text" name={value} value={formData[value] || ''} onChange={handleChange} className="imputForm_inputData"/>
            </div>

    </>)
}

export default AddTripPage1;