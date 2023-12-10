import React, {useState} from 'react';
import {useStoreActions} from "easy-peasy";

const DataFilter = () => {

    const setDataFilter = useStoreActions(actions => actions.setDataFilter);

    const [selectCountry, setSelectCountry] = useState("choose a country")
    const [choiceTripType, setChoiceTripType] = useState("select the type of trip")
    const [choiceStyleTypes, setChoiceStyleTypes] = useState("select vehicle type")
    const [choiceCarType, setChoiceCarType] = useState("all")

    const countriesInEurope = ["all", "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"];
    const tripTypes = ["all", "recreation", "sightseeing", "extreme"];
    const carsStyleTypes=["all", "car", "bike", "4x4", "camper", "other"];
    const acceptFn = (event) => {
        event.preventDefault()
        console.log(selectCountry,choiceTripType,choiceStyleTypes)
        setDataFilter([false,selectCountry,choiceTripType,choiceStyleTypes ])
    }

    return (
        <div className="">
        {/*<div className="yesOrNot">*/}
            <form>
                <select value={selectCountry} onChange={(event) => setSelectCountry(event.target.value)} className="header_dropdown_menu">
                    <option value="choose a country" disabled={selectCountry !== "choose a country"}>choose a country</option>
                    {countriesInEurope.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>

                <select value={choiceTripType} name={choiceTripType} onChange={()=>setChoiceTripType(event.target.value)} className="header_dropdown_menu">
                    <option value="select the type of trip" disabled={selectCountry !== "select the type of trip"}>select the type of trip</option>
                    {tripTypes.map((triptype) => (
                        <option key={triptype} value={triptype} >
                            {triptype}
                        </option>
                    ))}
                </select>
                <select value={choiceStyleTypes} name={choiceStyleTypes} onChange={()=>setChoiceStyleTypes(event.target.value)} className="header_dropdown_menu">
                    <option value="select vehicle type" disabled={selectCountry !== "select vehicle type"}>select vehicle type</option>
                    {carsStyleTypes.map((carStyle) => (
                        <option key={carStyle} value={carStyle} >
                            {carStyle}
                        </option>
                    ))}
                </select>

                <button onClick={(e)=> acceptFn(e.target) }>Accept</button>
                <button onClick={()=> setDataFilter([false,selectCountry,choiceTripType,choiceStyleTypes ])}>Cancel</button>
            </form>
        </div>
    )
}

export default DataFilter;