import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import "./stackCounter.css";

const StackCounter = (props) => {
  return (
    props.count > 0 && (
      <Box className={"stackCounter centerText" + ` plus${props.count}`}>
        <Typography display="inline" variant="h3" className="timerText">
          +{props.count}
        </Typography>
      </Box>
    )
  );
};

StackCounter.propTypes = {
  count: PropTypes.number.isRequired,
};

export default StackCounter;
