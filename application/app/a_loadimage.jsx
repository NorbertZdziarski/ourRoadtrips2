import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useStoreActions} from "easy-peasy";
import Anim_loading from "./anim_loading";
require('dotenv').config();


function LoadImage({ imageName, imageWidth, imagePath, photoClass,perspectiveStyle ,imgProportions=true }) {
    const [image, setImage] = useState('');
    const host = process.env.SERVER_HOST || '--localhost';
    const port = process.env.SERVER_PORT || 9000
    const apiURL = `https://${host}:${port}/download`;
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);
    // const apiURL = `http://${host}:${port}/download`;
    //
    // console.log('---------- LOAD IMAGE ---------')
    // console.log('image name: ' + imageName )
    // console.log(typeof imageName )
    if (!imageName) {
        imageName = 'noimage.jpg'
        imagePath = 'images/'
    }
    if (typeof imageName !== 'string') return <>error</>;
    useEffect(() => {
        if (!imageName) return;
        setShowLoading([true,0]);
        console.log(' image name : ' + imageName)
        if (imageName.substring(0,4) === 'http') {
            imagePath=null;
            setImage(imageName);
        }
        if (imagePath && imageName) {
        // console.log('image path: ' + imagePath);
        // console.log('image name: ' + imageName)
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
                setShowLoading([false,0]);
                setImage(url);
            }).catch((error) => {
                setShowLoading([false,0]);
                console.error('Błąd podczas żądania:', error);
            });}

    }, [imageName, imagePath]);

    if (imgProportions) {
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
// console.log('image ' + image)
    return (
        <div className={perspectiveStyle}>
            {image ? <>
                <img src={image} alt={'foto'} width={imageWidth} className={photoClass}/>
            </>: <div className={'divHeightTemp divWidthTemp'}><Anim_loading size={'_m'}/></div>}

        </div>
    );
};

export default LoadImage;
