import React from "react";
import { useHistory } from "react-router-dom";
import { deleteComment } from "../../modules/commentManager";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment, post, getComments }) => {
    const history = useHistory();
    const deleteCommentOnPost = (evt) => {
        evt.preventDefault();
        const result = window.confirm("Are you sure you want to delete your comment?");
        if (result) {
            deleteComment(comment.id).then(() => getComments(post.id));
        };
    }
    return (
        <Card>
            <CardBody>
                <div className="CommentList">
                    <label style={{ width: "10em" }}>{comment.userProfile.displayName} said:</label>
                    <h6>Subject: {comment.subject}</h6>
                    <p>{comment.content}</p>
                    <button onClick={() => history.push(`/comment/edit/${comment.id}`)} style={{width: "5em",marginLeft:".5rem"}}>Edit</button>
                    <button onClick={deleteCommentOnPost} style={{width: "5em", marginLeft:".5rem"}}>Delete</button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Comment;