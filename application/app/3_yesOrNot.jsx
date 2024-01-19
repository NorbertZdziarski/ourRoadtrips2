import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";

function YesOrNot() {
    let alert;

    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);
    const displayStyles = useStoreState(state => state.displayStyles);
    const yesOrNot = useStoreState(state => state.yesOrNot);

    if (yesOrNot[2]) alert = yesOrNot[2]

    return (
        <div className={`yesOrNot colorStyle_yesornot_${displayStyles}`}>
            <div className={'alertLine'}></div>
            {alert ? <p>{alert}</p> : null}
            <div>
                {alert ? <button className="button_yesornot" onClick={()=> setYesOrNot([false,1])}> ok </button> : <>
                    <button className="button_yesornot" onClick={()=> setYesOrNot([false,2])}>Yes.</button>
                    <button className="button_yesornot" onClick={()=> setYesOrNot([false,1])}>NO !</button>
                    </>}
            </div>
            <div className={'alertLine'}></div>
        </div>
    )
}

export default YesOrNot;