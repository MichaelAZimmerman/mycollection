import "./App.css";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import BrowseUsers from "./components/BrowseUsers";
import Login from "./components/Login";
import MyCollection from "./components/MyCollection";
import MyWishlist from "./components/MyWishlist";
import Search from "./components/Search";
import Signup from "./components/Signup";

function App() {
  const { username, logout } = useContext(UserContext);
  return (
    <div className="App">
      <header>
        {username ? (
          <h6>Welcome {username}</h6>
        ) : (
          <h6>Please log in continue.</h6>
        )}
      </header>
      <nav>
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
