import './Card.css';
const Card = (props) => {

    return <div class={"card " + (props.color == 'red' ? "card-red" :
                props.color == 'blue' ? "card-blue" :
                props.color == 'green' ? "card-green" :
                props.color == 'yellow' ? "card-yellow" :
                "card-wildcard")}>
            <h1>{props.value}</h1>
        </div>
}

export default Card;