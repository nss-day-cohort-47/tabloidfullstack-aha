import React from "react";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment }) => {
    return (
        <Card>
            <CardBody>
                <h4>Subject: {comment.subject}</h4>
                <p>{comment.content}</p>
            </CardBody>
        </Card>
    )
};

export default Comment;