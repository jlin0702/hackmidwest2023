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

let self = 0;
let opp = (0 + 1) % 2;

// player connection
io.on('connection', (socket) => {
    socket.on("connect-to-game", (nft, id)=> {
       playerJoin(nft, id);
    })
});

// io.on('connection', (socket) => {
//     socket
// });

// creature action handler
io.on('connection', (socket) => {
    socket.on("creature-action", (action, id)=> {
        console.log(action, id);
        let message = handleAction(action, id);
        if (message != null) {
            if (message.winner != null) {
                io.sockets.emit("game-message", message.message);
                io.sockets.emit("game-state", message.gameState);
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
            "name": "Pinatamon",
            "hp": 999,
            "type": "God",
            "action0": {
                "name": "Web3",
                "effect": "Trap the opponent in web3 world",
                "value": 30
            },
            "action1": {
                "name": "Blazing Speeds",
                "effect": "A quick attack that does damage to the enemy",
                "value": 30
            },
            "action2": {
                "name": "API Beam",
                "effect": "A tough beam of API attack",
                "value": 30
            },
            "action3": {
                "name": "Elimination",
                "effect": "A finishing move that does 100% more damage when the enemy has less than 50% health",
                "value": 25
            },
            "action4": {
                "name": "Become a Llama",
                "effect": "CHARRRRGEEEEE (deal 5 damage to yourself)",
                "value": 45
            },
            "action5": {
                "name": "Dedication",
                "effect": "Heals yourself for 100",
                "value": 100
            }
        }, 
        lineup : ['test'],
        items : []
    },
    {
        id : "", 
        activeMonster : { 
            "name": "Rabbitmon",
            "hp": 65,
            "type": "herbivore",
            "action0": {
                "name": "Headbutt",
                "effect": "A light attack with head",
                "value": 5
            },
            "action1": {
                "name": "Bite",
                "effect": "A medium attack with teeth",
                "value": 10
            },
            "action2": {
                "name": "Kick",
                "effect": "A hard attack with legs",
                "value": 15
            },
            "action3": {
                "name": "Frenzied Bite",
                "effect": "A strong move that also damages self by 5",
                "value": 20
            },
            "action4": {
                "name": "",
                "effect": "",
                "value": ""
            },
            "action5": {
                "name": "",
                "effect": "",
                "value": ""
            }
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
        player.img = nft.metadataData.image;
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
    // action logic
    self = activePlayer;
    opp = (activePlayer + 1) % 2;

    // get action from moves list
    let actionList = Object.values(players[activePlayer].activeMonster).slice(3);
    let actionTaken = actionList[action];

    console.log(actionTaken);

    // run function
    for (let i = 0; i < moves.length; i++ ) {
        if (moves[i].name === actionTaken.name) {
            console.log("found");
            moves[i].steps();
            console.log(players[opp].activeMonster.hp)
            console.log("called")
            break;
        }
    }


    // check victory 
    if (players[(activePlayer + 1) %2].activeMonster.hp <= 0) {
        let message = `Player ${players[activePlayer].id} wins!`;
        return {message: message, winner: players[activePlayer].id};
    }

    // change turns
    oldPlayer = activePlayer;
    activePlayer = (activePlayer + 1) % 2;

    // build message
    const message = `${players[self].activeMonster.name} did ${actionTaken.name}, dealing ${actionTaken.value} damage!`;

    // build game state
    const state = buildGameStatePacket();

    return {message: message, winner: null, gameState: state};
}

function buildGameStatePacket() {

    const state = [
        {
            id : players[0].id,  
            activeMonster : {
                name: players[0].activeMonster.name,
                hp: players[0].activeMonster.hp,
                type: players[0].activeMonster.type
            },
            img: players[0].img
        },
        {
            id : players[1].id,  
            activeMonster : {
                name: players[1].activeMonster.name,
                hp: players[1].activeMonster.hp,
                type: players[1].activeMonster.type
            },
            img:players[0].img
        }
    ]
    console.log(state);
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

    // io.sockets.emit("opp-img-src", )
    io.sockets.emit("game-start", startingState);
    io.sockets.emit("active-player", players[activePlayer].id);
    io.sockets.emit("starting-player", players[activePlayer].id);
    console.log(players[0].activeMonster.actions);
    io.sockets.emit("get-actions", 
        [
            { id: players[0].id, actions: [
                players[0].activeMonster.action0,
                players[0].activeMonster.action1,
                players[0].activeMonster.action2,
                players[0].activeMonster.action3,
                players[0].activeMonster.action4,
                players[0].activeMonster.action5,
            ] },
            { id: players[1].id, actions: [
                players[1].activeMonster.action0,
                players[1].activeMonster.action1,
                players[1].activeMonster.action2,
                players[1].activeMonster.action3,
                players[1].activeMonster.action4,
                players[1].activeMonster.action5,
            ] }
        ]);


    // send starting game message
    // sendGameMessage();

    // // run game loop
    // while (winner === -1) {

    // }
}

// STEPS
// targetId = player index
function damage(target, value) {
    players[target].activeMonster.hp = Math.max(0, players[target].activeMonster.hp - value);
}

function heal(target, value) {
    players[target].activeMonster.hp = Math.max(0, players[target].activeMonster.hp + value);
}


// NAMED MOVES
const moves = [
    {
        name: "Bind",
        effect: "A medium attack that entangles the enemy",
        steps: function() {damage(opp,10)}
    }, {
        name: "Wave",
        effect: "A light attack which slightly moves",
        steps: function() {damage(opp, 5)}
    }, {
        name: "Harden",
        effect: "A hard attack that makes you tough",
        steps: function() {damage(opp, 5)}
    }, {
        name: "Photosynthesis",
        effect: "Heals yourself for 10",
        steps: function() {heal(self, 10)}
    }, {
        name: "Claw",
        effect: "A light attack with paws",
        steps: function() {damage(opp, 5)}
    }, {
        name: "Swipe",
        effect: "A medium attack with paws",
        steps: function() {damage(opp,10)}
    }, {
        name: "Thrash",
        effect: "A hard attack with paws",
        steps: function() {damage(opp,15)}
    }, {
        name: "Bite",
        effect: "A finishing move that does 100% more damage when the enemy has less than 25 health",
        steps: function() {if (opp.hp < 25) {damage(opp,20)} else {damage(opp,10)}}
    }, {
        name: "Web3",
        effect: "Trap the opponent in web3 world",
        steps: function() {damage(opp, 30)}
    }, {
        name: "Blazing Speeds",
        effect: "A quick attack that does damage to the enemy",
        steps: function() {damage(opp, 30)}
    }, {
        name: "API Beam",
        effect: "A tough beam of API attack",
        steps: function() {damage(opp, 30)}
    }, {
        name: "Elimination",
        effect: "A finishing move that does 100% more damage when the enemy has less than 50 health",
        steps: function() {if (opp.hp < 50) {damage(opp,50)} else {damage(opp,25)}}
    }, {
        name: "Become a Llama",
        effect: "CHARRRRGEEEEE (deal 5 damage to yourself)",
        steps: function() { damage(opp, 45); {damage(self, 5)}}
    }, {
        name: "Dedication",
        effect: "Heals yourself for 100",
        steps: function() { heal(self,45)}
    }, {
        name: "Headbutt",
        effect: "A light attack with head",
        steps: function() {damage(opp, 10)}
    }, {
        name: "Bite",
        effect: "A medium attack with teeth",
        steps: function() {damage(opp,10)}
    }, {
        name: "Kick",
        effect: "A hard attack with legs",
        steps: function() {damage(opp,10)}
    }, {
        name: "Frenzied Bite",
        effect: "A strong move that also damages self by 5",
        steps: function() {damage(opp, 20); damage(self, 5)}
    }
]