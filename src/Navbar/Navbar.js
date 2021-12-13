import React from "react";
import { PropTypes } from "prop-types";

import { Box, Typography } from "@material-ui/core";
import "./navbar.css";


const Navbar = (props) => {
    return (
        <Box className="navbar">
            <ul className="navbar-nav">
                <li><a href="/" className={props.page === "home" ? "active" : ""}><Typography variant="h4">Home</Typography></a></li>
                <li><a href="/about" className={props.page === "about" ? "active" : ""}><Typography variant="h4">About</Typography></a></li>
                <li><a href="/updates" className={props.page === "updates" ? "active" : ""}><Typography variant="h4">Updates</Typography></a></li>
            </ul>
        </Box>
    )
}

Navbar.propTypes = {
    page: PropTypes.string
}

export default Navbar;
