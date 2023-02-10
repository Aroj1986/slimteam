import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function AboutUs() {
  return (
    <div>
      <Carousel variant="dark" className='flex-carousel'>
        <Carousel.Item>
          <img src='https://static5.abbyy.com/abbyycommedia/32760/02a-profservices-customers.jpg'/>
        </Carousel.Item>
        <Carousel.Item>
          <img src='https://static5.abbyy.com/abbyycommedia/32760/02a-profservices-customers.jpg'/>
        </Carousel.Item>
        <Carousel.Item>
          <img src='https://static5.abbyy.com/abbyycommedia/32760/02a-profservices-customers.jpg'/>
        </Carousel.Item>
        <Carousel.Item>
          <img src='https://static5.abbyy.com/abbyycommedia/32760/02a-profservices-customers.jpg'/>
        </Carousel.Item>
      </Carousel>
    </div>
   )
}

export default AboutUs

