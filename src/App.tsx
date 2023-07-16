import React from "react";
import "./App.scss";
import Router from "./routes/router/router";

const App = () => {
  return (
    <div className="container-fluid app-container">
      <Router />
    </div>
  );
};

export default App;
