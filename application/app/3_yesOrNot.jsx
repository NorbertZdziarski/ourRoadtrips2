import React from 'react';
import {useStoreActions} from "easy-peasy";

const YesOrNot = () => {
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);

    return (
        <div className="yesOrNot">
            <button onClick={()=> setYesOrNot([false,2])}>Yess...</button>
            <button onClick={()=> setYesOrNot([false,1])}>NO !!!</button>
        </div>
    )
}

export default YesOrNot;