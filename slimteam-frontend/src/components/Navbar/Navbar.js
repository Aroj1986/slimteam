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
  // console.log(user);
  // const logoutOnClick = (e) => {
  //   axios
  //     .post("http://localhost:8888/logout")
  //     .then((res) => {
  //       console.log(`Backend: ${res.data}`);
  //       console.log("Frontend: User is logged out");
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         console.log(`Error logging out the user ${err}`);
  //       }
  //     });
  //   setUserLogin(false);
  // };

  return (
    <>
      <div className="container-header">
        <a href="/">
          <p style={{ paddingLeft: "20px" }}>
            <img className="img-header" src={LogoCompany} alt="logo" />
          </p>
        </a>

        <div className="row container-navbar">
          {!loading && (
            <>
              <ul className="col-8 lists-navbar">
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
              <ul className="col-4 login-navbar">
                {user ? (
                  <>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "black" }}
                    >
                      <NavLink
                        to={`/portfolio/${name}`}
                        className="items-buttons"
                      >
                        Profile
                      </NavLink>
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "black" }}
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "black" }}
                    >
                      <NavLink to="/register" className="items-buttons">
                        Register
                      </NavLink>
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "black" }}
                    >
                      <NavLink to="/login" className="items-buttons">
                        Login
                      </NavLink>
                    </Button>
                  </>
                )}

                {/*             <Button
              variant="contained"
              style={{ backgroundColor: "black" }}
            >
              <NavLink
                to={`${userLogin ? `/portfolio/${name}` : "/register"}`}
                className="items-buttons register"
              >
                {userLogin ? "Profile" : "Register"}
              </NavLink>
            </Button>{" "}
            |
            <Button
              variant="contained"
              style={{ backgroundColor: "black" }}
            >
              <NavLink
                to={`${userLogin ? "/login" : "/login"}`}
                className="items-buttons"
              >
                {userLogin ? (
                  <span onClick={logoutOnClick}>Logout</span>
                ) : (
                  "Login"
                )}
              </NavLink>
            </Button> */}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
