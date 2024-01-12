import React from 'react';

function Alert({allertMessage}) {

    return (<main>
        <div>
            <p>{allertMessage}</p>
            <button> ok </button>
        </div>
    </main>)
}
export default Alert;