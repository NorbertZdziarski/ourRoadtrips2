import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/main.scss';
import transferData from "./a_post";
const getInitialFormData = (type) => {
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
            tripUser: '',
            tripSaveDate: new Date()
        };
    } else {
        return {
            nick: '',
            firstName: '',
            lastName: '',
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
    const formTrip = ['tripName','tripDescription','tripCar','tripDate','tripCountry','tripType','tripPhoto'];

    useEffect(() => {
        setFormData(getInitialFormData(type));
    }, [type]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        transferData(`${type}/add`,formData);
        setFormData(getInitialFormData(type));
    };


    return (
        <form onSubmit={handleSubmit} className="testForm">
            <PrintForm
                form={formTrip}
                formData={formData}
                setFormData={setFormData}
            />
            <button type="submit">Wyślij</button>
        </form>
    );
};

export default MyForm;
