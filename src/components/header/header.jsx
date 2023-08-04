import React from "react";
import "./Header.css";
import "../css/reset.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <div className="inner">
          <div className="logo">
            <Link to={"/"}>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/wwf-logo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="burger"></div>
          <nav>
            <Link className="active">Species</Link>
            <Link>About Us</Link>
            <Link>Our Work</Link>
            <Link>Get Involved</Link>
          </nav>
          <div className="donate-link">
            <Link to={"login"} className="">
              Login
            </Link>
            <Link to={"register"} className="">
              Register
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
