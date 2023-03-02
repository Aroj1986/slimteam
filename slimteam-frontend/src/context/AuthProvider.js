import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLogin, setUserLogin] = useState(false);

   useEffect(() => {
    axios
      .get('http://localhost:8888/profile', {withCredentials: true})
      .then((res) => {
        setUser(res.data)
        setLoading(false);
        localStorage.setItem("name",res.data.personal_details.first_name)
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
        setUser(res.data)
        localStorage.setItem("email",res.data.email)
        setUserLogin(true)
        navigate("/");
      })
     
      .catch((err) => {
        setUser(null);
      });
      
  };

  const register = (email, password,isExpert,isUser) => {
    return axios
    .post(("http://localhost:8888/register"),
        { email, password,isExpert,isUser }, {withCredentials: true}
      )
      .then((res) => {
        setUser(res.data)
        console.log(res.data)
         localStorage.setItem("email",res.data.email)
        setUserLogin(true)
        navigate("/profile");
      })
     
      .catch((err) => {
        if(err) {
          setUser(null)
          alert('User exists with this email')
          console.log(`Error registering the user ${err}`)
        }
      })
      
  };

  function logout() {
    return     axios
    .get("http://localhost:8888/logout", {withCredentials: true})
    .then((res) => {
      console.log(`Backend: ${res.data}`);
      console.log("Frontend: User is logged out");
      setUser(null);
      navigate("/login");
      localStorage.clear();
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
    <AuthContext.Provider value={{ user, loading, login, logout,register, userLogin, setUserLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
