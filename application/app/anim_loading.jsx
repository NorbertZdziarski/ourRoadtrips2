import React from 'react';
import {useStoreState} from "easy-peasy";


const Anim_loading = ({size}) => {
    const showLoading = useStoreState(state => state.showLoading);

// let size = '';
// if (showLoading[1] === 1) {size = '_m'}
//     {`symbol_loading${size}`}
    return (
        <>
            <div className={`symbol_loading${size}`}></div>
        </>
    )
}

export default Anim_loading;