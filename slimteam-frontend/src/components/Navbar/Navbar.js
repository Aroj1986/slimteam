import React from "react";
import "./navbar.css";
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import LogoCompany from "./ST.png";
import { padding } from "@mui/system";

function Navbar({ userLogin, setUserLogin, name }) {
  const { user, loading, logout } = useContext(AuthContext);

  return (
    <>
      <div className="container-header">
        <div>
          <a href="/">
            <img className="img-header" src={LogoCompany} alt="logo" />{" "}
          </a>
        </div>
        {!loading && (
          <>
            <div className="col-8 lists-navbar">
              <ul>
                <NavLink to="/" className="items-navbar">
                  About us
                </NavLink>{" "}
                |
                <NavLink to="/explore-experts" className="items-navbar">
                  Explore experts
                </NavLink>{" "}
                |
                <NavLink to="/meet-us" className="items-navbar">
                  Meet us
                </NavLink>{" "}
                |
                <NavLink to="/jobwall" className="items-navbar">
                  JobWall
                </NavLink>
              </ul>
            </div>
            {/* <div className="login-navbar "> */}
            {user ? (
              <div className="navbuttons">
                <div>
                  <NavLink to={`/portfolio/${name}`}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "black" }}
                      className="items-buttons"
                    >
                      PROFILE
                    </Button>
                  </NavLink>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "black" }}
                    onClick={logout}
                    className="items-buttons"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="navbuttons">
                <div>
                  {" "}
                  <NavLink to="/register">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "black" }}
                      className="items-buttons"
                    >
                      Register
                    </Button>
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/login">
                    {" "}
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "black" }}
                      className="items-buttons"
                    >
                      Login
                    </Button>
                  </NavLink>
                </div>
              </div>
            )}
            {/* </div> */}
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
