import React from "react";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment, post }) => {
    return (
        <Card>
            <p>{comment.userProfile.displayName} said:</p>
            <CardBody>
                <h4>Subject: {comment.subject}</h4>
                <p>{comment.content}</p>
            </CardBody>
        </Card>
    )
};

export default Comment;