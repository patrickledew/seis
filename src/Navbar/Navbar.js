import React from "react";
import { Box, Typography } from "@material-ui/core";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
    const location = useLocation();
    return (
        <Box className="navbar">
            <ul className="navbar-nav">
                <li><Link to="/" className={location.pathname === "/" ? "active" : ""}><Typography variant="h4">Home</Typography></Link></li>
                <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}><Typography variant="h4">About</Typography></Link></li>
                <li><Link to="/updates" className={location.pathname === "/updates" ? "active" : ""}><Typography variant="h4">Updates</Typography></Link></li>
            </ul>
        </Box>
    )
}

export default Navbar;
