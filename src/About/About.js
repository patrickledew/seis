import React from "react";
import { Box, Typography } from "@material-ui/core";
import "./about.css";
const About = (props) => {
  return (
      <Box id="about" className="content">
        <Typography variant="h2" color="textPrimary" align="center">About</Typography>
        <hr></hr>
        <p>
          <Typography variant="h3" color="textPrimary">What is Seis?</Typography>
          <Typography variant="body1" color="textSecondary">
            <p>
              Seis is a simple and fun card-matching game we developed to allow friends to join lobbies and play their favorite card game together, online, anytime.
              Our goal is to polish the game and extend it to add more features and customizability.
            </p>
          </Typography>
        </p>
        <p>
        <Typography variant="h3" color="textPrimary">How do I play?</Typography>
          <Typography variant="body1" color="textSecondary">
            <p>To get started playing Seis, simply create a lobby and send the 4-character lobby code to any friends you want to play with (alternatively, simply copy the link from your URL bar, either will work). After everyone has joined the lobby, start the game.</p>

            <p>The goal of Seis is to get rid of your entire hand by playing cards that match whatever is on top of the <em>card pile</em>. A card matches if it shares either the same color, or the same symbol, as the top card.</p>
            <p>If you do not have any matching cards in your hand, you can draw more cards by clicking the draw button in the bottom right of the screen.</p>
            <p>There are also several special cards which will have different effects when played:</p>
            <ul>
              <li><strong>+2 Cards:</strong> Deal 2 cards to the next player and skip their turn.</li>
              <li><strong>+4 Cards:</strong> Deal 4 cards to the next player, skip their turn, and select a color.</li>
              <li><strong>W Cards:</strong> Change this card to be any color.</li>
              <li><strong>R Cards:</strong> Reverse the direction of play.</li>
              <li><strong>S Cards:</strong> Skip the next player&apos;s turn.</li>
            </ul>
            <p>
              In the case of +2 and +4 cards, if the next player has a matching +2 or +4 card, they might &quot;stack&quot;, and turn a +2 into a +4, or a +4 into a +8!
              If this continues until your turn, you might be stuck drawing 16 cards, so be careful! 
            </p>
            <p>Currently, +2s can only stack with +2s, and +4s with +4s. We might add the ability to stack +2s and +4s together as a configurable game option in the future, so keep an eye out for any updates!</p>
          </Typography>
        </p>
      </Box>
  );
};
export default About;
