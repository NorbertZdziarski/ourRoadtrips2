import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoadImage = ({ imageName, imageWidth, imagePath, photoClass,perspectiveStyle ,imgProporcion=true }) => {
    const [image, setImage] = useState('');
    const host = 'localhost';
    const port = 9000
    const apiURL = `http://${host}:${port}/download`;

    useEffect(() => {
        if (imagePath && imageName) {

            axios({
                url: apiURL,
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
                const url = window.URL.createObjectURL(new Blob([response.data]));
                setImage(url);
            }).catch((error) => {
                console.error('Błąd podczas żądania:', error);
            });}
    }, [imageName, imagePath]);

    if (imgProporcion) {
        window.onload = function() {
            var img = document.querySelector(photoClass);
            if (img.naturalWidth > img.naturalHeight) {
                img.style.width = '100%';
                img.style.height = 'auto';
            } else {
                img.style.height = '100%';
                img.style.width = 'auto';
            }
        };}
console.log(imgProporcion)
    return (
        <div className={perspectiveStyle}>
            {image ? <>
                <img src={image} alt={'foto'} width={imageWidth} className={photoClass}/>
            </>: <>...loading</>}

        </div>
    );
};

export default LoadImage;
