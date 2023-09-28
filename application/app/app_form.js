import React, { useState } from 'react';
import axios from 'axios';
import './../css/app.scss';

const MyForm = () => {
    const [formData, setFormData] = useState({
        nick: '',
        firstName: '',
        lastName: '',
        email: '',
       });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams();
            for (const key in formData) {
                params.append(key, formData[key]);
            }
            const response = await axios.post('http://localhost:9000/user/add', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'my-header': 'all'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Błąd podczas wysyłania danych:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="testForm">
            <p>Add new user:</p>
            <label>
                nick:
                <input type="text" name="nick" value={formData.nick} onChange={handleChange} />
            </label>
            <label>
                Imię:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </label>
            <label>
                Nazwisko:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>

            <button type="submit">Wyślij</button>
        </form>
    );
};

export default MyForm;
