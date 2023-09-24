const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); 

app.use(cors()); // Add cors middleware

const server = http.createServer(app); 

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const connections = [null, null]

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User has connected ${socket.id}`);

  let playerIndex = -1;
  // First empty spot
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i
      break
    }
  }

  // Tell the connecting client what player number they are
  socket.emit('player-number', playerIndex)

  console.log(`Player ${playerIndex} has connected`)

  // 3+ players
  if (playerIndex === -1) return

  connections[playerIndex] = true

  socket.on('disconnect', () => {
    console.log(`Player ${playerIndex} has disconnected`)
    connections[playerIndex] = null
  })
});

server.listen(4000, () => console.log('Server is running on port 4000'));