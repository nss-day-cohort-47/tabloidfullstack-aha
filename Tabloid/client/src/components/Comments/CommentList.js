import React, { useEffect, useState, useContext } from "react";
import Comment from "./Comment";
import { useParams, Link } from "react-router-dom";
import { PostContext } from "../../modules/PostManager";
import { Button } from "reactstrap";
import { getAllCommentsByPost } from "../../modules/commentManager";

const CommentList = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const { getPostById } = useContext(PostContext);
    const { id } = useParams();
    
    const getPost = () => {
        getPostById(id).then(post => setPost(post));
    }

    const getComments = () => {
        getAllCommentsByPost(id).then(comments => setComments(comments));
    }

    useEffect(() => {
        getPost();
    }, [comments]);

    return (
        <div className="container">
            <Link to={`/posts/${post.id}`}>
                        <strong>{post.title}</strong>
                    </Link>
            <div className="row">
                {post.comments?.map((comment) => (
                    <Comment comment={comment} post={post} getComments={getComments} key={comment.id} />
                ))}
            </div>
            <Link to={`/comment/${post.id}/add`}>
                <Button>Add Comment</Button>
            </Link>
        </div>
    );
}

export default CommentList;