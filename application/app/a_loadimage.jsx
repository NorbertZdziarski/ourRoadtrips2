import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoadImage = ({ imageName, imageWidth, imagePath, photoClass  }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        if (imagePath && imageName) {

            axios({
                url: `http://192.168.40.4:9000/download`,
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

    window.onload = function() {
        var img = document.querySelector(photoClass);
        if (img.naturalWidth > img.naturalHeight) {
            img.style.width = '100%';
            img.style.height = 'auto';
        } else {
            img.style.height = '100%';
            img.style.width = 'auto';
        }
    };

    return (
        <div>
            {image ? <img src={image} alt={'foto'} width={imageWidth} className={photoClass}/> : <>...loading</>}
        </div>
    );
};

export default LoadImage;
