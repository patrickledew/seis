import React, { useRef } from "react";
import PropTypes from "prop-types";
import ColorButton from "./ColorButton/ColorButton";
import { Box } from "@material-ui/core";
import "./colorPrompt.css";

const ColorPrompt = (props) => {
  const prompt = useRef();

  const shrinkPrompt = () => {
    prompt.current.style.transform = "scale(0%)";
  };

  return (
    props.active && (
      <Box ref={prompt} className="colorPrompt" position="absolute">
        <ColorButton
          color="red"
          onClick={() => {
            shrinkPrompt();
            props.onChoice("red");
          }}
        ></ColorButton>
        <ColorButton
          color="yellow"
          onClick={() => {
            shrinkPrompt();
            props.onChoice("yellow");
          }}
        ></ColorButton>
        <ColorButton
          color="green"
          onClick={() => {
            shrinkPrompt();
            props.onChoice("green");
          }}
        ></ColorButton>
        <ColorButton
          color="blue"
          onClick={() => {
            shrinkPrompt();
            props.onChoice("blue");
          }}
        ></ColorButton>
      </Box>
    )
  );
};

ColorPrompt.propTypes = {
  active: PropTypes.bool.isRequired,
  onChoice: PropTypes.func.isRequired,
};

export default ColorPrompt;
