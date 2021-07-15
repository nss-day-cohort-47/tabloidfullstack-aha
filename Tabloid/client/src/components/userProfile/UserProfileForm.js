import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { editTag, getTagById } from "../../modules/tagManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const UserProfileForm = () => {
    const [tag, setTag] = useState({})
    const { id } = useParams();

    const history = useHistory();


    const handleInputChange = (event) => {
        const newTag = { ...tag }
        let selectedValue = event.target.value
        newTag[event.target.id] = selectedValue
        setTag(newTag)
    }
    const handleSaveEvent = (click) => {
        click.preventDefault()
        if (tag.name === "") {
            window.alert("Please fill in all fields")
        } else {
            editTag(tag)
                .then(() => history.push('/userprofile'))
        }

    }
    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push('/userprofile')
    }
    useEffect(()=> {
        getTagById(id).then(setTag)
    },[id])

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label>Tag Name</label>
                    <input type="text"
                        id="name"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={tag.name} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSaveEvent}>
                Save Entry
            </Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>
                Cancel
            </Button>
        </Container>
    )
}

export default UserProfileForm;