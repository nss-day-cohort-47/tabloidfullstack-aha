import React from 'react';
import { Card, CardBody } from "reactstrap";

export default function UserProfile({ user }) {

    const handleClick = (id, action) => {
        switch (action) {
            case 0:
                alert("Edit User");
                break;
            case 1:
                alert("Delete User");
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
                <button type="button" onClick={() => handleClick(user.id, 0)} style={{width: "5em",marginLeft:".5rem"}}>Edit</button>
                <button type="button" onClick={() => handleClick(user.id, 1)} style={{width: "5em",marginLeft:".5rem"}}>Remove</button>
            </div>
        </CardBody>
    </Card>);
}