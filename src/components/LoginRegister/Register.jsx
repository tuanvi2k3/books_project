import axios from "axios";
import React, { useState } from "react";
import { AiFillLock, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    fullname: "",
    role: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", user);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log("User already exists");
      } else {
        console.log("Error registering user:", err);
      }
    }
  };

  console.log("Chia cái ô input ra thành 2 col");

  return (
    <div className="wapper">
      <div className="login-register">
        <div className="login-box">
          <form action="" method="POST">
            <h2>Register</h2>
            <div className="input-box">
              <span className="icon">
                <AiOutlineUser />
              </span>
              <input
                onChange={handleChange}
                name="username"
                id="username"
                type="text"
                required
              />
              <label htmlFor="username">Tên đăng nhập</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <AiOutlineUser />
              </span>
              <input
                onChange={handleChange}
                name="password"
                id="password"
                type="password"
                required
              />
              <label htmlFor="password">Mật khẩu</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <AiFillLock />
              </span>
              <input
                onChange={handleChange}
                name="email"
                id="email"
                type="text"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <AiFillLock />
              </span>
              <input
                onChange={handleChange}
                name="firstname"
                id="firstname"
                type="text"
                required
              />
              <label htmlFor="firstname">Họ</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <AiFillLock />
              </span>
              <input
                onChange={handleChange}
                name="lastname"
                id="lastname"
                type="text"
                required
              />
              <label htmlFor="lastname">Tên</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <AiFillLock />
              </span>
              <input
                onChange={handleChange}
                name="fullname"
                id="fullname"
                type="text"
                required
              />
              <label htmlFor="fullname">Họ và tên</label>
            </div>

            <button onClick={handleClick}>Register</button>
            <div className="register-link">
              <p>
                Bạn đã có tài khoản? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
