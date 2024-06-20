import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  handleRegister,
  login,
  reset_redirectToo,
} from "../../ReduxToolkit/AuthSlice";
import passwordEye from "../../image/show-password.png";
import axios from "axios";
import axiosInstance from "../../Helper/Helper";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const { redirectTo } = useSelector((state) => state?.Auth);
  const navigate = useNavigate();

  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const validation = () => {
    let error = {};

    if (!user.email) {
      error.email = "Email is Required";
    }
   
    if (!user.password) {
      error.password = "Password  is Required";
    }

    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password name is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };

  useEffect(() => {
    const RedirectUser = () => {
      let token = localStorage.getItem("token");
      let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

      if (token !== null && token !== undefined && token !== "") {
        isInLoginPage && navigate("/productlist");
      }
    };

    RedirectUser();
  }, [navigate, redirectTo]);

  useEffect(() => {
    dispatch(reset_redirectToo(null));
  }, [dispatch]);

  // const SubmitInfo = (e) => {
  //   e.preventDefault();
  //   setError(validation());
  //   let formData = new FormData();
  //   formData.append("email", user.email);
  //   formData.append("password", user.password);
  //   console.log(formData, "formData");
  //   dispatch(login(formData));
  // };

  // const SubmitInfo = async (e) => {
  //   e.preventDefault();

  //   setError(validation());

  //   // Create a FormData object
  //   let formData = new FormData();
  //   formData.append("email", user.email);
  //   formData.append("password", user.password);

  //   try {
  //     const authToken = "YOUR_TOKEN";

  //     const response = await fetch("your-api-endpoint", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setError(errorData.message || "An error occurred");
  //       return;
  //     }

  //     const responseData = await response.json();
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     setError("An error occurred");
  //   }
  // };

  const sendData = async (e) => {
    e.preventDefault();
    setError(validation());
    const formdata = new FormData();
    formdata.append("email", user.email);
    formdata.append("password", user.password);
    try {
      const response = await axiosInstance.post(
        "/user/signin",

        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.status === 200) {
        toast(response.data.message);
        const token = response.data.token;
        console.log(response, "response");
        console.log(token);
        localStorage.setItem("token", token);
        console.log(response.data);
      }else if(response.data.status === 201){
        toast(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reg = () => {
    dispatch(handleRegister());
  };

  return (
    <>
      <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="container mt-4">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Login</h2>
              <ol>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Login</li>
              </ol>
            </div>
          </div>
        </section>
        <div className="container mt-2">
          <div class="card" style={{ width: "600px" }}>
            <div class="card-header">User Login</div>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    onChange={postUserData}
                    value={user.email}
                    class="form-control"
                    name="email"
                  />
                  <span style={{ color: "red", marginLeft: "24px" }}>
                    {" "}
                    {error.email}{" "}
                  </span>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Password
                  </label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    onChange={postUserData}
                    value={user.password}
                    class="form-control"
                    name="password"
                  />
                  <span style={{ color: "red", marginLeft: "24px" }}>
                    {" "}
                    {error.password}{" "}
                  </span>

                  <br />
                  <img
                    height="25px"
                    color="green"
                    alt="A beautiful sunset over the ocean"
                    src={passwordEye}
                  />

                  <Link onClick={togglePassword}>Show Password</Link>
                </div>

                <button
                  type="submit"
                  onClick={sendData}
                  class="btn btn-success"
                >
                  Login
                </button>
              </form>
            </div>
            <div class="card-footer text-muted">
              Don`t have an Account ?{" "}
              <Link onClick={reg} to="/register">
                
                Register
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
