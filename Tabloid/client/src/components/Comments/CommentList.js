import React, { useEffect, useState, useContext } from "react";
import Comment from "./Comment";
import { useParams, Link } from "react-router-dom";
import { PostContext } from "../../modules/PostManager";

const CommentList = () => {
    const [post, setPost] = useState({});
    const { getPostById } = useContext(PostContext);
    const { id } = useParams();
    
    const getPost = () => {
        getPostById(id).then(post => setPost(post));
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div className="container">
            <Link to={`/posts/${post.id}`}>
                        <strong>{post.title}</strong>
                    </Link>
            <div className="row">
                {post.comments?.map((comment) => (
                    <Comment comment={comment} key={comment.postId} />
                ))}
            </div>
        </div>
    );
}

export default CommentList;