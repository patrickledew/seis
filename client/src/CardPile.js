import { useState, useEffect } from "react";
import Card from "./Card";
import "./CardPile.css";

const CardPile = (props) => {
    let [cards, updateCards] = useState(props.cards);
    //Seeded random number generator, credit: https://www.timemox.com/en/tricks/generate-random-number-using-seed
    function rand ( min, max, seed ) {
        min = min || 0;
        max = max || 1;
        var rand;
        if ( typeof seed === "number" ) {
          seed = ( seed * 9301 + 49297 ) % 233280;
          var rnd = seed / 233280;
          var disp = Math.abs( Math.sin( seed ) );
          rnd = ( rnd + disp ) - Math.floor( ( rnd + disp ) );
          rand = Math.floor( min + rnd * ( max - min + 1 ) );
        } else {
          rand  = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        }
        return rand;
      }

    return <div class="cardpile">
        {props.cards.map((card, i) => {
            let cardRotation = `${rand(-10, 10, i*213737)}deg`;
            if (i < props.cards.length - 10) return null;

            return <Card color={card.color} value={card.value} cardStyle={{transform: `rotateZ(${cardRotation}) translateY(${i*2}px)`}} topCard={i == (props.cards.length - 1)}/>
        })}
    </div>
}

export default CardPile;