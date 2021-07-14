import React, { useEffect, useState } from "react";
import { getAllCategories } from "./../../modules/categoryManager";
import { Category } from "./CategoryCard";

export const CategoryList = () => {
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
      <div>
    
          {categories.map(category => 
            <Category category={category} key={category.id} />
          )}
        
      </div>
    </>
  );
};

export default CategoryList;


// {collections.map(collection =>
//     <CollectionCard key={collection.id} collection={collection}/>
//     )
//   }