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
import TagCard from "./TagCard";
import { getAllTags } from "../../modules/tagManager";

const TagList = () => {
    const[tags, setTags] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const getTags = () => {
        getAllTags().then(taglist => {setTags(taglist)
        console.log(taglist)});
    }

    useEffect(()=> {
        getTags();
    }, [])

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/Tag">Tags</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <React.Fragment>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/Tag/Add">Add Tag</NavLink>
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
                <label style={{width: "5em",marginLeft:".5rem"}}>Edit</label>
                <label style={{width: "5em",marginLeft:".5rem"}}>Remove</label>
            </div>
            {tags.map((tag) => (
                <TagCard tag={tag} key={tag.id} getTags={getTags}/>
                ))}
        </div>
        </div>

</div>
    )
}

export default TagList;