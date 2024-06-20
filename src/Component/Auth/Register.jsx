import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../ReduxToolkit/AuthSlice";
import passwordEye from "../../image/show-password.png";

const Register = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [img, setimg] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const [error, setError] = useState({});
  console.log(error, "arpan");
  const dispatch = useDispatch();

  const validation = () => {
    let error = {};
    console.log(error, "error");
    if (!user.first_name) {
      error.first_name = "First_name is Required";
    }

    if (!user.last_name) {
      error.last_name = "Last_name is Required";
    }

    if (!user.email) {
      error.email = "Email is Required";
    }

    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "first_name") {
      if (value.length === 0) {
        setError({ ...error, first_name: "Name is Required" });
        setUser({ ...user, first_name: "" });
      } else {
        setError({ ...error, first_name: "" });
        setUser({ ...user, first_name: value });
      }
    }

    if (name === "last_name") {
      if (value.length === 0) {
        setError({ ...error, last_name: "last_name is Required" });
        setUser({ ...user, last_name: "" });
      } else {
        setError({ ...error, last_name: "" });
        setUser({ ...user, last_name: value });
      }
    }

    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "@Email is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
    if (name === "confirm_password") {
      if (value.length === 0) {
          setUser({ ...user, confirm_password: "" });
          setError({ ...error, confirm_password: "Password is empty" });
      } else if (user.password === user.confirm_password) {
          setUser({ ...user, confirm_password: value });
          setError({ ...error, confirm_password: "Confirm is a match" });
      } else {
          setUser({ ...user, confirm_password: value });
          setError({ ...error, confirm_password: "Passwords do not match" });
      }
  }
 
  };

  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());
    let formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profile_pic", img);
    dispatch(register(formData));
  };

  useEffect(() => {
    const RedirectUser = () => {
      let name = localStorage.getItem("name");
      let isInLoginPage =
        window.location.pathname.toLowerCase() === "/register";

      if (name !== null && name !== undefined && name !== "") {
        isInLoginPage && navigate("/login");
      }
    };

    RedirectUser();
  }, [navigate]);

  return (
    <div>
      <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="container mt-4">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Register</h2>
              <ol>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Register</li>
              </ol>
            </div>
          </div>
        </section>
        <div className="container mt-2">
          <div class="card" style={{ width: "600px" }}>
            <div class="card-header">User Register</div>
            <div class="card-body">
              <form>
                <div>
                  <label for="exampleInputEmail1">First Name</label>
                  <input
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="first_name"
                    value={user.first_name}
                    onChange={(e) => postUserData(e)}
                  />
                  <span style={{ color: "red", marginLeft: "24px" }}>
                    {" "}
                    {error.first_name}{" "}
                  </span>
                </div>
                <div>
                  <label for="exampleInputEmail1">Last Name</label>
                  <input
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="last_name"
                    value={user.last_name}
                    onChange={(e) => postUserData(e)}
                  />
                  <span style={{ color: "red", marginLeft: "24px" }}>
                    {" "}
                    {error.last_name}{" "}
                  </span>
                </div>

                <div>
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={user.email}
                    onChange={(e) => postUserData(e)}
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
                  <br />
                  <img height="25px" alt="A beautiful sunset over the ocean" color="green" src={passwordEye} />

                  <Link onClick={togglePassword}>Show Password</Link>
                </div>

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setimg(e.target.files[0])}
                    name="img"
                    accept="image/*"
                    class="form-control"
                  />
                  {img !== "" && img !== undefined && img !== null ? (
                    <img
                      style={{ height: "180px" }}
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="upload-img"
                    />
                  ) : (
                    <>{img === "" && <p>Drag or drop content here</p>}</>
                  )}
                </div>

                <button
                  type="submit"
                  class="btn btn-success"
                  onClick={SubmitInfo}
                >
                  Register
                </button>
              </form>
            </div>
            <div class="card-footer text-muted">
              have an Account ? <Link to="/login"> Login</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;

/* import React, { useState } from "react";
import { useDispatch } from "react-redux"

export default function Register() {
  const dispatch=useDispatch()
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
 
  });

  let [error, setError] = useState("");
  const validation = () => {
    let error = {};
    if (!user.first_name) {
      error.first_name = "First Name is Important";
    }
    if (!user.last_name) {
      error.last_name = "Last Name is Important";
    }
    if (!user.email) {
      error.email = "Email is Important";
    }
    if (!user.password) {
      error.password = "Password is Important";
    }
    if (!user.confirm_password) {
      error.confirm_password = "Password is Important";
    }
 

    return error;
  };

  let name, value;
  const PostUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "first_name") {
      if (value.length === 0) {
        setUser({ ...user, first_name: "" });
        setError({ ...error, first_name: "First Name Is Important" });
      } else {
        setUser({ ...user, first_name: value });
        setError({ ...error, first_name: "" });
      }
    }
    if (name === "last_name") {
      if (value.length === 0) {
        setUser({ ...user, last_name: "" });
        setError({ ...error, last_name: "Last Name Is Important" });
      } else {
        setUser({ ...user, last_name: value });
        setError({ ...error, last_name: "" });
      }
    }
    if (name === "email") {
      if (value.length === 0) {
        setUser({ ...user, email: "" });
        setError({ ...error, email: "Email Is Important" });
      } else {
        setUser({ ...user, email: value });
        setError({ ...error, email: "" });
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        setUser({ ...user, password: "" });
        setError({ ...error, password: "Password Is Important" });
      } else {
        setUser({ ...user, password: value });
        setError({ ...error, password: "" });
      }
    }
    if (name === "confirm_password") {
      if (value.length === 0) {
        setUser({ ...user, confirm_password: "" });
        setError({ ...error, confirm_password: "Confirm Password Is Important" });
      } else if (value !== user.password) {
        setUser({ ...user, confirm_password: value });
        setError({ ...error, confirm_password: "Passwords do not match" });
      } else {
        setUser({ ...user, confirm_password: value });
        setError({ ...error, confirm_password: "" });
      }
    }
   
   
  };
  const submitInfo = (e) => {
    e.preventDefault();
    setError(validation());
  
  };
  return (
    <>
      <form>
        <div class="form-group">
          <label for="exampleInputPassword1">First Name</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={PostUserData}
            class="form-control"
            id="exampleInputPassword1"
          />
          <span style={{ color: "red" }}>{error.first_name}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={PostUserData}
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <span style={{ color: "red" }}>{error.last_name}</span>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={PostUserData}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <span style={{ color: "red" }}>{error.email}</span>
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={PostUserData}
            class="form-control"
            id="exampleInputPassword1"
          />
          <span style={{ color: "red" }}>{error.password}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={PostUserData}
            class="form-control"
            id="exampleInputPassword1"
          />
          <span style={{ color: "red" }}>{error.password}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={user.confirm_password}
            onChange={PostUserData}
            class="form-control"
            id="exampleInputPassword1"
          />
          <span style={{ color: "red" }}>{error.confirm_password}</span>
        </div>
        <div>
          <button type="submit" onClick={submitInfo} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
} */
