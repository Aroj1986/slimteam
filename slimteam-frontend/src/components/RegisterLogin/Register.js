import React from "react";
import "./registerLogin.css";
import { NavLink } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";
import axios from "axios"

function Register() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();


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
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onChangeRepeatPassword = (e) => {
    if(password === e.target.value) {
      setRepeatPassword(e.target.value)
    }
    else {
     repeatPassword.setCustomValidity("Passwords Don't Match");
    }
  }

  // function validatePassword(){
  //   if(password.value != confirm_password.value) {
  //     confirm_password.setCustomValidity("Passwords Don't Match");
  //   } else {
  //     confirm_password.setCustomValidity('');
  //   }
  // }

  console.log(email)
  console.log(password)
  console.log(repeatPassword)

  return (
    <>
      <div className="registerLogin-container">
        <h3>Create account</h3>
        <form >
          <div className="form-group">
            <input
              // type ="text"
              name="email"
              placeholder="Email"
              className="form-input"
              onChange = {onChangeEmail}
            ></input>
          </div>

          <div className="password-group">
            <input
              type={type}
              name="password"
              placeholder="Password"
              minlength="8"
              maxlength="15"
              pattern="[a-zA-Z0-9]{8,15}"
              className="password-input"
              onChange = {onChangePassword}
            ></input>
            <span onClick={handleToggle} className="password-icon">
              <Icon icon={icon} />
            </span>
          </div>

          <div className="password-group">
            <input
              type={type}
              name="password"
              placeholder="Repeat password"
              minlength="8"
              maxlength="15"
              pattern="[a-zA-Z0-9]{8,15}"
              className="password-input"
              onChange = {onChangeRepeatPassword}
            ></input>
            <span onClick={handleToggle} className="password-icon">
              <Icon icon={icon} />
            </span>
          </div>

          {/* <div> */}
          {/* <input type="radio" id="html" name="fav_language" value="Exper" />
          <label for="html"><strong>Are you registering as an expert?</strong></label><br/> */}
          {/* <input type="radio" id="css" name="fav_language" value="CSS"/>
          <label for="css">CSS</label><br/> */}
          {/* </div> */}

          <div className="remember-forgot">
            <div>
              <input type="checkbox" name="agree-term"></input>
              <label for="agree-term">
                I agree all statements in <u>Terms of service</u>
              </label>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              name="submit"
              onClick={(e) => {
                e.preventDefault();
                // alert("Are you registering as an expert!!");
                const postData = {
                  email ,
                  password
                }
                axios
                  .post(("http://localhost:8888/register"),postData)
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((err) => {
                    console.log(
                      `Error fetching sought expert in database: ${err}`
                    );
                  });
              }}
              value="Register"
              className="form-submit"
            ></input>
          </div>

          <div class="hr-sect">
            <h5>or</h5>
          </div>

          <div className="social-media-login">
            <div className="google-icon-field">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                class="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
            </div>
            <input
              type="submit"
              name="submit"
              value="Login using Google"
              className="social-media-submit google-input-field"
            ></input>
          </div>

          <div className="social-media-login">
            <div className="linkedin-icon-field">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                class="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </div>
            <input
              type="submit"
              name="submit"
              value="Login using Linkedin"
              className="social-media-submit linkedin-input-field"
            ></input>
          </div>

          <p>
            Have already an account ?{" "}
            <NavLink to="/login">
              <b>Login here</b>
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
