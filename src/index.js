import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTER } from "./Routes/Routes.js";
import HomePage from './Pages/HomePage/HomePage.jsx';
import LogInPage from './Pages/LogInPage/LogInPage.jsx';
import SignUpPage from './Pages/SignUpPage/SignUpPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: ROUTER.HOMEPAGE_ROUTE,
    element: <HomePage />,
  },
  {
    path: ROUTER.LOGIN_ROUTE,
    element: <LogInPage />,
  },
  {
    path: ROUTER.SIGNUP_ROUTE,
    element: <SignUpPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);