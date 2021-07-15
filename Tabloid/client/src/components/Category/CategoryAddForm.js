import React, { useState } from "react";
import { useHistory } from "react-router";
import { addCategory } from "../../modules/categoryManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

export const AddNewCategory = () => {
    const [category, setCategory] = useState({
        name: ""
    })

    const history = useHistory();

    const handleInputChange = (event) => {
        const newCategory = { ...category }
        let selectedValue = event.target.value
        newCategory[event.target.id] = selectedValue
        setCategory(newCategory)
    }
    const handleSaveEvent = (click) => {
        click.preventDefault()
        if (category.name === "") {
            window.alert("Please fill in all fields")
        } else {
            addCategory(category)
                .then(() => history.push('/category'))
        }

    }
    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push('/category')
    }

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label>Category Name</label>
                    <input type="text"
                        id="name"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Name"
                        value={category.name} />
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

export default AddNewCategory;