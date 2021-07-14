import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import { UserProfileProvider } from "./modules/UserProfileManager";
import { PostManager } from "./modules/PostManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
       <UserProfileProvider>
        <PostManager>
      <Header isLoggedIn={isLoggedIn}/>
      <ApplicationViews isLoggedIn={isLoggedIn}/>
      </PostManager>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
