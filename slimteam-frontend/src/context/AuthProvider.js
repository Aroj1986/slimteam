import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLogin, setUserLogin] = useState(false);

   useEffect(() => {
    axios
      .get('http://localhost:8888/profile', {withCredentials: true})
      .then((res) => {
        console.log(res.data);
        setUser(res.data)
        setLoading(false);
        console.log(res.data)
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = (email, password) => {
    return axios
      .post(
        "http://localhost:8888/login",
        { email, password }, {withCredentials: true}
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data)
        setUserLogin(true)
        setEmail(email);
        navigate("/");
      })
/*         axios
        .get(`http://localhost:8888/explore-experts/${email}`)
        .then((res) => {
          setUser(res.data[0].personal_details.first_name)
//          setRole(res.data[0].role)
        })
        .catch((err) => {
          if (err) {
            console.log("Frontend: User credentials mismatch! try again");
            console.log(`Backend: ${err}`);
          }
        }); */
      .catch((err) => {
        setUser(null);
      });
      
  };

  function logout() {
    return     axios
    .get("http://localhost:8888/logout", {withCredentials: true})
    .then((res) => {
      console.log(`Backend: ${res.data}`);
      console.log("Frontend: User is logged out");
      setUser(null);
    })
    .catch((err) => {
      if (err) {
        console.log(`Error logging out the user ${err}`);
        setUser(null);
      }
    });
};


  console.log(user)


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, userLogin, setUserLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
