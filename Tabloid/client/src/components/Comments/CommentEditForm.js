import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editComment, getCommentById } from "../../modules/commentManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const EditComment = () => {
    const [comment, setComment] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const handleInputChange = (evt) => {
        const editedComment = { ...comment };
        let selectedValue = evt.target.value
        editedComment[evt.target.id] = selectedValue
        setComment(editedComment)
    };

    const handleSaveEvent = (evt) => {
        evt.preventDefault();
        if (comment.subject === "" || comment.content === "") {
            window.alert("Please fill in all fields")
        } else {
            editComment(comment)
                .then(() => history.push(`/comment/${comment.postId}`));
        };
    };

    const handleCancelSave = (evt) => {
        evt.preventDefault();
        history.push(`/comment/${comment.postId}`);
    };

    useEffect(() => {
        getCommentById(id).then(setComment)
    }, [id]);

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label>Subject</label>
                    <input type="text"
                        id="subject"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={comment.subject} />
                </FormGroup>
                <FormGroup>
                    <label>Comment</label>
                    <input type="text"
                        id="content"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={comment.content} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSaveEvent}>
                Save Comment
            </Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>
                Cancel
            </Button>
        </Container>
    )
};

export default EditComment;