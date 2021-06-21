import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

const FourOhFour = (props) => {
  return (
    <h1>
      404 Page Not Found. Return to the homepage <Link to="/">here.</Link>
    </h1>
  );
};

export default FourOhFour;