import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
function AppRouter({ refreshUser, isLoggedin, userObj }) {
  return (
    <div>
      <Router>
        {isLoggedin && <Navigation userObj={userObj} />}
        <Switch>
          {isLoggedin ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile refreshUser={refreshUser} userObj={userObj} />
              </Route>
            </>
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
