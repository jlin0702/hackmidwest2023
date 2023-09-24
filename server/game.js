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

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

io.on('connection', (socket) => {
    // socket.on("hello", (arg) => {
    //     console.log(arg); // world
    // });
    socket.on("action", (arg)=> {
        console.log(arg);
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

let player0 =  {
    id : "",  
    activeMonster : {
        id: "",
        name: "",
        hp: "",
        type: "",
        actions: []
    }, 
    lineup : [],
    items : []
}

let player1 =  {
    "id" : "",  
    "activeMonster" : "", 
    "lineup" : [],
    "items" : []
}

function playerJoin (id) {
    // determine who is joining
    let player = {};
    if (numPlayersJoined === 0) {
        player = player0;
    } else if (numPlayersJoined === 1) {
        player = player1;
    } else {
        return;
    }

    // set id
    player.id = id;

    // get lineup 

    // get items

    // user added :)
    numPlayersJoined ++;
}

function selectStartingMonster () {
    // send message to players prompting them to select monster from lineup


    // await response
    // player
}

function sendGameMessage() {
    const message = {
        activePlayer : activePlayer,
        action : {},
        player0 : {
            id : player0.id,
            monster: {
                name: player0.activeMonster.name,
                type: player0.activeMonster.type,
                hp: player0.activeMonster.hp
            }
        },
        player1 : {
            id : player0.id,
            monster: {
                name: player0.activeMonster.name,
                type: player0.activeMonster.type,
                hp: player0.activeMonster.hp
            }
        },
    }

    // send the message
}

function runGame () {
    // select starting player
    activePlayer = 0;

    // send starting game message
    sendGameMessage();

    // run game loop
    while (winner === -1) {

    }
}