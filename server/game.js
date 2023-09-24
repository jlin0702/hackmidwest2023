// imports
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
var cors = require('cors');
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {cors: {origin: "*"}});

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// player connection
io.on('connection', (socket) => {
    socket.on("connect-to-game", (nft, id)=> {
       playerJoin(nft, id);
    })
});

// creature action handler
io.on('connection', (socket) => {
    socket.on("creature-action", (action, id)=> {
        console.log(action, id);
        let message = handleAction(action, id);
        if (message != null) {
            if (message.winner != null) {
                activePlayer = -1;
            }
            console.log("sending game message");
            io.sockets.emit("game-message", message.message);
            io.sockets.emit("game-state", message.gameState);
            io.sockets.emit("active-player", players[activePlayer].id);
        }

    })
})

server.listen(8000, () => {
    console.log('server running at http://localhost:8000');
});

// 1. wait for players to join
// 2. once a player joins set player id and do login
// 3. both players choose their starting monster secretly
// 4. game loop begins

let numPlayersJoined = 0;
let activePlayer = -1;
let winner = -1;

let players = [
    {
        id : "",  
        activeMonster : {
            id: "",
            name: "placeholder",
            hp: 312,
            type: "",
            actions: [
                {name:"aasdfgh"},
                {name:"aasdfgh"},
                {name:"aasdfgh"},
                {name:"aasdfgh"},
                {name:"aasdfgh"},
                {name:"aasdfgh"}
            ]
        }, 
        lineup : ['test'],
        items : []
    },
    {
        id : "",  
        activeMonster : {
            id: "",
            name: "test",
            hp: 123,
            type: "",
            actions: [{name:"aasdfgh"},
            {name:"1"},
            {name:"2"},
            {name:"3"}]
        }, 
        lineup : ['test'],
        items : []
    }
]

function playerJoin (nft, id) {
    // determine who is joining
    let player = {};
    if (numPlayersJoined === 0) {
        player = players[0];
    } else if (numPlayersJoined === 1) {
        player = players[1];
    } else {
        console.log("Failed to connect. Game full.")
        return;
    }

    try {
        player.id = id;
        player.activeMonster.name = nft.metadataData.name;
        player.activeMonster.hp = nft.metadataData.hp;
        player.activeMonster.type = nft.metadataData.type;
        player.activeMonster.action0 = nft.metadataData.action0;
        player.activeMonster.action1 = nft.metadataData.action1;
        player.activeMonster.action2 = nft.metadataData.action2;
        player.activeMonster.action3 = nft.metadataData.action3;
        player.activeMonster.action4 = nft.metadataData.action4;
        player.activeMonster.action5 = nft.metadataData.action5;
    } catch (e) {
        console.log("ERROR mapping: ", e);
        return;
    }
    // set id
    

    // get lineup 


    // get items

    // user added :)
    numPlayersJoined ++;
    console.log(`Player ${numPlayersJoined} joined! id: ${player.id}`);

    if (numPlayersJoined === 2){ 
        console.log(`Game Starting!`);
        const state = buildGameStatePacket()
        runGame(state);
    }
}

function handleAction(action, id) {
    // ignore player when its not their turn
    console.log(players[activePlayer].id)
    if (players[activePlayer].id !== id)
        return;

    // check surrender
    if (action === 8) {
        let message = `Player ${players[activePlayer].id} has surrendered! Player ${players[(activePlayer+1)%2].id} wins!`;
        return {message: message, winner: players[(activePlayer+1)%2].id};
    }

    // do action
    let actionTaken = players[activePlayer].activeMonster.actions[action];

    // action logic

    // check victory 
    if (players[(activePlayer + 1) %2].lineup.length === 0) {
        let message = `Player ${players[activePlayer].id} wins!`;
        return {message: message, winner: players[activePlayer].id};
    }

    // change turns
    oldPlayer = activePlayer;
    activePlayer = (activePlayer + 1) % 2;

    // build message
    const message = `Player ${players[oldPlayer].id} did ${actionTaken}. it is now player ${players[activePlayer].id}`;

    // build game state
    const state = buildGameStatePacket();

    return {message: message, winner: null, gameState: state};
}

function buildGameStatePacket() {
    const state = [
        {
            id : players[0].id,  
            activeMonster : {
                id: players[0].activeMonster.id,
                name: players[0].activeMonster.name,
                hp: players[0].activeMonster.hp,
                type: players[0].activeMonster.type
            }
        },
        {
            id : players[1].id,  
            activeMonster : {
                id: players[1].activeMonster.id,
                name: players[1].activeMonster.name,
                hp: players[1].activeMonster.hp,
                type: players[1].activeMonster.type
            }
        }
    ]
    return state;
}

function selectStartingMonster () {
    // send message to players prompting them to select monster from lineup


    // await response
    // player
}


function runGame (startingState) {
    // select starting player
    activePlayer = (Math.floor(Math.random() * 2));

    io.sockets.emit("game-start", startingState);
    io.sockets.emit("active-player", players[activePlayer].id);
    io.sockets.emit("starting-player", players[activePlayer].id);
    console.log(players[0].activeMonster.actions);
    io.sockets.emit("get-actions", 
        [
            { id: players[0].id, actions: players[0].activeMonster.actions },
            { id: players[1].id, actions:players[1].activeMonster.actions }
        ]);


    // send starting game message
    // sendGameMessage();

    // // run game loop
    // while (winner === -1) {

    // }
}