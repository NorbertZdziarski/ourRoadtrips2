import LoadImage from "./a_loadimage";
import React from "react";

function ShowPhoto({photo, style}) {
    if (typeof photo !== 'string') return (<>
        <LoadImage imageName={photo[0]}
                   imagePath='images/trips'
                   photoClass={style} />
    </>)
    return (<>
        <LoadImage imageName={photo}
                   imagePath='images/trips'
                   photoClass={style} />
    </>)

}

export default ShowPhoto