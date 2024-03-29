import React from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
function DataSort({setMoblieMenuClass}) {
    const setTripSort = useStoreActions(actions => actions.setTripSort);
    const setDataSortOn = useStoreActions(actions => actions.setDataSortOn);
    const tripSort = useStoreState(state => state.tripSort);
    const sortTypes = ["new first", "new last",  "BEST first", "best last", "A - Z", "Z - A"];

    const handleChange = (e) => {
        setTripSort(e.target.value);
        setDataSortOn(false);

    };
    return (<>
        <select value={tripSort} name={'sort'} onChange={handleChange} className="button_25p header_dropdown_menu underHeader">
            {sortTypes.map((carStyle) => (
                <option key={carStyle} value={carStyle}>
                    {carStyle}
                </option>
            ))}
        </select>
        <button className='button_25p' onClick={()=> {
            setMoblieMenuClass('');
            setDataSortOn(false)} }>Cancel</button>
    </>)
}

export default DataSort;