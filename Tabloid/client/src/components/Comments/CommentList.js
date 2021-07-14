import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { getAllCommentsByPost } from "../modules/commentManager";

const CommentList = () => {
    const [comments, setComments] = useState([]);
    
    const getComments = () => {
        getAllCommentsByPost().then(comments => setComments(comments));
    };

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        </div>
    );
}

export default CommentList;