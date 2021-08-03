import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passVerify, setPassVerify] = useState("");
  const { APIcall: signupCall } = useFetch("POST");
  const [error, setError] = useState(null);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  return (
    <>
      <form>
        <div className="input-fields">
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => {
                setUsernameValid(username.length > 4 && username.length <= 20);
              }}
              value={username}
            />
          </div>
          <div className={usernameValid ? "form-hint" : "form-error"}>
            Username must be between 5 and 20 characters.
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                setPasswordValid(password.length > 4 && password.length <= 20);
              }}
              value={password}
            />
          </div>
          <div className={passwordValid ? "form-hint" : "form-error"}>
            Password must be between 5 and 20 characters.
          </div>
          <div>
            <label htmlFor="password-verify">Re-Enter Password</label>
            <input
              id="password-verify"
              type="password"
              onChange={(e) => setPassVerify(e.target.value)}
              onBlur={() => {
                setPasswordMatch(password == passVerify);
              }}
              value={passVerify}
            />
          </div>
          <div className={passwordMatch ? "form-hint" : "form-error"}>
            Passwords do not match.
          </div>
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (
              username.length > 4 &&
              password.length > 4 &&
              username.length <= 20 &&
              password.length <= 20 &&
              password == passVerify
            ) {
              setError(null);
              let res = await signupCall("/api/users/signup", {
                username,
                password,
              });
              if (res.error) {
                return setError(res.error);
              } else {
                setError("Signup was Successful! Proceed to Login page.");
              }
            }
          }}
        >
          Sign Up
        </button>
      </form>
      <div className="error">{error}</div>
    </>
  );
};

export default Signup;
