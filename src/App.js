import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { RouterProvider } from "react-router-dom";
import Categories from "./Categories";
import "bootstrap/dist/css/bootstrap.min.css";
import Catmeals from "./Catmeals";
import Cooking from "./Cooking";
import Countries from "./Countries";
import Countrydishes from "./Countrydishes";
import Navbar from "./Navbar";
export default function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Categories /> },
        { path: "/Catmeals/:Cat", element: <Catmeals /> },
        { path: "/Meals/:id", element: <Cooking /> },
        { path: "/Countries", element: <Countries /> },
        { path: "/Country/:countryname", element: <Countrydishes /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routers}></RouterProvider>
    </div>
  );
}
