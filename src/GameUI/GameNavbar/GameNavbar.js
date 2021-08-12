import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import Logo from "../../assets/Logo.svg";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import "./gameNavbar.css";

const GameNavbar = (props) => {
  return (
    <Box className="gameBar fullWidth centerVertically">
      <Box p={2}>
        <Link to="/">
          <Box className="backArrowCircle centerHorizontally centerVertically">
            <ChevronLeftIcon fontSize="large" className="backArrow" />
          </Box>
        </Link>
      </Box>
      <Link to="/">
        <Box py={1} px={2}>
          <img src={Logo} className="logo"></img>
        </Box>
      </Link>
      <Box p={2} ml="auto" className="centerVertically centerText">
        <a
          href="javascript:void"
          className="gameOptionsLink centerText"
          onClick={() => {
            alert("hi");
          }}
        >
          <SettingsIcon fontSize="large" />
        </a>
      </Box>
    </Box>
  );
};

export default GameNavbar;
