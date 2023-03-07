import React from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axiosClient";
import "./registerLogin.css";
import { AuthContext } from "../../context/AuthProvider";


export default function Logout({setUserLogin}) {

  const { logout, user, loading } = useContext(AuthContext);

  const logoutOnClick = (e) => {
    axios
      .post("/logout")
      .then((res) => {
        console.log(`Backend: ${res.data}`);
        console.log("Frontend: User is logged out");
      })
      .catch((err) => {
        if (err) {
          console.log(`Error logging out the user ${err}`);
        }
      });
      setUserLogin(false)
  };

  return (
    <div>
      <button className="button-logout" onClick={logoutOnClick}>
        <NavLink to="/login" className="registerLink" onClick={logoutOnClick}>
          Logout
        </NavLink>
      </button>
    </div>
  );
}
