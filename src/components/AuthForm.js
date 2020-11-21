import React, { useState } from "react";
import { authService } from "../fireabase";
import "./AuthForm.css";
function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSumit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={onSumit} className="container">
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authForm__Input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authForm__Input"
        />
        <input
          className="authForm__Input auth__Submit"
          type="submit"
          value={newAccount ? "Create Account" : "SignIn"}
        />
        {error && <span className="auth__Error">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="auth__Switch">
        {newAccount ? "SignIn" : "Create Account"}
      </span>
    </div>
  );
}

export default AuthForm;
