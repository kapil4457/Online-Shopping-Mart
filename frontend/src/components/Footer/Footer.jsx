import React from "react";
import "./Footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="main-footer">
      <div className="socials">
        <a
          className="twitter social"
          href="https://twitter.com/kapil54768161"
          target="_blank"
        >
          <TwitterIcon />
        </a>
        <a
          className="instagram social"
          href="https://www.instagram.com/kapilsoni4457/"
          target="_blank"
        >
          <InstagramIcon />
        </a>
        <a
          className="linkedin social"
          href="https://www.linkedin.com/in/kapil-soni-2b25981ab/"
          target="_blank"
        >
          <LinkedInIcon />
        </a>
      </div>
      <h2>
        Try not to copy the code before trying to implement it by yourself
      </h2>
    </div>
  );
};

export default Footer;
