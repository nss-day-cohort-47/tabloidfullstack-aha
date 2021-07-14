import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import TagList from "./Tags/TagList";
import AddNewTag from "./Tags/TagAddForm";
import TagEditForm from "./Tags/TagEditForm";

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/tag" exact>
          <TagList />
        </Route>

        <Route path="/tag/add">
          <AddNewTag />
        </Route>

        <Route path="/tag/edit/:id">
          {isLoggedIn ? <TagEditForm /> : <Redirect to="/login" />}
        </Route>

      </Switch>
    </main>
  );
};
