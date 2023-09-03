import React from "react";
import ReactDOM from "react-dom/client";

// We import bootstrap here, but you can remove if you want

import { Dapp } from "./PrefabComponents/Dapp";
import App from "./App";
import ResetStyle from "./Styles/ResetStyle";

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

const root = ReactDOM.createRoot(document.getElementById("root"));
// <Dapp />
root.render(
  <React.StrictMode>
    <ResetStyle/>
   <App/>
  </React.StrictMode>
);
