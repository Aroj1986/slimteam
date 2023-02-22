import React from 'react'
import { NavLink } from 'react-router-dom';
import './experts.css'


export default function ExploreExperts({experts, setExperts}) {
  console.log(experts)
  return (
    <>
      <h2 style={{paddingLeft:'2rem'}}>Discover SlimTeam experts at your location</h2>
      <div className='container-search-field'>
        <input type="text" placeholder={"SlimTeam expert"}></input>
        <input type="text" placeholder={"Postal code"}></input>
        <input type="text" placeholder={"City"}></input>
        <button className='button-expert'>Search</button>
      </div>
      <hr /> 
      <div className='expert-list-container'>
        {experts.map((expert, index) =>
          <div className="card-container">
            <img src={expert.personal_details.profile_picture} alt="Expert image" style={{height: 100, width: 100}}/>
            <p className='card-name'><b>{expert.personal_details.first_name} {expert.personal_details.last_name}</b></p>
            <p className='card-expertise'>{expert.personal_details.skills}</p>
            <button className="button-expert"><NavLink to={`/explore-experts/${expert.personal_details.first_name}`} className="button-expert">view details</NavLink></button>
          </div>
           )}
      </div>
    </>
  )
}