import "./meetus.css";
import { NavLink } from "react-router-dom";
import sindhura from "../../images/Sindhura.jpeg";
import aroj from "../../images/ArojPicture.jpeg";
import Monika from "../../images/Monika.jpeg";
import Neelima from "../../images/Neelima.jpeg";

function MeetUs() {
  return (
       <>
        <div className="team-content-section">
          <div className="team-heading">
            <h1>MEET OUR AMAZING TEAM</h1>
            {/* <p>Lorem ipsum dolor sit amet proin gravida nibh vel velit</p> */}
          </div>
          <hr />
          <br />
          <br />
          <div className="team-members">
            <div className="team-member">
              <img
                src={aroj}
                alt="image1"
                height="220px"
                width="200px"
              />
              <div>
                <h6 className="team-member-name"><NavLink to ="https://www.linkedin.com/in/aroj-bhattarai/" target="_blank">AROJ BHATTARAI</NavLink></h6>
                <p className="team-member-job">Full-Stack Developer</p>
              </div>
            </div>
            <div className="team-member">
              <img
                src={Monika}
                alt="image1"
                height="220px"
                width="200px"
              />
              <div>
                <h6 className="team-member-name"><NavLink to="https://www.linkedin.com/in/monika-mrowka/" target="_blank">MONIKA MROWKA</NavLink></h6>
                <p className="team-member-job">Full-Stack Developer</p>
              </div>
            </div>
            <div className="team-member">
              <img
                 src={Neelima}
                alt="image1"
                height="220px"
                width="200px"
              />
              <div>
                <h6 className="team-member-name"><NavLink to="https://www.linkedin.com/in/neelima-rapeti/" target="_blank">NEELIMA RAPETI</NavLink></h6>
                <p className="team-member-job">Full-Stack Developer</p>
              </div>
            </div>
            <div className="team-member">
              <img
                src={sindhura}
                alt="image1"
                height="220px"
                width="200px"
              />
              <div>
                <h6 className="team-member-name"><NavLink to="https://www.linkedin.com/in/sindhurakontham/" target="_blank">SINDHURA KONTHAM</NavLink></h6>
                <p className="team-member-job">Full-Stack Developer</p>
              </div>
            </div>
          </div>
          <br /><br />
          <p>For any Queries or Support, Please reach out to us!</p>
          <button onClick={() => window.location = 'mailto:sindhura.kontham@gmail.com'} className="post-submit" >
                Contact Us
                </button>
        </div>
       </>
  )
}

export default MeetUs
