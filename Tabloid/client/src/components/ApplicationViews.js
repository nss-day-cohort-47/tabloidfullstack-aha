import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CommentList from "./Comments/CommentList";
import AddNewComment from "./Comments/CommentForm";
import TagList from "./Tags/TagList";
import AddNewTag from "./Tags/TagAddForm";
import TagEditForm from "./Tags/TagEditForm";
import CategoryList from "./Category/CategoryList";
import PostList from "./posts/PostList";
import { PostDetails } from "./posts/PostDetails";
import UserProfileList from "./userProfile/UserProfileList";
import MyPosts from "./posts/MyPosts";
import AddNewCategory from "./Category/CategoryAddForm";
import CategoryEditForm from "./Category/CategoryEditForm";
import PostTagList from "./posts/PostTagList";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/MyPosts" exact>
          <MyPosts />
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>


        

        <Route path="/posts/tag/:id" exact>
          {isLoggedIn ? <PostTagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/UserProfile">  
        {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}        

        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>


        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/add">
          {isLoggedIn ? <AddNewCategory /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/edit/:id">
          {isLoggedIn ? <CategoryEditForm /> : <Redirect to="/login" />}
        </Route>

       


        <Route path="/comment/:id" exact>
          <CommentList />
        </Route>

        <Route path="/comment/:id/add">
          <AddNewComment />
        </Route>
        

        <Route path="/tag" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/add">
          {isLoggedIn ? <AddNewTag /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/edit/:id">
          {isLoggedIn ? <TagEditForm /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
}
