import React from "react";
import Tabs from "../../components/Tabs/Tabs";
import { Outlet } from "react-router-dom";
import './Root.scss'

const Root = () => {
  return (
    <div className="container-fluid vh-100 root-container">
      <Tabs />
      <Outlet />
    </div>
  );
};

export default Root;
