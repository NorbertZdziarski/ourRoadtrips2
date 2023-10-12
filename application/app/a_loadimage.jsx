import React, { useState, useEffect } from 'react';
import axios from 'axios';
import path from 'path';

const LoadImage = ({ imageName, imageWidth, imagePath }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        if (imagePath && imageName) {

            axios({
                url: `http://localhost:9000/download`,
                method: 'GET',
                headers: {
                    'my-header': 'all'
                },
                params: {
                    filepath: imagePath,
                    filename: imageName,
                },
                responseType: 'blob',
            }).then((response) => {
                console.log('zapis zdjęcia')
                const url = window.URL.createObjectURL(new Blob([response.data]));
                console.log('url: ' + url)
                setImage(url);
            }).catch((error) => {
                console.error('Błąd podczas żądania:', error);
            });}
    }, [imageName, imagePath]);
    return (
        <div>
            {image ? <img src={image} alt={'foto'} width={imageWidth}/> : <>...loading</>}
        </div>
    );
};

export default LoadImage;
