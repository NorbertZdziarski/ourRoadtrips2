import React, {useState} from 'react';

function AddComment({author, tripId}) {
    console.log(author)
const [enterComment, setEnterComment] = useState();
    return (
        <div className="showtrip_addComment">
            <div className="comment_conteiner">
                <div className="comment_photo">
                    photo
                </div>
                <div className="addComment_cloud">
                    <textarea className="comment_message" Value={enterComment} onChange={(e)=>{setEnterComment(e)}}/>

                    <p className="comment_author"> wrewrwe {author.nick}</p>
                </div>
            </div>
            <button>send</button>
            <button>cancel</button>
        </div>

    )

}

export default AddComment;