import LoadImage from "./a_loadimage";
import React, {useState} from "react";

function ShowPhotoSlide({photo, style}) {

    if (typeof photo === 'string') return (<div className="imageBox" >
        <LoadImage imageName={photo}
                   imagePath='images/trips'
                   photoClass={style} />
        </div>)

    const [photoNr, setPhotoNr] = useState(0)


    const fnBtnLeft = () => {
        if (photoNr > 0) {setPhotoNr( prevNr => prevNr -1)} else {setPhotoNr((photo.length-1))}
    }
    const fnBtnRight = () => {
        if (photoNr < (photo.length -1)) {setPhotoNr(prevNr => prevNr +1)} else {setPhotoNr(0)}
        }

    return (<div className="imageBox" >
        <button onClick={fnBtnLeft} className="imageBox_btn_L"> lewo </button>
        <LoadImage imageName={photo[photoNr]}
                   imagePath='images/trips'
                   photoClass={style} />
        <button onClick={fnBtnRight} className="imageBox_btn_R"> prawo</button>
    </div>)
}

export default ShowPhotoSlide;