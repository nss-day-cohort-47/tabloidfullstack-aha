import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CategoryList from "./Category/CategoryList";
import PostList from './posts/PostList';
import { PostDetails } from './posts/PostDetails';
import UserProfileList from "./userProfile/UserProfileList";
import TagList from "./Tags/TagList";
import AddNewCategory from "./Category/CategoryAddForm";
import CategoryEditForm from "./Category/CategoryEditForm";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/myposts/:id">
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/UserProfile">          
          <UserProfileList />
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

        <Route path="/tag">
          <TagList />
        </Route>

      </Switch>
    </main>
  );
}
