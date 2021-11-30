import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

import "./colorButton.css";

const ColorButton = (props) => {
  return (
    <div className={"colorButton colorButton-" + props.color} onClick={props.onClick}>
      <Typography  align="center" variant="h2" >
          {props.color === "red" ? "R"
         : props.color === "blue" ? "B"
         : props.color === "yellow" ? "Y"
         : props.color === "green" ? "G" : ""}
      </Typography>
    </div>
  );
};

ColorButton.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func
};

export default ColorButton;