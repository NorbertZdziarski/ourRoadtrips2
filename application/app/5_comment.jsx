import React from 'react';

function Comment({message, author, photo}) {

    return (
        <div className="comment_conteiner">
            <div className="comment_photo">
                photo
            </div>
            <div className="comment_cloud">
                <textarea className="comment_message">{message}</textarea>
                <p className="comment_author">{author}</p>
            </div>
        </div>
    )

}

export default Comment;