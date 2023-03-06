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
      
        
          <a href="/">
            <p style={{ paddingLeft: "20px" }}>
              <img className="img-header" src={LogoCompany} alt="logo" />
            </p>
          </a>
        

        {/* <div className="row container-navbar"> */}
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
              <div>
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
                        {name}
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
              </ul>
              </div>
            </>
          )}
        {/* </div> */}
      </div>
      
    </>
    
  );
}

export default Navbar;
