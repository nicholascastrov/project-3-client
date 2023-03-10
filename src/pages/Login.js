import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { LoadingContext } from "../context/loading.context";
import { post } from "../services/authService";

const Login = () => {
  const { authenticateUser } = useContext(AuthContext);
  const { user } = useContext(LoadingContext)

  const [thisUser, setthisUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setthisUser((recent) => ({ ...recent, [e.target.name]: e.target.value }));
    console.log("Changing user", thisUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", thisUser)
      .then((results) => {
        console.log("Created User", results.data);
        localStorage.setItem("authToken", results.data.token);
        authenticateUser();
        navigate(`/profile/${results.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      })
      // .finally(() => {
      // });
  };

  return (
    <div className="login-form-div">
      <h1 className="login-form-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={thisUser.email}
          onChange={handleChange}
        ></input>

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={thisUser.password}
          onChange={handleChange}
        ></input>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
