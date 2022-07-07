import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./404.css";

const FourOhFour = (props) => {
  return (
    <div className="content">
      <Typography variant="h3" color="textSecondary" align="center">
        This page does not exist!
      </Typography>
      <br></br>
      <Typography variant="h5" color="textSecondary" align="center">
        Return to the homepage <Link to="/">here.</Link>
      </Typography>
    </div>
  );
};

export default FourOhFour;
