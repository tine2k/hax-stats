const express = require('express');
const cors = require('cors');
const basicAuth = require('express-basic-auth')
const config = require('./config');

const app = express();
const port = 3000;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ games: [], recordings: [], id: 0 }).write();

app.use(express.json());
app.use(express.static('frontend/dist'));

// POST GAME
const corsOptions = {
    origin: 'https://www.haxball.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.options('/games', cors());
app.post('/games', cors(corsOptions), basicAuth(config), (req, res) => {
    const nextId = db.get('id').value();
    db.update('id', n => n + 1).write();
    db.get('games')
        .push({id: nextId, ...req.body, rec: undefined})
        .write();
    db.get('recordings')
        .push({id: nextId, data: req.body.rec})
        .write();
    console.log(`game saved: ${nextId}`);
    res.send('' + nextId);
});

// GET LIST OF GAMES
app.get('/games', (req, res) => {
    res.send(db.get('games'));
});

// GET GAME
app.get('/games/:gameId', (req, res) => {
    const value = db.get('games')
        .find({id: parseInt(req.params.gameId)})
        .value();
    res.send(value ? value : 404);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
