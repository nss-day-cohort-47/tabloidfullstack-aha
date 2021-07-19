import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addComment } from "../../modules/commentManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const AddNewComment = () => {
    const { id } = useParams();
    const [comment, setComment] = useState({
        postId: id,
        subject: "",
        content: ""
    });

    const history = useHistory();

    const handleInputChange = (evt) => {
        const newComment = { ...comment }
        let selectedValue = evt.target.value
        newComment[evt.target.id] = selectedValue
        setComment(newComment)
    };

    const handleSaveEvent = (evt) => {
        evt.preventDefault();
        addComment(comment)
            .then(() => history.push(`/comment/${id}`));
    };

    const handleCancelSave = (evt) => {
        evt.preventDefault();
        history.push(`/comment/${id}`)
    };

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
                        placeholder="Subject"
                        value={comment.subject} />
                </FormGroup>
                <FormGroup>
                    <label>Comment</label>
                    <input type="text"
                        id="content"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Comment"
                        value={comment.content} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSaveEvent}>
                Add Comment
            </Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>
                Cancel
            </Button>
        </Container>
    )
};

export default AddNewComment;