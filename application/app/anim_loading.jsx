import React from 'react';

function Anim_loading({size=''}) {

// let size = '';
// if (showLoading[1] === 1) {size = '_m'}
//     {`symbol_loading${size}`}
    console.log(' anim loading ')
    return (
        <>
            <div className={`symbol_loading${size}`}></div>
        </>
    )
}

export default Anim_loading;