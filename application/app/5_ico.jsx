import React, {useState} from 'react';
import logourl from "../images/logo_m.png";
import icotheme from "../images/color-palette_6591234.png";
import icomap from "../images/map.png";
import icolist from "../images/list_tasks_to_do_list_icon_233416.png";
import icohome from "../images/home_house_icon_143764.png";
import icogroup from "../images/people.png";
import icocars from "../images/cars.png";
import icoenvelope from "../images/envelope.png";
import {useStoreState} from "easy-peasy";
function InsertIco({icoName}) {
    const displayStyles = useStoreState(state => state.displayStyles);
    const [icoStyle, setIcoStyle] = useState();

    if (icoName === '') {

    } else {

    }
    return (<>
        <img src={`${icoName}`} className={`header_ico ico_${displayStyles}`}/>
    </>)
}

export default InsertIco;