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
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedin(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <div>
      {init ? (
        <AppRouter
          isLoggedin={isLoggedin}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing.."
      )}
      <footer>&copy; wontwitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
