import React from 'react';

class RoughGameTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: null,
            error: null
        }

        this.io = props.io;

    }


    setupListeners() {
        console.log("setting up game listeners")
        this.io.on('game-error', (err) => {
            console.log("[Game Error]: ", err.msg);
            this.setState({error: err})
            setTimeout(()=> {
                this.setState({error: null})
            }, 5000);
        }); 
        
        this.io.on('gameState', (gameState) => {
            this.setState({gameState: gameState});
        });

        // this.io.on('card-dealt', to => {
        //     let e = document.getElementById(to + "-deck");
        //     if (e == null) return;
        //     e.style.backgroundColor = "yellow";
        //     setTimeout(e => {
        //         e.style.backgroundColor = "white";
        //     }, 100)
        // })
        // this.io.on('card-get', card => {
        //     let e = document.getElementById("my-deck");
        //     if (e == null) return;
        //     e.style.backgroundColor = "yellow";
        //     setTimeout(e => {
        //         e.style.backgroundColor = "white";
        //     }, 100)
        // })
    }

    componentDidMount() {
        this.setupListeners();
    }


    render() {
        if (this.state.gameState != null) {
            return <div style={{backgroundColor: "red"}}>
                <h1>This is the game. Current count: {this.state.gameState != null ? this.state.gameState.i : "not available"}</h1>
                <div id="my-deck">
                    <h2>My Deck</h2>
                    <p>{this.state.gameState.my.hand.numCards} cards</p>
                    <ul>
                        {this.state.gameState.my.hand.cards.map(card => {
                            return <li>{card.color != 'any' ? card.color + " " : ""}{card.symbol}</li>
                        })}
                    </ul>
                </div>
                <h2>Decks</h2>
                <ul>
                    {this.state.gameState.players.map(p => {
                        return <li id={p.id + "-deck"}>{p.name}: {p.hand.numCards}cards</li>
                    })}
                </ul>
            </div>
        } else {
            return <div>
                <h1>Recieving game state...</h1>
                <small>If this takes more than a second, things probably went wrong. ):</small>
            </div>
        }
    }
}

export default RoughGameTest;