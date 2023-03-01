import React, { useState } from "react";
import "./profile.css";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile_user({email,setEmail,name,setName,isExpert,isUser,setUserLogin}) {
  const navigate = useNavigate();
  const personal_details ={
    title: '',
    first_name: '',
    last_name: '',
      street: '',
      postal_code: '',
      city: '',
    nationality: '',
    phone_number: ''
  }
  const [data, setData] = useState(personal_details);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let role = ""
  
  if(isExpert) {
      role = "Expert"
  }
  else {
    role = "User"
  }

  const postData = {
    role ,
    personal_details: {
      title: data.title,
      first_name: data.first_name,
      last_name: data.last_name,
      address: {
        street: data.street,
        postal_code: data.postal_code,
        city: data.city,
      },
      nationality:data.nationality,
      phone_number:data.phone_number,
      email : email
    }
  }
  const onClickHandle = (e) => {
      axios
      .post(("http://localhost:8888/explore-experts"),postData)
      .then((res) => {
        setUserLogin(true);
        navigate(`/portfolio/${data.first_name}`);
        console.log(res.data)
        setName(data.first_name)
      })
    
  };

  return (
    <div>
      <Container>
        <div className="firstrow">
          <h6>Personal Details</h6>
          <Row md={4}>
            <Col>
              <div>
                <label for="inputGroupSelect01">Title :</label> {"   "}
                <select
                  class="form-control"
                  id="inputGroupSelect01"
                  value={data.title}
                  name="title"
                  onChange={handleChange}
                >
                  <option selected></option>
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Mrs">Mrs</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className="name">
                <label for="floatingInputGrid">First Name :</label>
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
            <Col>
              <div className="name">
                <label for="floatingInputGrid">Last Name :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Last Name"
                    value={data.last_name}
                    name="last_name"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Col>

            <Col>
              <div>
                <label for="floatingInputGrid">Street :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Street with Number"
                    value={data.street}
                    name="street"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <label for="floatingInputGrid">Postal Code :</label>
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
            <Col>
              <div>
                <label for="floatingInputGrid">City :</label>
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
            <Col>
              <div>
                <label for="floatingInputGrid">Country :</label>
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
            <Col></Col>
            <Col>
              <div>
                <label for="floatingInputGrid">Mobile No :</label>
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
            <Col></Col>
          </Row>
        </div>
            
      </Container>
      <button onClick = {onClickHandle}>
        {/* <NavLink to={`/portfolio/${data.first_name}`}> */}
        SUBMIT
        {/* </NavLink>  */}
        </button>

      {/* <div class="col-md">
        <label for="floatingInputGrid">Country</label>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInputGrid"
            placeholder="Country"
            //   value={}
          />
        </div>
      </div> */}

      {/* </div> */}
    </div>
  );
}

export default Profile_user;