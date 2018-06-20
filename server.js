const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});


const start = () => {
    server.listen(3000);
};

module.exports = {
    start,
    io
};