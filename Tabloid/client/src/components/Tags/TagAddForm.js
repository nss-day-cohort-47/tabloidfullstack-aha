import React, { useState } from "react";
import { useHistory } from "react-router";
import { addTag } from "../../modules/tagManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const AddNewTag = () => {
    const [tag, setTag] = useState({
        name: ""
    })

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
            console.log(tag)
            addTag(tag)
                .then(() => history.push('/tag'))
        }

    }
    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push('/tag')
    }

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
                        placeholder="Name"
                        value={tag.name} />
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

export default AddNewTag;