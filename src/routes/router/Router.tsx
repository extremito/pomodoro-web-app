import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "../Routes";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Routes />,
  },
]);

const Router = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;
