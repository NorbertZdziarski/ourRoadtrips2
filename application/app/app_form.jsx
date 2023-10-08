import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/main.scss';
import {fetchData,transferData,updateData,deleteData} from "./a_CRUD_service";
import {useStoreState} from "easy-peasy";

const getInitialFormData = (type,loggedUser) => {

    if (type === 'trip') {
        return {
            tripName: '',
            tripDescription: '',
            tripCar: '',
            tripDate: '',
            tripCountry: '',
            tripType: '',
            tripPhoto: '',
            tripMap: '',
            tripUser: loggedUser.nick,
            tripUserId: loggedUser._id,
            tripSaveDate: new Date()
        };
    } else if (type === 'car') {
        return {
            carId: '',
            carMaker: '',
            carBrand: '',
            carEngine: '',
            carEnginePower: '',
            carStyleType: '',
            carPurposeType: '',
            carPhoto: ''
        };
    } else {
        return {
            nick: '',
            firstName: '',
            lastName: '',
            userDescription:'',
            userPersonalComment:'',
            cars: [],
            email: ''
        };
    }
}

const PrintForm = ({form,formData,setFormData}) => {

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return(
        <div>
            {
                form.map((value) => <div key={value}>

                    <label>
                        {value}:
                        <input type="text" name={value} value={formData[value]} onChange={handleChange} />
                    </label>


                </div>)}
        </div>
    )

}

const MyForm = ({type}) => {
    const [formData, setFormData] = useState({});

    const loggedUser = useStoreState(state => state.loggedUser);

    const countriesInEurope = ["all", "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"];
    const tripTypes = ["all", "recreation", "sightseeing", "extreme"];
    const carsStyleTypes=["all", "car", "bike", "4x4", "camper", "other"];
    const carsPurposeTypes=["all", "daily","classic","forFun"];


    useEffect(() => {
        setFormData(getInitialFormData(type,loggedUser));
    }, [type]);

    let formArr = Object.keys(formData)



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        let dataToSave;
        if (type === 'trip') await transferData(`${type}/add`,formData);
        if (type === 'car') {
            let carsArr = [...loggedUser.cars];

            carsArr.push(formData);
            console.log(carsArr);
            dataToSave = {
                cars: carsArr,
            };
            console.log('Data to save: ' + dataToSave);
            console.log('typ: ' + typeof dataToSave);
            console.log(JSON.stringify(dataToSave, null, 2))
            await updateData(`user/${loggedUser._id}`, dataToSave);
        }
        setFormData(getInitialFormData(type,loggedUser));
    };


    return (
        <form onSubmit={handleSubmit} className="testForm">
            <PrintForm
                form={formArr}
                formData={formData}
                setFormData={setFormData}
            />
            <button type="submit">Wyślij</button>
        </form>
    );
};

export default MyForm;
