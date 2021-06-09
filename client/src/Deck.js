import { useEffect } from "react";
import Card from "./Card";
import './Deck.css';
const Deck = (props) => {

    
    return <div className="deck">
        {props.cards.map((card, i) => 
        
                <Card color={card.color} value={card.value}></Card>
            
        )}
    </div>
}

export default Deck;