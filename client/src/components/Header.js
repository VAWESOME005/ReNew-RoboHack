import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Container,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from '../images/ReNewLogo.png'
import './Header.css'

//header component
const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const history = useHistory();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = ["placeholder", "placeholder", "placeholder"];

  return (
    <>
      <div className="header">
        <div className="header_left">
          <img src={Logo} className="logo-img" />
        </div>
        <div className="pages">
          <a onClick={() => history.push("/")} className="page">
            <span>Home</span>
          </a>
          <a onClick={() => history.push("/buy")} className="page">
            <span>Buy</span>
          </a>
          <a onClick={() => history.push("/donate")} className="page">
            <span>Donations</span>
          </a>
          <a onClick={() => history.push("/suggestions")} className="page">
            <span>Suggestions</span>
          </a>
        </div>
        <div className="header_right">
          {auth && auth.token ? (
            //signed in
            <>
              {auth.user &&
              auth.user.stripe_seller &&
              auth.user.stripe_seller.charges_enabled ? (
                <a onClick={() => history.push("/seller/dashboard")} className="page" >
                  <span>Seller Dashboard</span>
                </a>
              ) : (
                <a onClick={() => history.push("/seller/dashboard")} className="page">
                  <span>Become A Seller</span>
                </a>
              )}
              <button
                onClick={() => history.push("/my-account")}
                className="btn signUp-btn"
              >
                <b>My Account</b>
              </button>{" "}
            </>
          ) : (
            //not signed in
            <>
              
                <a onClick={() => history.push("/login")} className="page">
                  <span>Login</span>
                </a>

              <button
                onClick={() => history.push("/register")}
                className="btn signUp-btn"
              >
                <b>Start for Free</b>
              </button>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
