import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fireabase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedin(true);
        setUserObj(user);
      } else {
        setIsLoggedin(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <AppRouter isLoggedin={isLoggedin} userObj={userObj} />
      ) : (
        "Initializing.."
      )}
      <footer>&copy; wontwitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
