import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLoggedout } from "../ReduxToolkit/AuthSlice";
import { pro } from "../ReduxToolkit/CrudSlice";
import { profile_pic } from "../Helper/Helper";
import "./nav.css";
export default function Navbar() {
  const Name = localStorage.getItem("Name");

  const { isloggedIn } = useSelector((s) => s?.Auth);

  const image = localStorage.getItem("image");
  console.log(image, "ghvcv");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(pro());
  }, [dispatch]);

  const [name, setName] = useState("");
  useEffect(() => {
    setName(Name);
  }, [Name]);
  const logout = () => {
    dispatch(handleLoggedout());
    navigate("/login");
  };

  return (
    <>
      <header id="header" class="fixed-top">
        <div class="container d-flex align-items-center">
          <h1 class="logo mr-auto">
            <a href="index.html">
              <img class="hello" alt="hello" src="./assets/img/logo.png" />
            </a>
          </h1>

          <nav class="nav-menu d-none d-lg-block">
            <ul>
              <li class="active">
                <Link to="/">Home</Link>
              </li>
              <li class="active">
                <Link to="/productlist">Product List</Link>
              </li>
            </ul>
          </nav>

          <div class="header-social-links">
            <Link to="" class="twitter">
              <i class="icofont-twitter"></i>
            </Link>
            <Link to="" class="facebook">
              <i class="icofont-facebook"></i>
            </Link>
            <Link to="" class="instagram">
              <i class="icofont-instagram"></i>
            </Link>
            <Link to="" class="linkedin">
              <i class="icofont-linkedin"></i>
            </Link>
          </div>

          {isloggedIn ? (
            <>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </li>
            </>
          ) : (
            ""
          )}
          <div className="d-flex useridentity justify-content-center align-items-center">
            {isloggedIn ? (
              <>
                <li style={{ cursor: "pointer" }}>{name}</li>
              </>
            ) : (
              ""
            )}

            {isloggedIn ? (
              <>
                <img
                  style={{}}
                  src={profile_pic(image)}
                  alt="No"
                  className="userimage"
                />
              </>
            ) : (
              <img height="30px" src="" alt="" />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
