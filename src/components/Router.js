import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import "./Router.css";
function AppRouter({ refreshUser, isLoggedin, userObj }) {
  return (
    <div>
      <Router>
        {isLoggedin && <Navigation userObj={userObj} />}
        <Switch>
          {isLoggedin ? (
            <div className="router__container">
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile refreshUser={refreshUser} userObj={userObj} />
              </Route>
            </div>
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
