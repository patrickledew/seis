import './Card.css';
const Card = (props) => {

    return <div className={"card " + (props.color == 'red' ? "card-red" :
                props.color == 'blue' ? "card-blue" :
                props.color == 'green' ? "card-green" :
                props.color == 'yellow' ? "card-yellow" :
                "card-wildcard") + " " + (props.selected ? "selected" : "")} style={props.cardStyle} onMouseEnter={props.onMouseEnter}>
            <h2 class="first">{props.value}</h2>
            <h1>{props.value}</h1>
            <h2 class="last">{props.value}</h2>
        </div>
}

export default Card;