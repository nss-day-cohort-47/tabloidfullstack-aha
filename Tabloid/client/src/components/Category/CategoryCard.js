import React from "react";
import { Card, CardBody } from "reactstrap";


export const Category = ({ category }) => {
  return (
    <Card>
    
      <CardBody>
        <div>
         <li>{category.name}</li>
        </div>

      </CardBody>
    </Card>
  );
};
//when you are exporting a single thing do this:
// export default Category;