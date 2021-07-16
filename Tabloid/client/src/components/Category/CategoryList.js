
import { getAllCategories } from "./../../modules/categoryManager";
import { Category } from "./CategoryCard";
import { useHistory } from "react-router";
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




export const CategoryList = ({category}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const history = useHistory()

  //Every time state is updated, the component will re-render.
  // The initial state is an empty array
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    //runs getAllCategories from the CategoryManager
    //.then takes the results from getAllCategories and puts them into categories (the state variable at the top)
    getAllCategories().then(taco => setCategories(taco));
  };

  //use the useEffect method (imported from react) to run the method you created above (getCategories) and the method getCategories sets the
  //state of categories inside the function
  useEffect(() => {
    getCategories();
  }, [categories]);

  //IF THE DATBASE RETURNS what is a LIST in C#... I AM PRETTY SURE THAT
  //IT IS INTERPRETED AS AN ARRAY IN JAVASCRIPT (like for the .map method)
  return (
    <>
    <h2>CATEGORY MANAGEMENT</h2>
    {/* <button onClick={()=> history.push(`/category/add/${category.id}`)} style={{width: "5em",marginLeft:".5rem"}}>Add Category</button> */}
      <div>
      <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/Tag">Category</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <React.Fragment>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/Category/Add">Add Category</NavLink>
                            </NavItem>
                        </React.Fragment>
                    </Nav>
                </Collapse>
            </Navbar>
          {categories.map(category => 
            <Category category={category} key={category.id} />
          )}
        
      </div>
    </>
  );
};

export default CategoryList;


