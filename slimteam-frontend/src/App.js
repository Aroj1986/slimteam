import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/AboutUs/AboutUs";
import Protected from "./components/Protected";
import ExpertPortfolio from "./components/Experts/ExpertPortfolio";
import MeetUs from "./components/Career/MeetUs";
import JobWall from "./components/Jobwall/JobWall";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Portfolio_generic from "./components/Profile/Portfolio_generic";
import ExploreExperts from "./components/Experts/ExploreExperts"
import Calender from "./components/Calender/Calender";

import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import ManageBookings from "./components/Profile/ManageBookings";

export default function App() {
  const [experts, setExperts] = useState([]);
  const [expertName, setExpertName] = useState();
  const [userLogin, setUserLogin] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [isExpert, setIsExpert] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [role, setRole] = useState();
  const { user, loading } = useContext(AuthContext);
  var mail = localStorage.getItem("email");

  useEffect(() => {
    axios.get("http://localhost:8888/explore-experts").then((res) => {
      setExperts(res.data);
    });

    axios.get(`http://localhost:8888/explore-experts/${mail}`).then((res) => {
      setName(res.data[0]?.personal_details?.first_name);
      setRole(res.data[0]?.role);
    });
  }, [mail]);

  return (
    <>
      {/* <Header /> */}
      <Navbar userLogin={userLogin} setUserLogin={setUserLogin} name={name} />
      <Routes>
        <Route path="/" element={<AboutUs />}></Route>
        {/* <Route
          path="/explore-experts"
          element={<ExploreExperts experts={experts} setExperts={setExperts} />}
        ></Route>
        <Route
          path="/explore-experts/:name"
          element={<ExpertPortfolio setExpertName={setExpertName} />}
        ></Route> */}
                <Route path="/explore-experts"  element={<ExploreExperts experts={experts} setExperts={setExperts} />} />

        <Route path="/explore-experts" element={<Protected user={user} loading={loading} />}>
          <Route path="/explore-experts/:name"  element={<ExpertPortfolio setExpertName={setExpertName} />} />
        </Route>

        <Route path="/meet-us" element={<MeetUs />}></Route>
        <Route path="/jobwall" element={<JobWall name={name} />}></Route>
        <Route
          path="/register"
          element={
            <Register
              email={email}
              setEmail={setEmail}
              isExpert={isExpert}
              setIsExpert={setIsExpert}
              isUser={isUser}
              setIsUser={setIsUser}
            />
          }
        ></Route>
        <Route
          path="/portfolio/:name"
          element={
            <Portfolio_generic
              name={name}
              email={email}
              role={role}
              setName={setName}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <Profile
              email={email}
              setEmail={setEmail}
              name={name}
              setName={setName}
              isExpert={isExpert}
              isUser={isUser}
              setUserLogin={setUserLogin}
            />
          }
        ></Route>
        {/* <Route path='/addform' element={<ExperienceAdd />}></Route> */}
        <Route
          path="/login"
          element={
            <Login
              setUserLogin={setUserLogin}
              name={name}
              setName={setName}
              setRole={setRole}
            />
          }
        ></Route>
         <Route
          path="/managebookings"
          element={
            <ManageBookings
              name={name}
            />
          }
        ></Route>
        {/* <Route path='/book-online/:name' element={<Calender />}></Route> */}
        <Route
          path="/book-online/:name"
          element={<Calender name={name} expertName={expertName} />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}
