import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/main.scss';
import transferData from "./a_post";

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
        if (type === 'trip') {
            setFormData({
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
            });
        } else {
            setFormData({
                nick: '',
                firstName: '',
                lastName: '',
                email: '',
            });
        }
    }, [type]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        transferData(`${type}/add`,formData);
        if (type === 'trip') {
            setFormData({
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
            });
        } else {
            setFormData({
                nick: '',
                firstName: '',
                lastName: '',
                email: '',
            });
        }
    };


    return (
        <form onSubmit={handleSubmit} className="testForm">
            <PrintForm
                form={formTrip}
                formData={formData}
                setFormData={setFormData}
            />
            <p>Add new {type}: </p>

            <button type="submit">Wyślij</button>
        </form>
    );
};

export default MyForm;
