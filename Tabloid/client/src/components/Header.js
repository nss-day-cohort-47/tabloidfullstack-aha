import React, { useContext, useState } from 'react';
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
import { logout } from '../modules/authManager';
import { UserProfileContext } from '../modules/postUserProfileManager';
import thing from "./lb.png"
import "./Hello.css";

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { currentUserId } = useContext(UserProfileContext);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <img src={thing}  className="small" alt="user img"/>
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&

              <React.Fragment>

                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                
                <NavItem>
                  <NavLink tag={RRNavLink} to="/category">Category Management</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RRNavLink} to="/UserProfile">Users</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/posts">
                    Posts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink} to={`/posts/myposts/`}>
                    My Posts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink} to={`/tag`}>
                    Tags
                  </NavLink>
                </NavItem>
              </React.Fragment>


            }

          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>

              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
