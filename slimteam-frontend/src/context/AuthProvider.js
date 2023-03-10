import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosClient";

export const AuthContext = createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLogin, setUserLogin] = useState(false);

   useEffect(() => {
    axios
      .get('/api/explore-experts/profile', {withCredentials: true})
      .then((res) => {
        setUser(res.data)
        setLoading(false);
        localStorage.setItem("name",res.data.personal_details.first_name)
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = (email, password, setError) => {
    return axios
      .post(
        "/api/auth/login",
        { email, password }, {withCredentials: true}
      )
      .then((res) => {
        setUser(res.data)
        localStorage.setItem("email",res.data.email)
        setUserLogin(true)
        navigate("/");
      })
      
      .catch((err) => {
        setError("Invalid email or password")
        setUser(null);
      });
      
  };

  const register = (email, password,isExpert,isUser) => {
    return axios
    .post(("/api/auth/register"),
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
    .get("/api/auth/logout", {withCredentials: true})
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

  return (
    <AuthContext.Provider value={{ user, loading, login, logout,register, userLogin, setUserLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
