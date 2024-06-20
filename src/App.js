import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "../src/ShareModule/Navbar";
import Footer from "../src/ShareModule/Footer";
import React from "react";
import { useDispatch } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import { check_token } from "./ReduxToolkit/AuthSlice";

import "./App.css";
import Validation from "./Component/Auth/Validation";
const Home = lazy(() => import("../src/Component/Product/Home"));
const Login = lazy(() => import("../src/Component/Auth/Login"));
const Register = lazy(() => import("../src/Component/Auth/Register"));
const CreateProduct = lazy(() =>
  import("../src/Component/Product/CreateProduct")
);
const ProductList = lazy(() => import("../src/Component/Product/ProductList"));
const Update = lazy(() => import("../src/Component/Product/Update"));

function App() {
  const dispatch = useDispatch();

  function PrivateRoute({ children }) {
    console.log(children, "children");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("Please go for login either you can't access product list")}
      </>
    );
  }

  const PublicRouteNames = [
    {
      path: "/register",
      Component: <Register />,
    },
    {
      path: "/login",
      Component: <Login />,
    },
    {
      path: "/",
      Component: <Home />,
    },
  ];

  const PrivateRouteNames = [
    {
      path: "/createe",
      Component: <CreateProduct />,
    },

    {
      path: "/productlist",
      Component: <ProductList />,
    },

    {
      path: "/update/:id",
      Component: <Update />,
    },
  ];

  useEffect(() => {
    dispatch(check_token());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<h2>Loading.....</h2>}>
        <Router>
          <Navbar />
          <Routes>
            {PublicRouteNames?.map((route, index) => {
              return (
                <Route exact path={route.path} element={route.Component} />
              );
            })}

            {PrivateRouteNames?.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route.Component}</PrivateRoute>}
                />
              );
            })}
          </Routes>
          <Footer />
        </Router>
      </Suspense>
     
    </>

  );
}

export default App;
