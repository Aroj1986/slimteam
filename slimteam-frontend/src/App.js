import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import {Routes, Route, useParams} from 'react-router-dom'
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import AboutUs from './components/AboutUs/AboutUs'
import ExploreExperts from './components/Experts/ExploreExperts'
import ExpertPortfolio from './components/Experts/ExpertPortfolio'
import MeetUs from './components/Career/MeetUs'
import Feedback from './components/Feedback/Feedback'
import Register from './components/RegisterLogin/Register'
import Login from './components/RegisterLogin/Login'
import Footer from './components/Footer/Footer'

export default function App() {

  const [experts, setExperts] = useState([])
  const [expert, setExpert] = useState({})
  const {name} = useParams()

  useEffect(() => {
    axios
    .get('http://localhost:8888/explore-experts')
    .then((res) => {
      setExperts(res.data)
    })
  }, [])
  
  useEffect(() => {
    axios
    .get(`http://localhost:8888/explore-experts/${name}`)
    .then((res) => {
      setExpert(res.data)
    })
    .catch((err) => {
      console.log(`Error fetching sought expert in database: ${err}`);
    })
  }, [name])


  return (
    <>
    <Header />
    <Navbar />
    <Routes>
      <Route path='/' element={<AboutUs />}></Route>
      <Route path="/explore-experts" element={<ExploreExperts experts={experts} setExperts={setExperts}/>}></Route>
      <Route path="/explore-experts/:name" element={<ExpertPortfolio />}></Route>
      <Route path='/meet-us' element={<MeetUs />}></Route>
      <Route path='/feedback' element={<Feedback />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
    <Footer />
    </>
  );
}
