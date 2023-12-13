import React from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
const DataSort = ({setMoblieMenuClass}) => {
    const setTripSort = useStoreActions(actions => actions.setTripSort);
    const setDataSortOn = useStoreActions(actions => actions.setDataSortOn);
    const tripSort = useStoreState(state => state.tripSort);
    const sortTypes = ["new first", "new last",  "BEST first", "best last", "A - Z", "Z - A"];

    const handleChange = (e) => {
        setTripSort(e.target.value);
        setDataSortOn(false);

    };
    return (<>
        <select value={tripSort} name={'sort'} onChange={handleChange} className="header_dropdown_menu">
            {sortTypes.map((carStyle) => (
                <option key={carStyle} value={carStyle}>
                    {carStyle}
                </option>
            ))}
        </select>
        <button onClick={()=> {
            setMoblieMenuClass('');
            setDataSortOn(false)} }>Cancel</button>
    </>)
}

export default DataSort;