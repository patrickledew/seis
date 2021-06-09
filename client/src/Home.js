import React from 'react';

const Home = (props) => (<div>
        <input id="lobbyId" type="text"></input>
        <button onClick={()=>{window.location.href = "/lobby/" + document.getElementById("lobbyId").value}}>Join Lobby</button>
        <br />
        <button>Create New Lobby</button>
    </div>);

export default Home;