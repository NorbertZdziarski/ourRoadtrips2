import LoadImage from "./a_loadimage";
import React, {useState} from "react";
import btnImgL from '../images/1904658-arrow-arrow-left-change-direction-left-next-undo_122508.png'
import btnImgR from '../images/1904671-arrow-arrow-right-change-direction-next-page-right_122521.png'

function ShowPhotoSlide({photo, style, photoPath='images/trips'}) {
    if (!photo) {
        photo = 'noimage.jpg'
        photoPath = 'images/'
    }
    if (typeof photo === 'string') return (<div className="imageBox" >
        <LoadImage imageName={photo}
                   imagePath={photoPath}
                   photoClass={style} />
        </div>)

    const [photoNr, setPhotoNr] = useState(0);


    const fnBtnLeft = () => {
        if (photoNr > 0) {setPhotoNr( prevNr => prevNr -1)} else {setPhotoNr(photo.length-1)}
    }
    const fnBtnRight = () => {
        if (photoNr < (photo.length -1)) {setPhotoNr(prevNr => prevNr +1)} else {setPhotoNr(0)}
        }

    return (<div className="imageBox" >
        <button onClick={fnBtnLeft} className="imageBox_btn_L"> <img src={btnImgL} className="btnarrow"/> </button>
            <LoadImage imageName={photo[photoNr]}
                       imagePath={photoPath}
                       photoClass={style} />
        <button onClick={fnBtnRight} className="imageBox_btn_R"> <img src={btnImgR} className="btnarrow"/> </button>
    </div>)
}

export default ShowPhotoSlide;