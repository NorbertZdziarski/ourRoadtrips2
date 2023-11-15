import React from 'react';
import {useStoreActions} from "easy-peasy";

const YesOrNot = () => {
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);

    return (
        <div className="yesOrNot">
            <button className="button_yesornot" onClick={()=> setYesOrNot([false,2])}>Yess...</button>
            <button className="button_yesornot" onClick={()=> setYesOrNot([false,1])}>NO !!!</button>
        </div>
    )
}

export default YesOrNot;