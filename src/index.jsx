import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";


console.log("Running in " + process.env.NODE_ENV);
console.log("PROCESS ENV:" + process.env);
console.log("IMPORT META ENV:" + import.meta.env);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
