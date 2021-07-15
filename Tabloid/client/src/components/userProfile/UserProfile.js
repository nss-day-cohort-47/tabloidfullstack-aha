import React from 'react';
import { Card, CardBody } from "reactstrap";
import {GetAllUsers, DeleteUser} from "../../modules/userManager";

export default function UserProfile({ user, getUsers }) {

    const handleClick = (user, action) => {
        switch (action) {
            case 0:
                alert("Edit User");
                break;
            case 1:
                var result = window.confirm(`Are you sure you want to delete ${user.fullName}?`);
                if (result) {
                    DeleteUser(user.id).then(()=> getUsers())
                }
                break;
            default:
            // do nothing
        }

    }
    return (<Card>
        <CardBody>
            <div className="UserList">
                <label style={{width: "12em"}}>{user.fullName} </label>
                <label style={{width: "12em", marginLeft:".5rem"}}>{user.displayName}</label>
                <button type="button" onClick={() => handleClick(user, 0)} style={{width: "5em",marginLeft:".5rem"}}>Edit</button>
                <button type="button" onClick={() => handleClick(user, 1)} style={{width: "5em",marginLeft:".5rem"}}>Remove</button>
            </div>
        </CardBody>
    </Card>);
}