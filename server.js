const express = require('express');
const app = express();
const server = require('http').Server(express);
const io = module.exports.io = require('socket.io')(server);
const socketManager = require('./socketManager');
const cors = require('cors');
const path = require('path');

io.on('connection', socketManager);
const PORT = process.env.PORT || 4000;

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'chat-app', 'build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'chat-app', 'build', 'index.html'));
//     })
// }
app.use(cors());




server.listen(PORT, () => {
    console.log("ok " + PORT);
})