import React, { useState } from "react";
import { baseUrl } from "../helpers/Constants";
import "./css/loginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const request = async (path) => {
    const response = await fetch(`${baseUrl}/${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  };

  const finish = (responseData, fallback) => {
    if (responseData?.success) {
      // UI flag only: the session itself is an httpOnly cookie on the server.
      localStorage.setItem("logged-in", "1");
      window.location.replace("/");
    } else {
      alert(responseData?.errors ?? fallback);
    }
  };

  const login = async () => {
    try {
      finish(await request("login"), "Login failed.");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Could not reach the server. Please try again.");
    }
  };

  const signup = async () => {
    try {
      finish(await request("signup"), "Sign up failed.");
    } catch (error) {
      console.error("Sign up failed:", error);
      alert("Could not reach the server. Please try again.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
            autoComplete="email"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            autoComplete={state === "Sign Up" ? "new-password" : "current-password"}
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
