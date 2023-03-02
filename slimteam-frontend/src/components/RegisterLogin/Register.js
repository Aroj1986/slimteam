import React from "react";
import "./registerLogin.css";
import { NavLink } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

function Register({
  email,
  setEmail,
  isExpert,
  isUser,
  setIsExpert,
  setIsUser,
}) {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();
  const { register, user, loading } = useContext(AuthContext);

  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(false)
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
      setPasswordError(false)
  };

  const onChangeRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const expertOnChange = (e) => {
    setIsUser(false);
    setIsExpert(true);
  };

  const userOnChange = (e) => {
    setIsExpert(false);
    setIsUser(true);
  };

  const registerOnClick = (e) => {
    e.preventDefault();
    if (!email && !password) {
      setEmailError("Enter valid email address");
      setPasswordError("Password should not be empty");
    } else if (!email) {
      setEmailError("Enter valid email address");
    } else if (!password) {
      setPasswordError("Password should not be empty");
    } else if (password.length < 8 || password.length > 15) {
      setPasswordError("password length must be between 8 and 15 characters");
    } else if (repeatPassword !== password) {
      setRepeatPasswordError("password does not match");
    } else {
      register(email, password, isExpert, isUser);
    }
  };

  return (
    <>
      {user ? (
        <Navigate to="/profile" />
      ) : (
        <div className="registerLogin-container">
          <h3>Create account</h3>
          <form>
            <div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  onChange={onChangeEmail}
                  required
                ></input>
              <p className="error-message">{emailError}</p>
              </div>
            </div>

            <div>
              <div className="password-group">
                <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  minlength="8"
                  maxlength="15"
                  pattern="[a-zA-Z0-9]{8,15}"
                  className="password-input"
                  onChange={onChangePassword}
                ></input>
                <span onClick={handleToggle} className="password-icon">
                  <Icon icon={icon} />
                </span>
              </div>
              <p className="error-message">{passwordError}</p>
            </div>

            <div>
              <div className="password-group">
                <input
                  type={type}
                  name="password"
                  placeholder="Repeat password"
                  minlength="8"
                  maxlength="15"
                  pattern="[a-zA-Z0-9]{8,15}"
                  className="password-input"
                  onChange={onChangeRepeatPassword}
                ></input>
                <span onClick={handleToggle} className="password-icon">
                  <Icon icon={icon} />
                </span>
              </div>
              <p className="error-message">{repeatPasswordError}</p>
            </div>

            <div className="radiobutton">
              <input
                type="radio"
                id="expert"
                name="fav_language"
                value="Expert"
                onChange={expertOnChange}
              />
              <label for="expert">
                <strong>Expert?</strong>
              </label>
              <br />
              <input
                type="radio"
                id="user"
                name="fav_language"
                value="user"
                onChange={userOnChange}
              />
              <label for="user">
                <strong>User?</strong>
              </label>
              <br />
            </div>

            <div className="form-group">
              <button
                type="submit"
                name="submit"
                onClick={registerOnClick}
                value="Register"
                className="form-submit"
              >
                Register{" "}
              </button>
            </div>

            <p>
              Have already an account ?{" "}
              <NavLink to="/login">
                <b>Login here</b>
              </NavLink>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default Register;
