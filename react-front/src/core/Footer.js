import React from "react";
import "../App.scss";
import Apple from "../images/apple.png";
import Google from "../images/google.png";
import { Link, withRouter } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-div">
      <footer className="footer-distributed">
        <div className="footer-right">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa fa-github"></i>
          </a>
        </div>

        <div className="footer-left">
          <p>
            <Link className="footer-links" to="/about">
              About
            </Link>
          </p>
          <p>
            {" "}
            <Link className="footer-links" to="/contact">
              Contact Us
            </Link>
          </p>
          <p>
            {" "}
            <Link className="footer-links" to="/TOS">
              Terms of Service
            </Link>
          </p>
          <p>
            {" "}
            <Link className="footer-links" to="/privacy">
             Privacy
            </Link>
          </p>
          <p>
            {" "}
            <Link className="footer-links" to="/download">
             Download
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default withRouter(Footer);
