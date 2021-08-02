import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { APIcall: signupCall } = useFetch("POST");
  const [error, setError] = useState(null);
  return (
    <>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (
              username.length > 4 &&
              password.length > 4 &&
              username.length <= 20 &&
              password.length <= 20
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
    </>
  );
};

export default Signup;
