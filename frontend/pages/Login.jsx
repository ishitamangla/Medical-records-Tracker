import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        alert("Login successful");
        setEmail("");
        setPassword("");
        navigate("./home");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.log(`Error logging in : ${error.message}`);
      alert("Something went wrong plz try again");
    }
  };

  return (
    <div
      style={{ backgroundColor: '#0a1b25ff',color:"white" }}
      className="container d-flex justify-content-center align-items-center vh-100 "
    >
      <div
        className=" card shadow p-4"
        style={{ width: "400px", backgroundColor: '#082332ff' }}
      >
        <h3 className="text-center mb-4" style={{color:"white"}}>Login</h3>
        <form onSubmit={onSubmitHandler}>
          <div style={{color:"white"}}>
            <label >Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div style={{color:"white"}}>
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              className=" mt-3"
              type="submit"
              variant="primary"
              style={{
                backgroundColor: '#004e64',
                borderRadius: "8px",
                border: "none",
                padding: "8px 20px",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#457277ff")
              }
              onMouseOut={(e) => (e.target.style.backgroundColor = "#004e64")}
            >
              Login
            </Button>
          </div>
        </form>
        <p className="text-center" style={{color:"white"}}>
          Don't have an account? <Link to="/Signup"> Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
