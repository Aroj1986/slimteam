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
import Jobwall from './components/Jobwall/Jobwall'
import Register from './components/RegisterLogin/Register'
import Login from './components/RegisterLogin/Login'
import Footer from './components/Footer/Footer'
import Profile from './components/Profile/Profile';
import Calender from './components/Calender/Calender';


export default function App() {

  const [experts, setExperts] = useState([])
  const [expert, setExpert] = useState({})
  const {name} = useParams()

  const [userLogin, setUserLogin] = useState(false)

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
    <Navbar userLogin={userLogin} setUserLogin={setUserLogin} />
    <Routes>
      <Route path='/' element={<AboutUs />}></Route>
      <Route path="/explore-experts" element={<ExploreExperts experts={experts} setExperts={setExperts}/>}></Route>
      <Route path="/explore-experts/:name" element={<ExpertPortfolio />}></Route>
      <Route path='/meet-us' element={<MeetUs />}></Route>
      <Route path='/jobwall' element={<Jobwall />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/login' element={<Login setUserLogin={setUserLogin}/>}></Route>
      <Route path='/book-online/:name' element={<Calender />}></Route>
    </Routes>
    <Footer />
    </>
  );
}
