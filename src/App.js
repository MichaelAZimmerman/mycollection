import React, { useContext, useEffect } from "react";
import "./App.css";
import { CollectionContext, UserContext, WantListContext } from "./context";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import BrowseUsers from "./components/BrowseUsers";
import Login from "./components/Login";
import MyCollection from "./components/MyCollection";
import MyWishlist from "./components/MyWishlist";
import Search from "./components/Search";
import Signup from "./components/Signup";
import ProtectedRoute from "./shared/ProtectedRoute";
import useFetch from "./hooks/useFetch";

function App() {
  const { APIcall: getCollection } = useFetch("GET");
  const { APIcall: getWantList } = useFetch("GET");
  const { username, logout } = useContext(UserContext);
  const { setCollection } = useContext(CollectionContext);
  const { setWantList } = useContext(WantListContext);

  useEffect(() => {
    if (username === null) {
      return;
    }
    async function call() {
      const res = await getCollection(`/api/mycollection/user/`);
      if (!res.success) {
        return console.error(res.error);
      }
      setCollection(res.data);
    }
    call();
  }, [username]);

  useEffect(() => {
    if (username === null) {
      return;
    }
    async function call() {
      const res = await getWantList(`/api/mywishlist/user/`);
      if (!res.success) {
        return console.error(res.error);
      }
      setWantList(res.data);
    }
    call();
  }, [username]);

  return (
    <div className="App">
      <header className="flex-wrap">
        <img className="App-logo" src="./MC_record.png" />
        {username ? (
          <div className="header-height">Welcome {username}</div>
        ) : (
          <div className="header-height">Please log in continue.</div>
        )}
        <div className="header-space"></div>
      </header>
      <nav className="flex-wrap">
        {!username && (
          <>
            <NavLink activeClassName="active" className="link" to="/signup">
              Sign Up
            </NavLink>
            <NavLink activeClassName="active" className="link" to="/login">
              Login
            </NavLink>
          </>
        )}
        {username && (
          <>
            <NavLink activeClassName="active" className="link" to="/search">
              Search
            </NavLink>
            <NavLink
              activeClassName="active"
              className="link"
              to="/mycollection"
            >
              My Collection
            </NavLink>
            <NavLink activeClassName="active" className="link" to="/mywishlist">
              My Wish List
            </NavLink>
            <NavLink
              activeClassName="active"
              className="link"
              to="/browseusers"
            >
              Browse Users
            </NavLink>
            <NavLink
              activeClassName="active"
              className="link"
              to="/login"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </NavLink>
          </>
        )}
      </nav>
      <main>
        <Switch>
          <ProtectedRoute path="/login" reqUser={false}>
            <Login />
          </ProtectedRoute>
          <ProtectedRoute path="/signup" reqUser={false}>
            <Signup />
          </ProtectedRoute>
          <ProtectedRoute path="/search" reqUser={true}>
            <Search />
          </ProtectedRoute>
          <ProtectedRoute path="/mycollection" reqUser={true}>
            <MyCollection />
          </ProtectedRoute>
          <ProtectedRoute path="/mywishlist" reqUser={true}>
            <MyWishlist />
          </ProtectedRoute>
          <ProtectedRoute path="/browseusers" reqUser={true}>
            <BrowseUsers />
          </ProtectedRoute>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
