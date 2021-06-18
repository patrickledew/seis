import '../Card/card.css';
import './hiddenCard.css';

const HiddenCard = (props) => {

    return <div className={"card hidden" + (props.small ? " small" : "")} style={props.cardStyle} onMouseEnter={props.onMouseEnter}>
            <h2 class="first">?</h2>
            <h1>?</h1>
            <h2 class="last">?</h2>
        </div>
}

export default HiddenCard;