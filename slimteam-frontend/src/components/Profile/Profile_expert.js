import React, { useState } from "react";
import "./profile.css";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../../axiosClient";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile_expert({
  email,
  setEmail,
  name,
  setName,
  isExpert,
  isUser,
  setUserLogin,
}) {
  const navigate = useNavigate();
  const personal_details = {
    title: "",
    first_name: "",
    last_name: "",
    street: "",
    postal_code: "",
    city: "",
    nationality: "",
    skills: [""],
    // dob: '',
    phone_number: "",
  };

  const [data, setData] = useState(personal_details);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let role = "";

  if (isExpert) {
    role = "Expert";
  } else {
    role = "User";
  }

  const postData = {
    role,
    personal_details: {
      title: data.title,
      first_name: data.first_name,
      last_name: data.last_name,
      address: {
        street: data.street,
        postal_code: data.postal_code,
        city: data.city,
      },
      nationality: data.nationality,
      skills: data.skills,
      dob: data.dob,
      phone_number: data.phone_number,
      email: email,
    },
  };



  const onClickHandle = (e) => {
    if (data.first_name.trim() === '' || data.last_name.trim() === '') {
      
      toast.error('Please enter your first and second name.');
      return;
    }
    if (data.street.trim() === '') {
      toast.error('Please enter your street address.');
      return;
    }
    if (data.postal_code.trim() === '') {
      toast.error('Please enter your postal code.');
      return;
    }
    if (data.city.trim() === '') {
      toast.error('Please enter your city.');
      return;
    }
    if (data.nationality.trim() === '') {
      toast.error('Please enter your country.');
      return;
    }
    if (data.phone_number.trim() === '') {
      toast.error('Please enter your phone number.');
      return;
    }
    if (data.title.trim() === '') {
      toast.error('Please enter your title.');
      return;
    }
    if (data.skills.trim() === '') {
      toast.error('Please enter your Skills.');
      return;
    }
   


    axios
      .post("/api/explore-experts/explore-experts", postData)
      .then((res) => {
        setUserLogin(true);
        navigate(`/portfolio/${data.first_name}`);
        console.log(res.data);
        setName(data.first_name);
      });
  };

  console.log(postData);

  return (

    <div>
      <ToastContainer toastClassName="toastCustomClassName" />
      <Container>
        <div className="firstrow" style={{margin: '20px'}}>
          <h3 style={{textAlign:"center"}}>PERSONAL DETAILS</h3><br/>
          <Row md={3}>
            <Col></Col>
            <Col>
              <div>
                <label for="inputGroupSelect01">TITLE :</label> {"   "}
                <select
                  class="form-control"
                  id="inputGroupSelect01"
                  value={data.title}
                  name="title"
                  onChange={handleChange}
                  required

                >
                  <option selected></option>
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Mrs">Mrs</option>
                </select>
              </div>
            </Col>
            <Col></Col><Col></Col>
            <Col>
              <div className="name">
                <label for="floatingInputGrid">FIRST NAME :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="First Name"
                    value={data.first_name}
                    name="first_name"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Col>
            <Col></Col><Col></Col>
            <Col>
              <div className="name">
                <label for="floatingInputGrid">LAST NAME :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Last Name"
                    value={data.last_name}
                    name="last_name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </Col>
            <Col></Col><Col></Col>
            <Col>
              <div>
                <label for="floatingInputGrid">STREET :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Street with Number"
                    value={data.street}
                    name="street"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </Col>
            <Col></Col><Col></Col>
            <Col>
              <div>
                <label for="floatingInputGrid">POSTAL CODE :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Postal Code"
                    value={data.postal_code}
                    name="postal_code"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Col>
            <Col></Col><Col></Col>
            <Col>
              <div>
                <label for="floatingInputGrid">CITY :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="City"
                    value={data.city}
                    name="city"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Col>
            <Col></Col><Col></Col>
            <Col>
              <div>
                <label for="floatingInputGrid">COUNTRY :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Country"
                    value={data.nationality}
                    name="nationality"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Col>
            <Col></Col><Col></Col>

            <Col>
              <div>
                <label for="floatingInputGrid">SKILLS :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Skills"
                    name="skills"
                    value={data.skills}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Col>
            <Col></Col><Col></Col>
            <Col>
              <div>
                <label for="floatingInputGrid">MOBILE NO :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="+49 **********"
                    name="phone_number"
                    value={data.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Col>
           
          </Row>
        </div>
        <br />
        <br />
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <Button
        variant="contained"
        color="inherit"
        onClick={onClickHandle}
        style={{ backgroundColor: "black", color: "white" }}
      >
        {/* <NavLink to={`/portfolio/${data.first_name}`}> */}
        SUBMIT
        {/* </NavLink>  */}
      </Button>
      </div>

      
    </div>
  );
}

export default Profile_expert;
