import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";

const YesOrNot = () => {
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);
    const displayStyles = useStoreState(state => state.displayStyles);

    return (
        <div className={`yesOrNot colorStyle_yesornot_${displayStyles}`}>
            <button className="button_yesornot" onClick={()=> setYesOrNot([false,2])}>Yess...</button>
            <button className="button_yesornot" onClick={()=> setYesOrNot([false,1])}>NO !!!</button>
        </div>
    )
}

export default YesOrNot;