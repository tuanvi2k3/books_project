import React from "react";
import { AiOutlineUser, AiFillLock } from "react-icons/ai";
import "../css/reset.css";
import "./LoginRegister.css";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="wapper">
      <div className="login-register">
        <div className="login-box">
          <form action="">
            <h2>Login</h2>
            <div className="input-box">
              <span className="icon">
                <AiOutlineUser />
              </span>
              <input type="text" required />
              <label htmlFor="user">Username</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <AiFillLock />
              </span>
              <input type="password" required />
              <label htmlFor="user">Password</label>
            </div>
            <button>Login</button>
            <div className="register-link">
              <p>
                Bạn chưa có tài khoản? <Link to={"/register"}>Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
