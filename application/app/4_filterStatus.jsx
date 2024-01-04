import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";

function FilterStaus({setFilterBar}) {
    const dataFilter = useStoreState(state => state.dataFilter);
    const setDataFilter = useStoreActions(actions => actions.setDataFilter);

    return (<div className='layout_grid3'>
        <p> country: {dataFilter[1]} </p>
        <p> type of trip:  {dataFilter[2]} </p>
        <p> vehicle type: {dataFilter[3]} </p>
        <button
            onClick={()=> {
                // setMoblieMenuClass('');
                setDataFilter([false,'all','all','all'])
                setFilterBar(false)
            }}
        > reset filter </button>
    </div>)
}

export default FilterStaus;