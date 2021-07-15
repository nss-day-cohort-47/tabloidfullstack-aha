import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { editUser, getUserById } from "../../modules/userManager";
import { Form, FormGroup, Button, Container, Label, Input } from "reactstrap";

const UserProfileForm = () => {
    const [user, setUser] = useState({})
    const { id } = useParams();

    const history = useHistory();


    const handleInputChange = (event) => {
        const newUser = { ...user }
        let selectedValue = event.target.value
        newUser[event.target.id] = selectedValue
        setUser(newUser)
    }
    const handleSaveEvent = (click) => {
        click.preventDefault()
        if (user.name === "") {
            window.alert("Please fill in all fields")
        } else {
            editUser(user)
                .then(() => history.push('/userprofile'))
        }

    }
    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push('/userprofile')
    }
    useEffect(() => {
        getUserById(id).then(setUser)
    }, [id])

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label>First Name</label>
                    <input type="text"
                        id="firstName"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={user.firstName} />
                    <label>Last Name</label>
                    <input type="text"
                        id="lastName"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={user.lastName} />
                    <label>Diplay Name</label>
                    <input type="text"
                        id="displayName"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={user.displayName} />
                </FormGroup>
                <FormGroup>
                    <label>Diplay Name</label>
                    <input type="text"
                        id="email"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={user.email} />


                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Select</Label>
                    <Input type="select" 
                           name="select" 
                           id="userType"
                           onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className="form-control"
                            defaultValue={user.email} >
                        <option>Author</option>
                        <option>Admin</option>
                    </Input>
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