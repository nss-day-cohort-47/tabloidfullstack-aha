import React from 'react';
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router";
import { GetAllUsers, DeleteUser, activateUser } from "../../modules/userManager";
import { Route } from "react-router-dom";
import {CategoryList} from "../Category/CategoryList"

export default function UserProfile({ user, getUsers }) {
    const history = useHistory();
    const getDetail = () => {
        history.push(`userprofile/${user.id}`)
    }
    const handleClick = (user, action) => {
        switch (action) {
            case 0:
                history.push(`/userprofile/edit/${user.id}`)
                break;
            case 1:
                var result = window.confirm(`Are you sure you want to delete ${user.fullName}?`);
                if (result) {
                    DeleteUser(user.id).then(() => getUsers())
                }
                break;
            case 2:
                result = window.confirm(`Are you sure you want to ReActivate ${user.fullName}?`);
                if (result) {
                    activateUser(user.id).then(() => getUsers())
                }
                break;
            default:
            // do nothing
        }

    }
    return (
        <Card>
            <CardBody>
                <div className="UserList">
                    <a href="#" onClick={()=>getDetail()}><label style={{ width: "12em" }}>{user.fullName} </label></a>
                    <label style={{ width: "12em", marginLeft: ".5rem" }}>{user.displayName}</label>
                    <button type="button" onClick={() => handleClick(user, 0)} style={{ width: "5em", marginLeft: ".5rem" }}>Edit</button>
                    {!user.isDeleted && <button type="button" onClick={() => handleClick(user, 1)} style={{ width: "5em", marginLeft: ".5rem" }}>De-Activate</button>}
                    {user.isDeleted && <button type="button" onClick={() => handleClick(user, 2)} style={{ width: "5em", marginLeft: ".5rem" }}>Activate</button>}
                </div>
            </CardBody>
        </Card>);
}