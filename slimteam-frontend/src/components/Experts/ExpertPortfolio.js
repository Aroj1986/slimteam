import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Calender from '../Calender/Calender'

// whenever we are using axios and getting data from the backend we need to use optional chaining to load the data in front-end other wise we get undefined value

export default function ExpertPortfolio({setExpertName}) {
  const [expert, setExpert] = useState({})
  const {name} = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    axios
    .get(`http://localhost:8888/explore-expert/${name}`)
    .then((res) => {
      setExpert(res.data)
      setExpertName(name)
    })
    .catch((err) => {
      console.log(`Error fetching sought expert in database: ${err}`);
    })
  }, [name])

  return (
    <>
      <button onClick={() => navigate(-1)} className='goBackArrow'>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="gray"
            className="bi bi-skip-backward-btn "
            viewBox="0 0 16 16"
          >
          <path d="M11.21 5.093A.5.5 0 0 1 12 5.5v5a.5.5 0 0 1-.79.407L8.5 8.972V10.5a.5.5 0 0 1-.79.407L5 8.972V10.5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 1 0v1.528l2.71-1.935a.5.5 0 0 1 .79.407v1.528l2.71-1.935z" />
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>
        </span>
        <span className="goBackText">Go back</span>
       </button>

      <div className='expert-portfolio'>
        <div className='expert-description-container'>
          <div className='banner'></div>

          <div>
            <img className='profile-picture' src={expert.personal_details?.profile_picture} alt="Expert image"  style={{height: 150, width: 150}}/>
          </div>

          <div className='expert-headline'>
            <div className='name-address'>
              <h4><b>{expert.personal_details?.first_name} {expert.personal_details?.last_name}</b></h4>
              <h6>{expert.personal_details?.skills}, Aachen, Germany</h6>
            </div>

            <div className='contact-message'>
              <button className='button-expert'>Team up</button>
              <button className='button-expert'>Message</button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              </svg>
            </div>
          </div>

          <div className='professional-experience'>
            <h4>Professional experience</h4>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          </div>

          <div className='professional-experience'>
            <h4>Qualification / Trainings</h4>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          </div>

          <div className='professional-experience'>
            <h4>License / Certification</h4>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          </div>

          <div className='professional-experience'>
            <h4>Languages</h4>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          </div>
        </div>

        <div className='rate-review-container'>
          <h4>Before you book <b>{expert.personal_details?.first_name}</b></h4>
          <button className='button-expert'>Previous assignment media files</button>
          <button className='button-expert'>Rates</button>
          <button className='button-expert'>Terms and conditions</button>
          <button className='button-expert'>Customer reviews</button>
          <button className='write-review'>Write a review</button>
          <hr/>
          <div>
          <button className='button-expert'> <NavLink to={`/book-online/${name}`} >Book online</NavLink></button>
     

          </div>
        </div>
      </div>
{/*       <div className='expert-list-container'>
        {expert ? (
          <div className="card-container">
            <img src="https://wallpapercave.com/wp/wp10092195.jpg" alt="Expert image" style={{height: 100, width: 100}}/>
            <p className='card-name'><b>{expert.first_name} {expert.last_name}</b></p>
            <p className='card-expertise'>{expert.expertise}</p>
            <p>{expert.first_name}'s' portfolio</p>
          </div>
        ) : (<p>No expert found</p>)
        }
      </div> */}
    </>
  )
}

