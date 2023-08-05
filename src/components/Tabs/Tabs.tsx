import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/routes";

const Tabs = () => {
  const location = useLocation();
  const getClasses = (activeRoute: string) =>
    location.pathname === activeRoute
      ? "nav-link link-light link-offset-2 link-underline-opacity-25"
      : "nav-link link-info link-offset-2 link-underline-opacity-25";
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to={routes.root.path} className={getClasses(routes.root.path)}>
          Pomodoro
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={routes.configuration.path}
          className={getClasses(routes.configuration.path)}
        >
          Configuration
        </Link>
      </li>
    </ul>
  );
};

export default Tabs;
