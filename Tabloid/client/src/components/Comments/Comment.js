import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
    return (
        <Card>
            <CardBody>
                <div>
                    Subject: {comment.subject}
                </div>
            </CardBody>
        </Card>
    )
}