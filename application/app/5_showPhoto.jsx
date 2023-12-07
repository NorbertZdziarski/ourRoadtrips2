import LoadImage from "./a_loadimage";
import React from "react";

function ShowPhoto({photo, style, source}) {
    let path = 'images/' + source
    console.log('ścieżka: ' + path)
    console.log('photo: ' + photo)
    if (typeof photo !== 'string') return (<>
        <LoadImage imageName={photo[0]}
                   imagePath={path}
                   photoClass={style} />
    </>)
    return (<>
        <LoadImage imageName={photo}
                   imagePath={path}
                   photoClass={style} />
    </>)

}

export default ShowPhoto