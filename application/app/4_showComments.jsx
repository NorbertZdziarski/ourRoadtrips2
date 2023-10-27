import React from 'react';
import Comment from "./5_comment";

function ShowComments({tripComments}) {

    return (
        <section>
            {Object.values(tripComments).map((comm)=><Comment
                key={comm.id}
                message={comm.commTxt}
                author={comm.commUser}
            />)}
        </section>
    )

}

export default ShowComments;