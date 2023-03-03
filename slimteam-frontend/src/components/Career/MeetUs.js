import "./meetus.css";
import image from "../../images/image1.avif";
import sindhura from "../../images/profilepic.jpg";
import aroj from "../../images/ArojPicture.jpeg";

function MeetUs() {
  return (
       <>
        <div className="team-content-section">
          <div className="team-heading">
            <h1>MEET OUR AMAZING TEAM</h1>
            <p>Lorem ipsum dolor sit amet proin gravida nibh vel velit</p>
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
                <h6 className="team-member-name">AROJ BHATTARAI</h6>
                <p className="team-member-job">Full-Stack Developer</p>
              </div>
            </div>
            <div className="team-member">
              <img
                src={image}
                alt="image1"
                height="220px"
                width="200px"
              />
              <div>
                <h6 className="team-member-name">MONIKA MROWKA</h6>
                <p className="team-member-job">Full-Stack Developer</p>
              </div>
            </div>
            <div className="team-member">
              <img
                 src={image}
                alt="image1"
                height="220px"
                width="200px"
              />
              <div>
                <h6 className="team-member-name">NEELIMA RAPETI</h6>
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
                <h6 className="team-member-name">SINDHURA KONTHAM</h6>
                <p className="team-member-job">Full-Stack Developer</p>
              </div>
            </div>
          </div>
          <br /><br />
          <p>Become part of our dream team, let's join us!</p>
            <button className="wearehiring" >Contact Us!!</button>
        </div>
       </>
  )
}

export default MeetUs
