import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Buttons from "../components/Button";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        alert("Sign-Up Successful");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/home");
      } else {
        alert(data.message || "Something Went Wrong");
      }
    } catch (error) {
      alert("something went wrong");
      console.log(error.message);
    }
    // console.log(name,email,password);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100 "
      style={{ backgroundColor: "#0a1b25ff" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px", backgroundColor: "#082332ff", color: "white" }}
      >
        <h3 className="text-center mb-4">Sign up</h3>
        <form onSubmit={handleSignup}>
          <div>
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="set Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Buttons Bcontent={"Submit"} handleClick={handleSignup} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
