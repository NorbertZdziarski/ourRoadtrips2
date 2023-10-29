import React from 'react';
import Comment from "./5_comment";

function ShowComments({tripComments, tripId}) {

    return (
        <section>
            {Object.values(tripComments).map((comm, index)=><Comment
                key={comm.id + index}
                comment={comm}
                author={comm.commUser}
                tripId={tripId}
            />)}
        </section>
    )

}

export default ShowComments;