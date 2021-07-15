import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {GetAllUsers} from "./../../modules/UserProfileManager"
import UserProfile from './UserProfile';

export default function UserProfileList() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [users, setUsers] = useState([]);

  const getUsers = () => {
    GetAllUsers().then(users => setUsers(users));
  };

  useEffect(() => {
    getUsers();
  }, []);

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/UserProfile">Users</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <React.Fragment>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/UserProfile/Add">Add User</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/UserProfile/Search">Search for user</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/">Close</NavLink>
                            </NavItem>
                        </React.Fragment>
                    </Nav>
                </Collapse>
            </Navbar>
            <div>
            <div>
            <div className="UserList">
                <label style={{width: "12em"}}>Name </label>
                <label style={{width: "14em", marginLeft:".5rem"}}>Display Name</label>
                <label style={{width: "5em",marginLeft:".5rem"}}>Edit</label>
                <label style={{width: "5em",marginLeft:".5rem"}}>Remove</label>
            </div>
        {users.map((user) => (
          <UserProfile user={user} key={user.id} />
        ))}
    </div>
            </div>

        </div>
    );
}