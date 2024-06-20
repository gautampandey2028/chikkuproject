import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Validation() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const validation = () => {
    let error = {};
    if (!user.email) {
      error.email = "Email Is Require";
    }
    if (!user.password) {
      error.password = "Password Is Require";
    }
    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email Is Require" });
        setUser({ ...user, email: "" });
      } else {
        setUser({ ...user, email: value });
        setError({ ...error, email: "" });
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password Is Require" });
        setUser({ ...user, password: "" });
      } else {
        setUser({ ...user, password: value });
        setError({ ...error, password: "" });
      }
    }
  };
  const submit = (e) => {
    e.preventDefault();
    setError(validation());
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
                    // type={passwordShown ? "text" : "password"}
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
                  {/* <img
                    height="25px"
                    color="green"
                    alt="A beautiful sunset over the ocean"
                    src={passwordEye}
                  /> */}

                  {/* <Link onClick={togglePassword}>Show Password</Link> */}
                </div>

                <button type="submit" onClick={submit} class="btn btn-success">
                  Login
                </button>
              </form>
            </div>
            <div class="card-footer text-muted">Don`t have an Account ? </div>
          </div>
        </div>
      </main>
    </>
  );
}
