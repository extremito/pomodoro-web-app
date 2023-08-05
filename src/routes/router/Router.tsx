import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../../pages/root/Root";
import PomodoroPage from "../../pages/pomodoro-page/PomodoroPage";
import MainPage from "../../pages/main-page/MainPage";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{
      path: '/',
      element: <MainPage />
    }]
  },
]);

const Router = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;
