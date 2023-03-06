import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/AboutUs/AboutUs";
import Protected from "./components/Protected";
import ExpertPortfolio from "./components/Experts/ExpertPortfolio";
import MeetUs from "./components/Career/MeetUs";
import Jobwall from "./components/Jobwall/Jobwall";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Portfolio_generic from "./components/Profile/Portfolio_generic";
import ExploreExperts from "./components/Experts/ExploreExperts";
import Calender from "./components/Calender/Calender";
import ExpertView from "./components/Profile/ViewProfileinBookings/ExpertView"
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import ManageBookings from "./components/Profile/ManageBookings";
import UserView from "./components/Profile/ViewProfileinBookings/UserView";
import ManageBookings_Expert from "./components/Profile/ViewProfileinBookings/ManageBookings_expert";

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
      setExperts(res.data.filter((rd) => 
      {
        if(rd?.role === "Expert" && rd?.personal_details.email !== mail) {
         return  {rd}
        }
      }
      ))
      // setExperts(res.data);
    });
    axios.get(`http://localhost:8888/explore-experts/${mail}`).then((res) => {
      setName(res.data[0]?.personal_details?.first_name);
      localStorage.setItem("name",res.data[0]?.personal_details?.first_name)
      setRole(res.data[0]?.role);
    });
  }, [mail]);

  return (
    <>
      <Navbar userLogin={userLogin} setUserLogin={setUserLogin} name={name} />
      <Routes>
        <Route path="/" element={<AboutUs />}></Route>
        <Route
          path="/explore-experts"
          element={<ExploreExperts experts={experts} setExperts={setExperts} />}
        />

        <Route
          path="/explore-experts"
          element={<Protected user={user} loading={loading} />}
        >
          <Route
            path="/explore-experts/:name"
            element={<ExpertPortfolio setExpertName={setExpertName} />}
          />
        </Route>

        <Route path="/meet-us" element={<MeetUs />}></Route>
        <Route path="/jobwall" element={<Jobwall name={name} />}></Route>
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
          path="/viewexpertprofile/:name"
          element={
            <ExpertView />
          }
        ></Route>
          <Route
          path="/viewuserprofile/:name"
          element={
            <UserView />
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
          path="/managebookings/:name"
          element={<ManageBookings/>}
        ></Route>
         <Route
          path="/manageexpertbookings/:name"
          element={<ManageBookings_Expert />}
        ></Route>
        <Route
          path="/book-online/:name"
          element={<Calender name={name} expertName={expertName} />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}
