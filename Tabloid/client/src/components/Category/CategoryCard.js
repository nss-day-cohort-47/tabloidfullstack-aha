import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { deleteCategory, getAllCategories } from "../../modules/categoryManager";
import { useHistory } from "react-router";
import { AddNewCategory } from "./CategoryAddForm";

export const Category = ({ category }) => {

    const history = useHistory()

    const deletecategory = (evt) => {
        evt.preventDefault() 
        var result = window.confirm(`Are you sure you want to delete ${category.name}?`);
        if (result) {
            deleteCategory(category.id).then(()=> getAllCategories())
        }
    }

 

  return (
   

<Card>
<CardBody>
<div className="CategoryList">
<label style={{width: "10em"}}>{category.name} </label>
<button onClick={()=> history.push(`/category/edit/${category.id}`)} style={{width: "5em",marginLeft:".5rem"}}>Edit</button>
<button onClick={deletecategory} style={{width: "5em",marginLeft:".5rem"}}>Delete</button>
    </div>
</CardBody>
</Card>
  );
};
//when you are exporting a single thing do this:
// export default Category; <--- at the very bottom of the page
//otherwise export up top