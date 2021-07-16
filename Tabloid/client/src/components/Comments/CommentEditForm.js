import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editComment } from "../../modules/commentManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const EditComment = () => {
    const [comment, setComment] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const handleInputChange = (evt) => {
        const editedComment = { ...comment };
        let selectedValue = evt.target.value
        editedTag[evt.target.id] = selectedValue
        setComment(editedComment)
    };

    const handleSaveEvent = (evt) => {
        evt.preventDefault();
        if (comment.subject === "" || commment.content === "") {
            window.alert("Please fill in all fields")
        } else {
            editComment(comment)
                .then(() => history.push(`/comment/${id}`));
        };
    };

    const handleCancelSave = (evt) => {
        evt.preventDefault();
        history.push (`/comment/${id}`);
    };

    useEffect(() => {
        
    })
};

export default EditComment;