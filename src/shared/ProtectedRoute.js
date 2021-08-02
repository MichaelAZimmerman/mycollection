import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ path, reqUser, children }) {
  const { username } = useContext(UserContext);
  if ((username && reqUser) || (!username && !reqUser)) {
    return <Route path={path}>{children}</Route>;
  } else {
    return <Redirect to={reqUser ? "/login" : "/mycollection"} />;
  }
}

export default ProtectedRoute;
