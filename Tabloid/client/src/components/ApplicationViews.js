import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CommentList from "./Comments/CommentList";
import CategoryList from "./Category/CategoryList";

import PostList from './posts/PostList';
import { PostDetails } from './posts/PostDetails';

import UserProfileList from "./userProfile/UserProfileList";

import TagList from "./Tags/TagList";
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

        <Route path="/comment/:postId">
          <CommentList />
        </Route>

        <Route path="/category">
          <CategoryList />
           </Route>

        <Route path="/tag">
          <TagList />
        </Route>

      </Switch>
    </main>
  );
}
