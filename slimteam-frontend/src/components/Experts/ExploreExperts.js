import React from 'react'
import { NavLink } from 'react-router-dom';
import './experts.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

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
        <Card
        border="primary"
        style={{ width: "13rem", height: "17rem" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={expert.personal_details.profile_picture}
            alt="expert image"
          />
          <CardContent>
            <Typography gutterBottom component="div">
              {expert.personal_details.first_name.toUpperCase()} {expert.personal_details.last_name.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {expert.personal_details.skills}
            </Typography>
          </CardContent>
        </CardActionArea>
         <CardActions>
          <Button className='cardButton' >
            <NavLink to={`/explore-experts/${expert.personal_details.first_name}`} className="button-expert">view details</NavLink>
          </Button>
        </CardActions>
      </Card>
          // <div className="card-container">
          //   <img src={expert.personal_details.profile_picture} alt="Expert image" style={{height: 100, width: 100}}/>
          //   <p className='card-name'><b>{expert.personal_details.first_name} {expert.personal_details.last_name}</b></p>
          //   <p className='card-expertise'>{expert.personal_details.skills}</p>
          //   <button className="button-expert"><NavLink to={`/explore-experts/${expert.personal_details.first_name}`} className="button-expert">view details</NavLink></button>
          // </div>
           )}
      </div>
    </>
  )
}
