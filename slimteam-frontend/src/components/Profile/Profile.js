import React, { useState } from "react";
import "./profile.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

function Profile() {

  const personal_details ={
    title: '',
    first_name: '',
    last_name: '',
      street: '',
      postal_code: '',
      city: '',
    nationality: '',
    skills : [''],
    dob: '',
    phone_number: ''
  }

  const [data, setData] = useState(personal_details);



  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const postData = {
    personal_details :{
      title : data.title,
      first_name : data.first_name,
      last_name:data.last_name,
      address : {
        street: data.street,
        postal_code:data.postal_code,
        city:data.city,
      },
      nationality:data.nationality,
      skills:data.skills,
      dob:data.dob,
      phone_number:data.phone_number
    }
  }

  console.log(postData)


  const onClickHandle = (e) => {
    console.log(data)
      axios
      .post(("http://localhost:8888/explore-experts"),postData)
      .then((res) => {
        console.log(res.data)
      })
    
  };

  console.log(data)

  return (
    <div>
      <Container>
        <div className="firstrow">
          <h6>Personal Details</h6>
          <Row md={4}>
            <Col>
              <div>
                <label for="inputGroupSelect01">Title :</label> {"   "}
                <select class="form-control" id="inputGroupSelect01" value = {data.title} name="title" onChange={handleChange}>
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
                    name="first_name" onChange={handleChange}
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
                    name="last_name" onChange={handleChange}
                  />
                </div>
              </div>
            </Col>

            <Col>
              <div>
                <label for="floatingInputGrid">Date of Birth :</label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="DOB"
                    value={data.dob}
                    name="dob" onChange={handleChange}
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
                    name="street" onChange={handleChange}
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
                    name="postal_code" onChange={handleChange}
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
                    name="city" onChange={handleChange}
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
                    name="nationality" onChange={handleChange}
                  />
                </div>
              </div>
            </Col>
            <Col></Col>

            <Col>
              <div>
                <label for="floatingInputGrid">Skills :</label>
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
        <br />
        <br />
        {/* <div className="secondrow">
          <h6>Experience</h6>

          <Row md={4}>
            <Col>
              <div className="name">
                <label for="floatingInputGrid">Company :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Name of the Company"
                    //   value={}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="name">
                <label for="floatingInputGrid">Position :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="position"
                    //   value={}
                  />
                </div>
              </div>
            </Col>

            <Col>
              <div>
                <label for="floatingInputGrid">Start Date :</label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    id="floatingInputGrid"
                   
                    //   value={}
                  />
                </div>
              </div>
            </Col>

            <Col>
              <div>
                <label for="floatingInputGrid">End Date :</label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    id="floatingInputGrid"
                    //   value={}
                  />
                </div>
              </div>
            </Col>
            
          </Row>
          
        </div>
        <br />
        <br />
        <div className="thirdrow">
          <h6>Education</h6>

          <Row md={4}>
            <Col>
              <div className="name">
                <label for="floatingInputGrid">Institution :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="Name of the institute"
                    //   value={}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="name">
                <label for="floatingInputGrid">Degree :</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInputGrid"
                    placeholder="position"
                    //   value={}
                  />
                </div>
              </div>
            </Col>

            <Col>
              <div>
                <label for="floatingInputGrid">Start Date :</label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    id="floatingInputGrid"
                   
                    //   value={}
                  />
                </div>
              </div>
            </Col>

            <Col>
              <div>
                <label for="floatingInputGrid">End Date :</label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    id="floatingInputGrid"
                    //   value={}
                  />
                </div>
              </div>
            </Col>
            
          </Row>
          
        </div> */}
        
      </Container>


      <button onClick = {onClickHandle}>Submit</button>

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

export default Profile;
