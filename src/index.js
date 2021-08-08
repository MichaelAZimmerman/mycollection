import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { SearchProvider } from "./context";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CollectionProvider } from "./context/CollectionContext";
import { WantListProvider } from "./context/WantListContext";

ReactDOM.render(
  <Router>
    <UserProvider>
      <SearchProvider>
        <CollectionProvider>
          <WantListProvider>
            <App />
          </WantListProvider>
        </CollectionProvider>
      </SearchProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
